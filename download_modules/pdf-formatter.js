const PdfPrinter = require("pdfmake");
const moment = require("moment");
const fs = require("fs");

module.exports = function(queriedDetails, res) {
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
	const facilityListHeading = "    LIST OF HEALTH FACILITIES";
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
								text:
									+currentPage.toString()
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
			{   margin: [-37, 0, 0, 0],
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
	const pdfDoc = printer.createPdfKitDocument(docDefinition);
	const pdfFile = pdfDoc.pipe(fs.createWriteStream("facilities.pdf"));
	pdfDoc.end();
};
