"use strict";

const moment = require("moment");
const excel = require("node-excel-export");

const styles = {
  headerDark: {
    fill: { fgColor: { rgb: "FFFFFFFF" } },
    font: {
      color: { rgb: "FF000000" },
      sz: 14,
      bold: true,
      underline: true
    }
  }
};

/**
 * Create header cells for the excel file.
 * @param {string} value Cell value.
 */
const cell = (displayName, width = 100) => {
  return { displayName, headerStyle: styles.headerDark, width };
};

const getSpecifications = () => {
  return {
    CODE: cell("CODE", 80),
    NAME: cell("NAME", 300),
    "COMMON NAME": cell("COMMON NAME", 300),
    OWNERSHIP: cell("OWNERSHIP", 150),
    TYPE: cell("TYPE"),
    STATUS: cell("STATUS", 300),
    ZONE: cell("ZONE", 150),
    DISTRICT: cell("DISTRICT"),
    "DATE OPENED": cell("DATE OPENED"),
    LATITUDE: cell("LATITUDE"),
    LONGITUDE: cell("LONGITUDE")
  };
};

const processFacility = facility => {
  const data = facility.toJSON();
  const { latitude = "", longitude = "" } = data.geolocations;
  return {
    CODE: data.facility_code,
    NAME: data.facility_name,
    "COMMON NAME": data.common_name,
    OWNERSHIP: data.owner.facility_owner,
    TYPE: data.facilityType.facility_type,
    STATUS: data.operationalStatus.facility_operational_status,
    ZONE: data.district.zone.zone_name,
    DISTRICT: data.district.district_name,
    "DATE OPENED": moment(data.facility_date_opened).format("MMM Do YY"),
    LATITUDE: latitude,
    LONGITUDE: longitude
  };
};

const processFacilities = async (facilities = []) => {
  const dataSet = [];

  for (const facility of facilities) {
    await dataSet.push(await processFacility(facility));
  }

  return dataSet;
};

module.exports = async (facilities, callback) => {
  if (facilities == null) {
    const error = new Error("Facilities can not be null.");
    error.name = "ERROR";
    error.status = 400;
    callback(error);
  }

  try {
    const dataset = await processFacilities(facilities);

    const buildExcelFileoptions = {
      name: "Facilities",
      specification: await getSpecifications(),
      data: dataset
    };

    const report = excel.buildExport([buildExcelFileoptions]);

    callback(null, report);
  } catch (error) {
    callback(error);
  }
};
