"use strict";

const pdfMake = require("pdfmake");
const moment = require("moment");
const uniq = require("lodash");
const fs = require("fs");

/** PDF file Fonts */
const fonts = {
    Roboto: {
        normal: "./fonts/Roboto-Regular.ttf",
        bold: "./fonts/Roboto-Medium.ttf",
        italics: "./fonts/Roboto-Italic.ttf",
        bolditalics: "./fonts/Roboto-MediumItalic.ttf"
    }
};

/**
 * Create a centered table
 * @param {object} table Table object.
 */
const centerTable = (table) => {
    const pad = {
        width: '*',
        text: ''
    };
    return {
        columns: [
            pad,
            table,
            pad,
        ]
    }
};

/**
 * Create a table row.
 * @param {string} title Row title.
 * @param {String} value Row value.
 */
const row = (title = 'Not available', value = 'Not available', alignment) => {
    return [
        {
            text: title,
            bold: true,
            alignment: (alignment) ? 'left' : "right",
            border: [false, false, false, false]
        },
        {
            text: ":",
            bold: true,
            alignment: (alignment) ? 'left' : "center",
            border: [false, false, false, false]
        },
        {
            text: value,
            alignment: 'left',
            border: [false, false, false, false]
        }
    ];
};

/**
 * Return a head row
 * @param {string} title Heading row title.
 */
const headRow = (title = 'Not available', margin) => {
    return [
        {
            colSpan: 3,
            bold: true,
            border: [
              false,
              false,
              false,
              true
            ],
            text: title,
            fontSize: 12,
            margin: margin
        },
        "",
        ""
    ];
};

const renderResources = (resources) => {
  const normalised = resources.map((res) => {
    return {
      type: res.resource.resourceType.resource_type,
      desc: res.quantity + " " + res.resource.resource_name
    }
  });

  const resourceTypes = normalised.map(res => res.type);
  const uniqResourceTypes = uniq.uniqWith(resourceTypes, uniq.isEqual);

  const columnA = [];

  const length = Math.ceil(uniqResourceTypes.length / 2);

  uniqResourceTypes.splice(0, length).forEach(type => {
    columnA.push({
      text: type,
      width: '*',
      bold: true,
      margin: [0, 10, 0, 0]
    });

    let data = normalised.filter(res => res.type === type);
    columnA.push({
      ul: data.map(e => e.desc)
    });
  });

  const columnB = [];
  uniqResourceTypes.forEach(type => {
    columnB.push({
      text: type,
      width: '*',
      bold: true,
      margin: [0, 10, 0, 0]
    });

    let data = normalised.filter(res => res.type === type);
    columnB.push({
      ul: data.map(e => e.desc)
    });
  });

  return [{
    stack: columnA,
    fontSize: 12,
    width: '*'
  }, {
    stack: columnB,
    fontSize: 12,
    width: '*'
  }];
};

/**
 * Renders services
 * @param {object} services Services object.
 */
const renderServices = (services) => {
    if (services == null) {
        return [{
            stack: ['Services are not available on this facility'],
            fontSize: 12
        }];
    }

    const data = services.map((ser) => {
        return {
            id: ser.service.id,
            type: ser.service.serviceType.service_type,
            parent: ser.service.service_category_id,
            desc: ser.service.service_name
        }
    });

    const types = data.map(res => res.type);
    const uniqTypes = uniq.uniqWith(types, uniq.isEqual);

    const columnA = [];
    const length = Math.ceil(uniqTypes.length / 2);

    uniqTypes.splice(0, length).forEach(type => {
        columnA.push({
            text: type,
            bold: true,
            margin: [0, 10, 0, 0]
        });

        let typesData = data.filter(e => e.type == type);
        let parents = typesData.filter(e => e.parent == 0);

        parents.forEach(parent => {
            let children = typesData.filter(e => e.parent == parent.id);
            if (children.length > 0) {
                columnA.push({
                    ul: [[
                        {text: parent.desc},
                        {ol: children.map(e => e.desc)}
                    ]]
                });
            } else {
              columnA.push({
                  ul: [{
                      text: parent.desc
                  }]
              });
            }
        });

    });

    const columnB = [];
    uniqTypes.forEach(type => {
        columnB.push({
          text: type,
          bold: true,
          margin: [0, 10, 0, 0]
        });

        let typesData = data.filter(e => e.type == type);
        let parents = typesData.filter(e => e.parent == 0);

        parents.forEach(parent => {
          let children = typesData.filter(e => e.parent == parent.id);
          if (children.length > 0) {
            columnB.push({
              ul: [[
                { text: parent.desc },
                { ol: children.map(e => e.desc) }
              ]]
            });
          } else {
            columnB.push({
              ul: [{
                text: parent.desc
              }]
            });
          }
        });
    });

    return [
        {
            stack: columnA,
            fontSize: 12
        },
        {
            stack: columnB,
            fontSize: 12
        }
    ];
};

const renderUtilities = (utilities) => {
    const normalised = utilities.map((util) => {
        return {
            type: util.utility.utilityType.utility_type,
            desc: util.utility.utility_name
        }
    });

    const utilityTypes = normalised.map(res => res.type);
    const uniqUtilityTypes = uniq.uniqWith(utilityTypes, uniq.isEqual);

    const columnA = [];

    const length = Math.ceil(uniqUtilityTypes.length / 2);

    uniqUtilityTypes.splice(0, length).forEach(type => {
        columnA.push({
            text: type,
            bold: true,
            margin: [0, 10, 0, 0]
        });

        let data = normalised.filter(res => res.type === type);
        columnA.push({
            ul: data.map(e => e.desc)
        });
    });

  const columnB = [];
  uniqUtilityTypes.forEach(type => {
    columnB.push({
      text: type,
      bold: true,
      margin: [0, 10, 0, 0]
    });

    let data = normalised.filter(res => res.type === type);

    columnB.push({
      ul: data.map(e => e.desc)
    });
  });

  return [
    {
      stack: columnA,
      fontSize: 12
    },
    {
      stack: columnB,
      fontSize: 12
    }
  ];

};

const footer = (currentPage, pageCount) => {
    return {
        fontSize: 10,
        text: currentPage.toString() + " of " + pageCount.toString(),
        alignment: "center"
    };
}

module.exports = (
    facility,
    utilities,
    resources,
    services,
    callback
) => {

    const printer = new pdfMake(fonts);
    const content = [];

    content.push({
        image: "./images/malawi.png",
        width: 90,
        margin: [0, 70, 0, 40],
        alignment: "center",
    });

    content.push({
        text: "MASTER HEALTH FACILITY REGISTRY",
        bold: true,
        margin: [0, 0, 0, 6],
        alignment: "center",
    });

    content.push({
        text: facility.facility_name + " | " + facility.facility_code,
        bold: true,
        margin: [0, 0, 0, 30],
        alignment: "center",
    });

    const dateOpened = moment(facility.facility_date_opened).format("MMM Do YYYY");
    const dateDownloaded = moment(new Date()).format("MMM Do YYYY");

    const linelessRow = (title = 'Not available') => {
      return [
        {
          colSpan: 3,
          bold: true,
          border: [
            false,
            false,
            false,
            true
          ],
          text: title,
          fontSize: 12
        },
        "",
        ""
      ];
    };

    const commonTable = centerTable({
        margin: [0,0,0,30],
        width: 'auto',
        table: {
            body: [
                row('Common Name', facility.common_name),
                row('Facility Type', facility.facilityType.facility_type),
                row('Date Opened', dateOpened),
                row('Date Downloaded', dateDownloaded)
            ]
        },
        layout: 'noBorders'
    });
    content.push(commonTable);

    const summaryTable = centerTable({
        width: 'auto',
        pageBreak: 'after',
        table: {
            body: [
                ['Facility'],
                [{
                    margin: [0,0,0,10],
                    table: {
                        body: [
                            headRow("OWNERSHIP", [0, 10, 0, 0]),
                            row(
                                "Owner",
                                facility.owner.facility_owner,
                                true
                            ),
                            row(
                                "Status",
                                facility.regulatoryStatus.facility_regulatory_status,
                                true
                            ),
                            row(
                                "Operational Status",
                                facility.operationalStatus.facility_operational_status,
                                true
                            ),
                            headRow("LOCATION", [0, 10, 0, 0]),
                            row(
                                "Facility Location",
                                facility.addresses.physical_address,
                                true
                            ),
                            row(
                                "Population",
                                facility.locations.catchment_population,
                                true
                            ),
                            row("District", facility.district.district_name, true),
                            row("Zone", facility.district.zone.zone_name, true),
                            headRow("CONTACTS", [0, 10, 0, 0]),
                            row("Postal", facility.addresses.postal_address, true),
                            row("Physical", facility.addresses.physical_address, true)
                        ]
                    }
                }]
            ]
        },
        layout: {
            paddingLeft: function(i, node) { return 10; },
            paddingRight: function(i, node) { return 10; },
            paddingTop: function(i, node) { return 5; },
            paddingBottom: function(i, node) { return 5; }
        }
    });
    content.push(summaryTable);

    content.push({
        margin: [0, 10, 0, 30],
        table: {
            widths: ['100%'],
            body: [
                ['SERVICES'],
                [{ columns: renderServices(services), columnGap: 15 }]
            ]
        },
        layout: {
            paddingLeft: function (i, node) { return 10; },
            paddingRight: function (i, node) { return 10; },
            paddingTop: function (i, node) { return 8; },
            paddingBottom: function (i, node) { return 8; }
        }
    });

    content.push({
      margin: [0, 0, 0, 30],
      table: {
        widths: ['100%'],
        body: [
          ['resources'],
          [{ columns: renderResources(resources), columnGap: 15 }]
        ]
      },
      layout: {
        paddingLeft: function (i, node) { return 10; },
        paddingRight: function (i, node) { return 10; },
        paddingTop: function (i, node) { return 5; },
        paddingBottom: function (i, node) { return 5; }
      }
    });

    content.push({
        table: {
            widths: ['100%'],
            body: [
                ['utilities'],
                [{ columns: renderUtilities(utilities), columnGap: 15 }]
            ]
        },
        layout: {
            paddingLeft: function (i, node) { return 10; },
            paddingRight: function (i, node) { return 10; },
            paddingTop: function (i, node) { return 5; },
            paddingBottom: function (i, node) { return 5; }
        }
    });

    const docDefinition = {
        footer: footer,
        content: content
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.end();
    callback(null, pdfDoc);
};
