"use strict";

const moment = require("moment");
const excel = require('node-excel-export');

/** File Data set */
const dataset = [];

/** Excel file styles */
const style = {
    font: {
        color: {
            rgb: '00000000',
        }
    },
};

/**
 * Create header cells for the excel file.
 * @param {string} value Cell value.
 */
const cell = (value) => {
    return {
        displayName: value,
        headerStyle: style,
        cellStyle: style
    };
};

/** File column header and style specification */
const specification = {
  CODE: cell('CODE'),
  NAME: cell('NAME'),
  "COMMON NAME": cell('COMMON NAME'),
  OWNERSHIP: cell('OWNERSHIP'),
  TYPE: cell('TYPE'),
  STATUS: cell('STATUS'),
  ZONE: cell('ZONE'),
  DISTRICT: cell('DISTRICT'),
  "DATE OPENED": cell('DATE OPENED')
};

/**
 * Process a facility for file generation.
 * @param {object} facility Facility object.
 */
const processFacility = facility => {
    const data = facility.toJSON();
    dataset.push({
        CODE: data.facility_code,
        NAME: data.facility_name,
        "COMMON NAME": data.facility_name,
        OWNERSHIP: data.owner.facility_owner,
        TYPE: data.facilityType.facility_type,
        STATUS: data.operationalStatus.facility_operational_status,
        ZONE: data.district.zone.zone_name,
        DISTRICT: data.district.district_name,
        "DATE OPENED": moment(data.facility_date_opened).format("MMM Do YY")
    });
};

/**
 * Generate an excel file
 * @param {array} facilities List of facilities.
 * @param {function} callback callback function.
 */
module.exports = function(facilities, callback) {
    if (facilities == null) {
        const error = new Error("Facilities can not be null.");
        error.name = "ERROR";
        error.status = 400;
        callback(error);
    }

    try {
        facilities.forEach(processFacility);

        const report = excel.buildExport([{
            name: 'Report',
            specification: specification,
            data: dataset
        }]);

        callback(null, report);
    } catch (error) {
        callback(error);
    }
};
