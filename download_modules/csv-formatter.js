"use strict";

const moment = require("moment");
const json2csv = require("json2csv");

module.exports = function(queriedDetails, callback) {
	const fields = [
		"CODE",
		"NAME",
		"COMMON NAME",
		"OWNERSHIP",
		"TYPE",
		"STATUS",
		"ZONE",
		"DISTRICT",
		"DATE OPENED"
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
			STATUS: jsonDetails.operationalStatus.facility_operational_status,
			ZONE: jsonDetails.district.zone.zone_name,
			DISTRICT: jsonDetails.district.district_name,
			"DATE OPENED": moment(jsonDetails.facility_date_opened).format(
				"MMM Do YY"
			)
		});
    });

    try {
        const csvDetails = json2csv({
            data: csvArrayData,
            fields: fields
        });
        callback(null, csvDetails);
    } catch (error) {
        callback(error);
    }
};
