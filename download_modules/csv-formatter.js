const moment = require("moment");
const json2csv = require("json2csv");

module.exports = function(queriedDetails, res) {
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
	const csvDetails = json2csv({
		data: csvArrayData,
		fields: fields
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
	res.set("Content-Disposition", "attachment;filename=facilities.csv");
	res.set("Content-Transfer-Encoding", "binary");
	res.send(csvDetails);
};
