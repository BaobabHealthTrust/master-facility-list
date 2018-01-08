"use strict";

const PdfPrinter = require("pdfmake");
const moment = require("moment");
const generatePdfFile = require("../../download_modules/pdf-formatter");
const generateCsvFile = require("../../download_modules/csv-formatter");
const generateExcelFile = require("../../download_modules/excel-formatter");
const generatePdfFileForOneFacility =
require("../../download_modules/pdf-one-facility-formatter");
const server = require("../../server/server");
const FacilityService = server.models.FacilityService;
const ServiceType = server.models.ServiceType;
const FacilityResource = server.models.FacilityResource;
const ResourceType = server.models.ResourceType;
const FacilityUtility = server.models.FacilityUtility;
const UtilityType = server.models.UtilityType;

const getFacilityService =
require("../../download_modules/get-facility-services");

const fs = require("fs");

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
				if (inputData.format == "pdf") {
					generatePdfFile(queriedDetails, res);
				}

				if (inputData.format == "excel") {
					generateExcelFile(queriedDetails, res);
				}

				if (inputData.format == "csv") {
					generateCsvFile(queriedDetails, res);
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
	let facilityId = {};
	Facility.downloadOne = function(facility, res, cb) {
		Facility.find(
			{
				where: facility.where,
				include: [
					"locations",
					"contactPeople",
					"regulatoryStatus",
					"operationalStatus",
					"owner",
					"facilityType",
					"addresses",
					{district: "zone"}
				]
			},
			function(err, queriedDetails) {
				facilityId = {facility_id: queriedDetails[0].id};
				server.models.FacilityService.find(
					{
						where: facilityId,
						include: {service: ["serviceType", "category"]}
					},
					function(err, serviceDetails) {
						server.models.ServiceType.find(function(
							err,
							serviceTypeDetails
						) {
							server.models.FacilityResource.find(
								{
									where: facilityId,
									include: {resource: "resourceType"}
								},
								function(err, resourceDetails) {
									server.models.ResourceType.find(function(
										err,
										resourceTypeDetails
									) {
										server.models.FacilityUtility.find(
											{
												where: facilityId,
												include: {
													utility: "utilityType"
												}
											},
											function(err, utilityDetails) {
												server.models.UtilityType.find(
													function(
														err,
														utilityTypeDetails
													) {
											 generatePdfFileForOneFacility(
															queriedDetails,
															serviceDetails,
															serviceTypeDetails,
															resourceDetails,
															resourceTypeDetails,
															utilityDetails,
															utilityTypeDetails
														);
													}
												);
											}
										);
									});
								}
							);
						});
					}
				);
			}
		);
	};
	Facility.remoteMethod("downloadOne", {
		description: "Download one facility with all details",
		accepts: {arg: "data", type: "object"},
		returns: {arg: "facilities", type: "blob"}
	});
};
