"use strict";

const PdfPrinter = require("pdfmake");
const moment = require("moment");
const fs = require("fs");

module.exports = function(queriedDetails, res) {
	let facilityName = "";
	let facilityCode = "";
	let population = "";
	let district = "";
	let zone = "";
	let facilityRegulatoryStatus = "";
	let facilityOperationalStatus = "";
	let facilityLocation = "";
	let commonName = "";
	let facilityType = "";
	let facilityOwner = "";
	let dateOpened = "";
	const body2 = [];

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
		facilityName = jsonDetails.facility_name.toUpperCase();
		facilityLocation = jsonDetails.addresses.physical_address;
		population = jsonDetails.locations.catchment_population;
		district = jsonDetails.district.district_name;
		zone = jsonDetails.district.zone.zone_name;
		facilityCode = jsonDetails.facility_code;
		facilityRegulatoryStatus =
			jsonDetails.regulatoryStatus.facility_regulatory_status;
		facilityOperationalStatus =
			jsonDetails.operationalStatus.facility_operational_status;
		commonName = jsonDetails.facility_name;
		facilityType = jsonDetails.facilityType.facility_type;
		facilityOwner = jsonDetails.owner.facility_owner;
		dateOpened = moment(jsonDetails.facility_date_opened).format(
			"MMM Do YY"
		);
		body2.push([
			{
				border: [false, true, false, false],
				fillColor: "#eeeeee",
				text: "border:\n[false, true, false, false]"
			},
			{
				border: [false, false, false, false],
				fillColor: "#dddddd",
				text: "border:\n[false, false, false, false]"
			},
			{
				border: [true, true, true, true],
				fillColor: "#eeeeee",
				text: "border:\n[true, true, true, true]"
			}
		],
		[
			{
				rowSpan: 3,
				border: [true, true, true, true],
				fillColor: "#eeeeff",
				text: "rowSpan: 3\n\nborder:\n[true, true, true, true]"
			},
			{
				border: undefined,
				fillColor: "#eeeeee",
				text: "border:\nundefined"
			},
			{
				border: [true, false, false, false],
				fillColor: "#dddddd",
				text: "border:\n[true, false, false, false]"
			}
		],
		[
			"",
			{
				colSpan: 2,
				border: [true, true, true, true],
				fillColor: "#eeffee",
				text: "colSpan: 2\n\nborder:\n[true, true, true, true]"
			},
			""
		],
		[
			"",
			{
				border: undefined,
				fillColor: "#eeeeee",
				text: "border:\nundefined"
			},
			{
				border: [false, false, true, true],
				fillColor: "#dddddd",
				text: "border:\n[false, false, true, true]"
			}
		]);
		body.push([
			jsonDetails.facility_code,
			jsonDetails.facility_name,
			jsonDetails.facility_name,
			jsonDetails.owner.facility_owner,
			jsonDetails.facilityType.facility_type,
			jsonDetails.operationalStatus.facility_operational_status,
			jsonDetails.district.zone.zone_name,
			jsonDetails.district.district_name,
			moment(jsonDetails.facility_date_opened).format("MMM Do YY")
		]);
	});
	const fonts = {
		Roboto: {
			normal: "./node_modules/fontkit/Roboto-Regular.ttf",
			bold: "./node_modules/fontkit/Roboto-Medium.ttf",
			italics: "./node_modules/fontkit/Roboto-Italic.ttf",
			bolditalics: "./node_modules/fontkit/Roboto-MediumItalic.ttf"
		}
	};

	const currentDate = new Date();
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
										text:
											facilityName + " | " + facilityCode
									}
								]
							]
						}
					}
				]
			},
			{
				margin: [60, 10, 0, 0],
				style: "tableExample",
				table: {
					body: [
						[
							{
								border: [false, false, false, false],
								text: "Common Name",
								fontSize: 8
							},
							{
								border: [false, false, false, false],
								text: ":",
								fontSize: 8
							},
							{
								border: [false, false, false, false],
								text: commonName,
								fontSize: 8
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: "Date Opened",
								fontSize: 8
							},
							{
								border: [false, false, false, false],
								text: ":",
								fontSize: 8
							},
							{
								border: [false, false, false, false],
								text: dateOpened,
								fontSize: 8
							}
						],
						[
							{
								border: [false, false, false, false],
								text: "Facility Type",
								fontSize: 8
							},
							{
								border: [false, false, false, false],
								text: ":",
								fontSize: 8
							},
							{
								border: [false, false, false, false],
								text: facilityType,
								fontSize: 8
							},
							{
								border: [false, false, false, false],
								text: "         "
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: ""
							},
							{
								border: [false, false, false, false],
								text: "Date Downloaded",
								fontSize: 8
							},
							{
								border: [false, false, false, false],
								text: ":",
								fontSize: 8
							},
							{
								border: [false, false, false, false],
								text: moment(currentDate).format("MMM Do YYYY"),
								fontSize: 8
							}
						]
					]
				}
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
				margin: [20, 10, 0, 0],
				style: "tableExample",
				table: {
					body: [
						[
							{
								border: [true, true, false, true],
								text: "FACILITY SUMMARY",
								fontSize: 8
							},

							{
								border: [true, true, false, true],
								text: "DEPENDENCIES",
								fontSize: 8
							}
						],
						[
							{
								border: [true, true, true, true],
								style: "tableExample",
								table: {
									body: [
										[
											{
												colSpan: 3,
												border: [
													false,
													false,
													false,
													true
												],
												text: "OWNERSHIP",
												fontSize: 8
											},
											"",
											""
										],
										[
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: "Owner",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: ":",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: facilityOwner,
												fontSize: 8
											}
										],
										[
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: "Status",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: ":",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: facilityRegulatoryStatus,
												fontSize: 8
											}
										],
										[
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: "Operational Status",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: ":",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: facilityOperationalStatus,
												fontSize: 8
											}
										],
										[
											{
												colSpan: 3,
												border: [
													false,
													false,
													false,
													false
												],
												text: "",
												fontSize: 8
											},
											"",
											""
										],
										[
											{
												colSpan: 3,
												border: [
													false,
													false,
													false,
													true
												],
												text: "LOCATION",
												fontSize: 8
											},
											"",
											""
										],
										[
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: "Facility Location",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: ":",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: facilityLocation,
												fontSize: 8
											}
										],
										[
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: "Population",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: ":",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: population,
												fontSize: 8
											}
										],
										[
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: "District",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: ":",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: district,
												fontSize: 8
											}
										],
										[
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: "Zone",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: ":",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: zone,
												fontSize: 8
											}
										],
										[
											{
												colSpan: 3,
												border: [
													false,
													false,
													false,
													false
												],
												text: "",
												fontSize: 8
											},
											"",
											""
										],
										[
											{
												colSpan: 3,
												border: [
													false,
													false,
													false,
													true
												],
												text: "CONTACTS",
												fontSize: 8
											},
											"",
											""
										],
										[
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: "Postal",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: ":",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: facilityLocation,
												fontSize: 8
											}
										],
										[
											{
												colSpan: 3,
												border: [
													false,
													false,
													false,
													false
												],
												text: "",
												fontSize: 8
											},
											"",
											""
										],
										[
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: "Physical",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: ":",
												fontSize: 8
											},
											{
												border: [
													false,
													false,
													false,
													false
												],
												text: "Box 345, lilongwe",
												fontSize: 8
											}
										]
									]
								},
								layout: {
									defaultBorder: false
								}
							},
							{
								style: "tableExample",
								table: {
									body: body2
								},
								layout: {
									defaultBorder: false
								}
							}
						]
					]
				},
				layout: {
					defaultBorder: false
				}
			}
		]
	};
	const pdfDoc = printer.createPdfKitDocument(docDefinition);
	const pdfFile = pdfDoc.pipe(fs.createWriteStream("facility.pdf"));
	pdfDoc.end();
};
