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

/** Table layouts */
const layout = {
    paddingLeft: function(i, node) { return 10; },
    paddingRight: function(i, node) { return 10; },
    paddingTop: function(i, node) { return 5; },
    paddingBottom: function(i, node) { return 5; }
}

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
 * creates a table
 * @param {string} title Table title
 * @param {array} table Table
 */
const createTable = (title = null, table = null) => {
    return {
        margin: [0, 10, 0, 30],
        table: {
            widths: ['100%'],
            body: [
                [{
                    text: title,
                    bold: true
                }],
                [{
                    columns: table,
                    columnGap: 15
                }]
            ]
        },
        layout: layout
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

/**
 * Renders facility resources
 * @param {array} resources Resources object.
 */
const renderResources = (resources) => {
    if (resources == null) {
        return [{
            stack: ['Resources are not available on this facility'],
            fontSize: 12
        }];
    }

    const normalised = resources.map((res) => {
        return {
            type: res.resource.resourceType.resource_type,
            desc: res.quantity + " " + res.resource.resource_name
        }
    });

    const types = normalised.map(res => res.type);
    const uniqTypes = uniq.uniqWith(types, uniq.isEqual);
    const typesPart = uniqTypes.splice(0, Math.ceil(uniqTypes.length / 2));

    /**
     * Generate a column
     * @param {array} column Column.
     * @param {array} columnData Resources types.
     */
    const processColumn = (column = null, columnData) => {
        columnData.forEach(type => {
            column.push({
                text: type,
                bold: true,
                margin: [0, 10, 0, 0]
            });

            let data = normalised.filter(res => res.type === type);
            column.push({ul: data.map(e => e.desc)});
        });
        return column;
    };

    return [
        {
            stack: processColumn([], typesPart),
            fontSize: 12,
            width: '*'
        },
        {
            stack: processColumn([], uniqTypes),
            fontSize: 12,
            width: '*'
        }
    ];
};

/**
 * Renders facility services
 * @param {array} services Services object.
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
    const typesPart = uniqTypes.splice(0, Math.ceil(uniqTypes.length / 2));

    /**
     * Generate a column
     * @param {array} column Column.
     * @param {array} columnData Services types.
     */
    const processColumn = (column = null, columnData) => {
        columnData.forEach(type => {
            column.push({
                text: type,
                bold: true,
                margin: [0, 10, 0, 0]
            });

            let typeData = data.filter(e => e.type == type);
            let parents = typeData.filter(e => e.parent == 0);

            parents.forEach(parent => {
                let children = typeData.filter(e => e.parent == parent.id);
                if (children.length > 0) {
                    column.push({
                        ul: [[
                            {text: parent.desc},
                            {ol: children.map(e => e.desc)}
                        ]]
                    });
                } else {
                    column.push({ul: [{text: parent.desc}]});
                }
            });
        });
        return column;
    };

    return [
        {
            stack: processColumn([], typesPart),
            fontSize: 12
        },
        {
            stack: processColumn([], uniqTypes),
            fontSize: 12
        }
    ];
};

/**
 * Render facility utilities.
 * @param {array} utilities Facility utilities.
 */
const renderUtilities = (utilities) => {
    if (utilities == null) {
        return [{
            stack: ['Utilities are not available on this facility'],
            fontSize: 12
        }];
    }

    const normalised = utilities.map((util) => {
        return {
            type: util.utility.utilityType.utility_type,
            desc: util.utility.utility_name
        }
    });

    const types = normalised.map(res => res.type);
    const uniqTypes = uniq.uniqWith(types, uniq.isEqual);

    /**
     * Generate a column
     * @param {array} column Column.
     * @param {array} columnData Utilities types.
     */
    const processColumn = (column = null, columnData) => {
        columnData.forEach(type => {
            column.push({
                text: type,
                bold: true,
                margin: [0, 10, 0, 0]
            });

            let data = normalised.filter(res => res.type === type);
            column.push({ul: data.map(e => e.desc)});
        });
        return column;
    };

    const typesPart = uniqTypes.splice(0, Math.ceil(uniqTypes.length / 2));

    return [
        {
            stack: processColumn([], typesPart),
            fontSize: 12
        },
        {
            stack: processColumn([], uniqTypes),
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

module.exports = (facility, utilities, resources, services, callback) => {
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

    const date = facility.facility_date_opened;
    const dateOpened = moment(date).format("MMM Do YYYY");
    const dateDownloaded = moment(new Date()).format("MMM Do YYYY");

    const commonTable = centerTable({
        margin: [0, 0, 0, 30],
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

    content.push({
        pageBreak: 'after',
        table: {
            widths: ['100%'],
            body: [
                ['FACILITY'],
                [{
                    margin: [0, 0, 0, 10],
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
                            row(
                                "District",
                                facility.district.district_name,
                                true
                            ),
                            row("Zone", facility.district.zone.zone_name, true),
                            headRow("CONTACTS", [0, 10, 0, 0]),
                            row(
                                "Postal",
                                facility.addresses.postal_address,
                                true
                            ),
                            row(
                                "Physical",
                                facility.addresses.physical_address,
                                true
                            )
                        ]
                    }
                }]
            ]
        },
        layout: layout
    });

    content.push(createTable('FACILITY SERVICES', renderServices(services)));
    content.push(createTable('FACILITY RESOURCES', renderResources(resources)));
    content.push(createTable('FACILITY UTILITIES', renderUtilities(utilities)));

    const docDefinition = {
        footer: footer,
        content: content
    };

    try {
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.end();
        callback(null, pdfDoc);
    } catch (error) {
        callback(error);
    }
};
