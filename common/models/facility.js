"use strict";

var PdfPrinter = require("pdfmake");
var moment = require("moment");
var json2xls = require("json2xls");
var json2csv = require("json2csv");

var fs = require("fs");
module.exports = function(Facility) {
	Facility.download = function(inputData, res, cb) {
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
													moment(currentDate).format(
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
					var pdfFile = pdfDoc.pipe(
						fs.createWriteStream("facilities.pdf")
					);
					pdfDoc.end();
				}

				if (inputData.format == "excel") {
					const jsonArrayData = [];
					queriedDetails.forEach(details => {
						const jsonDetails = details.toJSON();
						jsonArrayData.push({
							CODE: jsonDetails.facility_code,
							NAME: jsonDetails.facility_name,
							"COMMON NAME": jsonDetails.facility_name,
							OWNERSHIP: jsonDetails.owner.facility_owner,
							TYPE: jsonDetails.facilityType.facility_type,
							STATUS:
								jsonDetails.operationalStatus
									.facility_operational_status,
							ZONE: jsonDetails.district.zone.zone_name,
							DISTRICT: jsonDetails.district.district_name,
							"DATE OPENED": moment(
								jsonDetails.facility_date_opened
							).format("MMM Do YY"),
						});
					});

					res.xls("data.xlsx", jsonArrayData);

					// fs.writeFileSync("facilities.xlsx", xlsDetails, "binary");
				}

				if (inputData.format == "csv") {
					var fields = [
						"CODE",
						"NAME",
						"COMMON NAME",
						"OWNERSHIP",
						"TYPE",
						"STATUS",
						"ZONE",
						"DISTRICT",
						"DATE OPENED",
					];
					const csvArrayData = [];
					queriedDetails.forEach(details => {
						const jsonDetails = details.toJSON();
						csvArrayData.push({
							CODE: jsonDetails.facility_code,
							NAME: jsonDetails.facility_name,
							"COMMON NAME": jsonDetails.facility_name,
							OWNERSHIP: jsonDetails.owner.facility_owner,
							TYPE: jsonDetails.facilityType.facility_type,
							STATUS:
								jsonDetails.operationalStatus
									.facility_operational_status,
							ZONE: jsonDetails.district.zone.zone_name,
							DISTRICT: jsonDetails.district.district_name,
							"DATE OPENED": moment(
								jsonDetails.facility_date_opened
							).format("MMM Do YY"),
						});
					});
					var csvDetails = json2csv({
						data: csvArrayData,
						fields: fields,
					});
					const datetime = new Date();
					res.set("Expires", "Tue, 03 Jul 2001 06:00:00 GMT");
					res.set(
						"Cache-Control",
						"max-age=0, no-cache, must-revalidate, proxy-revalidate"
					);
					res.set("Last-Modified", datetime + "GMT");
					res.set("Content-Type", "application/force-download");
					res.set("Content-Type", "application/octet-stream");
					res.set(
						"Content-Disposition",
						"attachment;filename=facilities.csv"
					);
					res.set("Content-Transfer-Encoding", "binary");
					res.send(csvDetails);
				}
			}
		);
	};

	Facility.remoteMethod("download", {
		description: "Download all facilities of your choice",
		accepts: [
			{arg: "data", type: "object"},
			{arg: "res", type: "object", http: {source: "res"}}
		],
		returns: {}
	});
	Facility.downloadOne = function(inputData, res, cb) {
	}
	Facility.remoteMethod("/id/download", {
		description: "Download one facility with all details",
		accepts: [
		    {arg: "data", type: "object"},
		    {arg: "res", type: "object", http: {source: "res"}}
		],
		returns: {}
	});
};
