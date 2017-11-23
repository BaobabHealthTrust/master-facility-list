"use strict";

var PdfPrinter = require("pdfmake");
var moment = require("moment");
var fs = require("fs");
module.exports = function(Facility) {
	Facility.download = function(inputData, cb) {
		console.log(inputData.format);
		Facility.find(
			{
				where: inputData.where,
				include: [
					"locations",
					"contactPeople",
					"regulatoryStatus",
					"operationalStatus",
					"owner",
					"facilityType",
					{district: "zone"}
				]
			},
			function(err, queriedDetails) {
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
				queriedDetails.forEach(details => {
					const jsonDetails = details.toJSON();
					console.log(jsonDetails);
					body.push([
						jsonDetails.facility_code,
						jsonDetails.facility_name,
						jsonDetails.facility_name,
						jsonDetails.owner.facility_owner,
						jsonDetails.facilityType.facility_type,
						jsonDetails.operationalStatus
							.facility_operational_status,
						jsonDetails.district.zone.zone_name,
						jsonDetails.district.district_name,
						moment(jsonDetails.facility_date_opened).format(
							"MMM Do YY"
						)
					]);
				});
				if (inputData.format == "pdf") {
					var fonts = {
						Roboto: {
							normal: "./node_modules/fontkit/Roboto-Regular.ttf",
							bold: "./node_modules/fontkit/Roboto-Medium.ttf",
							italics: "./node_modules/fontkit/Roboto-Italic.ttf",
							bolditalics:
								"./node_modules/fontkit/Roboto-MediumItalic.ttf"
						}
					};

					var currentDate = new Date();
					var printer = new PdfPrinter(fonts);
					var docDefinition = {
						footer: function(currentPage, pageCount) {
							return {
								margin: 10,
								columns: [
									{
										fontSize: 9,
										text: [
											{
												text:
"--------------------------------------------------------------------------" +
													"\n",
												margin: [0, 20]
											},
											{
												text:
													+currentPage.toString() +
													" of " +
													pageCount
											}
										],
										alignment: "center"
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
										margin: [180, 0, 0, 0],
										width: 80
									}
								]
							},
							{
								text: "MASTER HEALTH FACILITY REGISTRY",
								margin: [140, 5, 0, 0]
							},
							{
								text:
									"A simple table (no headers, \
								no width specified, no spans, \
								no styling. \
								The following table \
								has nothing more than a body array)",
								margin: [100, 5, 0, 8],
								style: "subheader"
							},

							{
								style: "tableExample",
								table: {
									headerRows: 1,
									body: [
										[
											{
												text: "Facility List",
												style: "tableHeader"
											},
											{
												text:
													"Downloaded on: " +
													moment(currentDate)
													.format(
											"MMMM Do YYYY, h:mm:ss a"
													),
												style: "tableHeader"
											}
										]
									]
								},
								layout: "noBorders"
							},

							{
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
					var pdfDoc = printer.createPdfKitDocument(docDefinition);
					pdfDoc.pipe(fs.createWriteStream("facilities.pdf"));
					pdfDoc.end();
				} else {
					console.log("file format not supported");
				}
				cb(null, queriedDetails);
			}
		);
	};

	Facility.remoteMethod("download", {
		description: "Download all facilities of your choice",
		accepts: {arg: "data", type: "object"},
		returns: {arg: "facilities", type: "blob"}
	});
};
