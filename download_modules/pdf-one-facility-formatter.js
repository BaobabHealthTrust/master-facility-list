"use strict";

const PdfPrinter = require("pdfmake");
const moment = require("moment");
const uniq = require("lodash");
const fs = require("fs");

module.exports = function(
	queriedDetails,
	serviceDetails,
	serviceTypeDetails,
	resourceDetails,
	resourceTypeDetails,
	utilityDetails,
	utilityTypeDetails
) {
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
	const bodyServices = [];
	const bodyResources = [];
	const bodyUtilities = [];

	const jsonDetails = queriedDetails[0].toJSON();
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
	dateOpened = moment(jsonDetails.facility_date_opened).format("MMM Do YY");

	const presentServiceTypes = serviceTypeDetails.filter(serviceTypes => {
		return uniq(
			serviceDetails.map(services => {
				const jsonServiceDetails = services.toJSON();
				return jsonServiceDetails.service.serviceType.id;
			})
		).includes(serviceTypes.id);
	});

	presentServiceTypes.map(serviceType => {
		bodyServices.push([
			{
				colSpan: 3,
				border: [false, false, false, true],
				fillColor: "#ffffff",
				text: serviceType.service_type
			},
			"",
			""
		]);
		serviceDetails
			.filter(service => {
				const jsonServiceDetails = service.toJSON();
				return (
					jsonServiceDetails.service.service_type_id ===
					serviceType.id
				);
			})
			.map(res => {
				const jsonRes = res.toJSON();
				bodyServices.push(
					[
						{
							colSpan: 3,
							border: [false, false, false, false],
							fillColor: "#ffffff",
							text: "==>" + jsonRes.service.service_name,
							fontSize: 8
						},
						"",
						""
					],
					[
						{
							colSpan: 3,
							border: [false, false, false, false],
							fillColor: "#ffffff",
							text: "====>" + jsonRes.service.service_name,
							fontSize: 8
						},
						"",
						""
					]
				);
			});
	});

	const presentResourceTypes = resourceTypeDetails.filter(resourceTypes => {
		return uniq(
			resourceDetails.map(resources => {
				const jsonResourceDetails = resources.toJSON();
				return jsonResourceDetails.resource.resourceType.id;
			})
		).includes(resourceTypes.id);
	});

	presentResourceTypes.map(resourceType => {
		bodyResources.push([
			{
				colSpan: 3,
				border: [false, false, false, true],
				fillColor: "#ffffff",
				text: resourceType.resource_type
			},
			"",
			""
		]);
		resourceDetails
			.filter(resource => {
				const jsonResourceDetails = resource.toJSON();
				return (
					jsonResourceDetails.resource.resource_type_id ===
					resourceType.id
				);
			})
			.map(res => {
				const jsonRes = res.toJSON();
				bodyResources.push([
					{
						colSpan: 3,
						border: [false, false, false, false],
						fillColor: "#ffffff",
						text: "==>" + jsonRes.resource.resource_name,
						fontSize: 8
					},
					"",
					""
				]);
			});
	});

	const presentUtilityTypes = utilityTypeDetails.filter(utilityTypes => {
		return uniq(
			utilityDetails.map(utilities => {
				const jsonUtilityDetails = utilities.toJSON();
				return jsonUtilityDetails.utility.utilityType.id;
			})
		).includes(utilityTypes.id);
	});

	console.log(presentUtilityTypes);

    presentUtilityTypes.map(utilityType => {
		bodyUtilities.push([
			{
				colSpan: 3,
				border: [false, false, false, true],
				fillColor: "#ffffff",
				text: utilityType.utility_type
			},
			"",
			""
		]);
		utilityDetails
			.filter(utility => {
				const jsonUtilityDetails = utility.toJSON();
				return (
					jsonUtilityDetails.utility.utility_type_id ===
					utilityType.id
				);
			})
			.map(res => {
				const jsonRes = res.toJSON();
				bodyUtilities.push([
					{
						colSpan: 3,
						border: [false, false, false, false],
						fillColor: "#ffffff",
						text: "==>" + jsonRes.utility.utility_name,
						fontSize: 8
					},
					"",
					""
				]);
			});
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
								text: "FACILITY SUMMARY"
							},

							{
								border: [true, true, true, true],
								text: "SERVICES"
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
								border: [true, true, true, true],
								style: "tableExample",
								table: {
									body: bodyServices
								},
								layout: {
									defaultBorder: false
								}
							}
						],
						[
							{
								border: [true, true, false, true],
								text: "",
								fontSize: 8
							},

							{
								border: [true, true, true, true],
								text: "RESOURCES"
							}
						],
						[
							{
								border: [true, true, false, true],
								text: "",
								fontSize: 8
							},
							{
								border: [true, true, true, true],
								style: "tableExample",
								table: {
									body: bodyResources
								},
								layout: {
									defaultBorder: false
								}
							}
						],
						[
							{
								border: [true, true, false, true],
								text: "",
								fontSize: 8
							},

							{
								border: [true, true, true, true],
								text: "UTILITIES"
							}
						],
						[
							{
								border: [true, true, false, true],
								text: "",
								fontSize: 8
							},
							{
								border: [true, true, true, true],
								style: "tableExample",
								table: {
									body: bodyUtilities
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
