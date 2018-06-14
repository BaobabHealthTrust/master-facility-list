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
		footer: function(currentPage, pageCount) {
			return {
				margin: 10,
				columns: [
					{
						style: "header",
						margin: [10, 0, 0, 0],
						columns: [
							{
								image: "./images/malawi.png",
								width: 20
							}
						]
					},
					{
						fontSize: 9,
						text: [
							{
								text: +currentPage.toString()
							}
						],
						alignment: "right"
					}
				]
			};
		},
		content: [
			{
				style: "header",
				margin: [10, 0, 0, 0],
				columns: [
					{
						image: "./images/malawi.png",
						width: 80
					},
					{
						alignment: "center",
						margin: [80, 30, 0, 0],
						style: "tableExample",
						table: {
							body: [
								[
									{
										border: [false, false, false, false],
										text: "MASTER HEALTH FACILITY REGISTRY"
									}
								],
								[
									{
										border: [false, false, false, false],
										text: "LIST OF HEALTH FACILITIES"
									}
								]
							]
						}
					}
				]
			},
			{
				text:
					"Date downloaded: " +
					moment(currentDate).format("MMM Do YYYY"),
				alignment: "right"
			},

			{
				margin: [-18, 0, 0, 8],
				canvas: [
					{
						type: "line",
						x1: 0,
						y1: 10,
						x2: 540,
						y2: 10,
						lineWidth: 3,
						lineCap: "round"
					}
				]
			},
			{
				margin: [-37, 0, 0, 0],
				style: "tableExample",
				table: {
					headerRows: 1,
					body
				},
				layout: {
					fillColor: function(i, node) {
						return i % 2 === 0 ? "#CCCCCC" : null;
					}
				}
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
