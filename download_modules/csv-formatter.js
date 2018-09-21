'use strict';

const moment = require("moment");
const json2csv = require("json2csv");

/** CSV file columns heading */
const fields = [
    "CODE",
    "NAME",
    "COMMON NAME",
    "OWNERSHIP",
    "TYPE",
    "STATUS",
    "ZONE",
    "DISTRICT",
    "DATE OPENED",
];

/**
 * Process a facility for file generation.
 * @param {object} facility Facility object.
 */
const processFacility = facility => {
    const data = facility.toJSON();
    const date = moment(data.facility_date_opened).format("MMM Do YY");
    return {
        CODE: data.facility_code,
        NAME: data.facility_name,
        "COMMON NAME": data.facility_name,
        OWNERSHIP: data.owner.facility_owner,
        TYPE: data.facilityType.facility_type,
        STATUS: data.operationalStatus.facility_operational_status,
        ZONE: data.district.zone.zone_name,
        DISTRICT: data.district.district_name,
        "DATE OPENED": date
    };
};

/**
 * Generate an csv file
 * @param {array} facilities List of facilities.
 * @param {function} callback callback function.
 */
module.exports = (facilities, callback) => {
    if (facilities == null) {
        const error = new Error("Facilities can not be null.");
        error.name = "ERROR";
        error.status = 400;
        callback(error);
    }

    try {
        const data = facilities.map(processFacility);
        const file = json2csv({data, fields});
        callback(null, file);
    } catch (error) {
        callback(error);
    }
};
