const PdfPrinter = require("pdfmake");
const moment = require("moment");
const fs = require("fs");

module.exports = function(queriedDetails, res) {
	let facilityName = "";
	let facilityCode = "";
	let commonName = "";
	let facilityType = "";
	let facilityOwner = "";
	let dateOpened = "";
	const body = [
		[
			{ text: "CODE", style: "tableHeader" },
			{ text: "NAME", style: "tableHeader" },
			{ text: "COMMON NAME", style: "tableHeader" },
			{ text: "OWNERSHIP", style: "tableHeader" },
			{ text: "TYPE", style: "tableHeader" },
			{ text: "STATUS", style: "tableHeader" },
			{ text: "ZONE", style: "tableHeader" },
			{ text: "DISTRICT", style: "tableHeader" },
			{ text: "DATE OPENED", style: "tableHeader" }
		]
	];
	queriedDetails.forEach(details => {
		const jsonDetails = details.toJSON();
		facilityName = jsonDetails.facility_name.toUpperCase();
		facilityCode = jsonDetails.facility_code;
		commonName = jsonDetails.facility_name;
		facilityType = jsonDetails.facilityType.facility_type;
		facilityOwner = jsonDetails.owner.facility_owner;
		dateOpened = moment(jsonDetails.facility_date_opened).format(
			"MMM Do YY"
		);
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
			style: 'tableExample',
			table: {
				body: [
					[
						{
							border: [false, true, false, false],
							fillColor: '#eeeeee',
							text: 'border:\n[false, true, false, false]'
						},
						{
							border: [false, false, false, false],
							fillColor: '#dddddd',
							text: 'border:\n[false, false, false, false]'
						},
						{
							border: [true, true, true, true],
							fillColor: '#eeeeee',
							text: 'border:\n[true, true, true, true]'
						}
					],
					[
						{
							rowSpan: 3,
							border: [true, true, true, true],
							fillColor: '#eeeeff',
							text: 'rowSpan: 3\n\nborder:\n[true, true, true, true]'
						},
						{
							border: undefined,
							fillColor: '#eeeeee',
							text: 'border:\nundefined'
						},
						{
							border: [true, false, false, false],
							fillColor: '#dddddd',
							text: 'border:\n[true, false, false, false]'
						}
					],
					[
						'',
						{
							colSpan: 2,
							border: [true, true, true, true],
							fillColor: '#eeffee',
							text: 'colSpan: 2\n\nborder:\n[true, true, true, true]'
						},
						''
					],
					[
						'',
						{
							border: undefined,
							fillColor: '#eeeeee',
							text: 'border:\nundefined'
						},
						{
							border: [false, false, true, true],
							fillColor: '#dddddd',
							text: 'border:\n[false, false, true, true]'
						}
					]
				]
			},
			layout: {
				defaultBorder: false,
			}
		},
			{
				margin: [120, 0, 0, 8],
				style: "tableExample",
				table: {
					body: [
						[
							{   
								border: [true, true, false, true],
								text: "OWNERSHIP",
								fontSize: 8,

							},
							{   
								border: [false, true, false, true],
								text: "",
								fontSize: 8
							},
							{   
								border: [false, true, false, true],
								text: "",
								fontSize: 8
							},
							{
								border: [true, true, false, false],
								text: "SERVICES",
								fontSize: 8,
								padding: [20, 0, 0, 0]
							}
						],
						[
							{
								border: [true, false, false, true],
								text: "Owner",
								fontSize: 8
							},
							{
								border: [false, false, false, true],
								text: ":",
								fontSize: 8
							},
							{   
								border: [false, true, true, true],
								text: facilityOwner,
								fontSize: 8
							},
							{
								border: [false, false, false, false],
								text: "Clinical",
								fontSize: 8							}
						]
					]
				}
			}
		]
	};
	const pdfDoc = printer.createPdfKitDocument(docDefinition);
	const pdfFile = pdfDoc.pipe(fs.createWriteStream("facility.pdf"));
	pdfDoc.end();
};
