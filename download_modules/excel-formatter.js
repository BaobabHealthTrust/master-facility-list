"use strict";

const moment = require("moment");
const json2xls = require("json2xls");
const fs = require("fs");

module.exports = function(facilities, callback) {
    const data = [];
    facilities.forEach(e => {
        const facility = e.toJSON();
        data.push({
            CODE: facility.facility_code,
            NAME: facility.facility_name,
            "COMMON NAME": facility.facility_name,
            OWNERSHIP: facility.owner.facility_owner,
            TYPE: facility.facilityType.facility_type,
            STATUS: facility.operationalStatus.facility_operational_status,
            ZONE: facility.district.zone.zone_name,
            DISTRICT: facility.district.district_name,
            "DATE OPENED": moment(facility.facility_date_opened).format(
              "MMM Do YY"
            )
        });
    });

    try {
        const xls = json2xls(data);
        // fs.writeFileSync('malu.xlsx', xls, 'binary')
        callback(null, xls);
    } catch (error) {
        callback(error);
    }
};
