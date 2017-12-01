"use strict";

const PdfPrinter = require("pdfmake");
const moment = require("moment");
const generatePdfFile = require("../../download_modules/pdf-formatter");
const generateCsvFile = require("../../download_modules/csv-formatter");
const generateExcelFile = require("../../download_modules/excel-formatter");
const generatePdfFileForOneFacility =require("../../download_modules/pdf-one-facility-formatter");

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
					{ district: "zone" }
				]
			},
			function(err, queriedDetails) {
				if (inputData.format == "pdf") {
					  generatePdfFile(queriedDetails,res);	
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
			{ arg: "data", type: "object" },
			{ arg: "res", type: "object", http: { source: "res" } }
		],
		returns: {}
	});

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
					{ district: "zone" }
				]
			},
			function(err, queriedDetails) {	
				generatePdfFileForOneFacility(queriedDetails, res)
			}
		);
	};
	Facility.remoteMethod("downloadOne", {
		description: "Download one facility with all details",
		accepts: { arg: "data", type: "object" },
		returns: { arg: "facilities", type: "blob" }
	});
};
