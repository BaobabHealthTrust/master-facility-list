"use strict";

const server = require("../server/server");
const FacilityService = server.models.FacilityService;
const generatePdfFileForOneFacility =
require("../download_modules/pdf-one-facility-formatter");

module.exports = function(facility, res) {
	 server.models.FacilityService.find(
		 	{
		 		where: facility.where,
		 		include: ["service"],
		 	},
			 function(err, queriedDetails) {
			 	generatePdfFileForOneFacility(queriedDetails, res);
			 }
		);
}
