"use strict";

const PdfPrinter = require("pdfmake");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const mime = require("mime");

module.exports = function(facilities, callback) {
	const body = [
		[
			{text: "CODE", style: "tableHeader"},
			{text: "NAME", style: "tableHeader"},
			{text: "COMMON NAME", style: "tableHeader"},
			{text: "OWNERSHIP", style: "tableHeader"},
			{text: "TYPE", style: "tableHeader"},
			{text: "STATUS", style: "tableHeader"},
			{text: "ZONE", style: "tableHeader"},
			{text: "DISTRICT", style: "tableHeader"},
			{text: "DATE OPENED", style: "tableHeader"}
		]
    ];

	facilities.forEach(facility => {
		let data = facility.toJSON();
		body.push([
			data.facility_code,
			data.facility_name,
			data.facility_name,
			data.owner.facility_owner,
			data.facilityType.facility_type,
			data.operationalStatus.facility_operational_status,
			data.district.zone.zone_name,
			data.district.district_name,
			moment(data.facility_date_opened).format("MMM Do YY")
		]);
    });

  /** PDF file Fonts */
  const fonts = {
    Roboto: {
      normal: "./fonts/Roboto-Regular.ttf",
      bold: "./fonts/Roboto-Medium.ttf",
      italics: "./fonts/Roboto-Italic.ttf",
      bolditalics: "./fonts/Roboto-MediumItalic.ttf"
    }
  };

	const currentDate = new Date();
	const facilityListHeading = "LIST OF HEALTH FACILITIES";
    const printer = new PdfPrinter(fonts);

	const docDefinition = {
      pageOrientation: 'landscape',
      pageSize: 'A4',
		  footer: function(currentPage, pageCount) {
          return {
              margin: [0, 6, 0, 0],
              fontSize: 9,
              text: [
                  {
                      text: currentPage.toString() + " of " + pageCount.toString()
                  }
              ],
              alignment: "center"
          };
		  },
		  content: [
          {
              image: "./images/malawi.png",
              width: 90,
              margin: [0, 20, 0, 20],
              alignment: "center",
          },
          {
              text: "MASTER HEALTH FACILITY REGISTRY",
              bold: true,
              margin: [0, 0, 0, 4],
              alignment: "center",
          },
          {
              text: "LIST OF HEALTH FACILITIES",
              bold: true,
              margin: [0, 0, 0, 20],
              alignment: "center",
          },
          {
            text:
              "Date downloaded: " +
              moment(currentDate).format("MMM Do YYYY"),
              alignment: "right"
          },
          {
            margin: [0, 0, 0, 8],
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 10,
                x2: 760,
                y2: 10,
                lineWidth: 1,
                lineCap: "round"
              }
            ]
          },
          {
            columns: [
              {
                width: '*',
                text: ''
              },
              {
                width: 'auto',
                style: "tableExample",
                fontSize: 10,
                table: {
                  headerRows: 1,
                  body
                },
                layout: {
                  fillColor: function(i, node) {
                    return i % 2 === 0 ? "#CCCCCC" : null;
                  }
                }
              },
              {
                width: '*',
                text: ''
              },
            ]
          }
		  ]
	};

    try {
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.end();
        callback(null, pdfDoc);
    } catch (error) {
        callback(error);
    }
};
