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
const row = (title = 'Not available', value = 'Not available') => {
    return [
        {
            text: title,
            bold: true,
            alignment: "right"
        },
        {
            text: ":",
            bold: true,
            alignment: "center"
        },
        {
            text: value,
            alignment: "left"
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
                ["Malu working on it"]
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

    content.push("Malu working on it.");

    const docDefinition = {
        footer: footer,
        content: content
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.end();
    callback(null, pdfDoc);
};
