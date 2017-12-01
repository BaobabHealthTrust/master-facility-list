const moment = require("moment");
const json2xls = require("json2xls");

module.exports = function(queriedDetails, res) {
	const jsonArrayData = [];
	queriedDetails.forEach(details => {
		const jsonDetails = details.toJSON();
		jsonArrayData.push({
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

	res.xls("facilities.xlsx", jsonArrayData);
};
