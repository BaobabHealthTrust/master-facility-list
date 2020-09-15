"use strict";
const server = require("../../server/server");
const facilityData = require("./facility-data");
const fhirCompliantFacilitySchema = require("./fhir-compliant-facility-schema");

module.exports = async where => {
  let facilities;
  try {
    facilities = await server.models.Facility.find(where);
  } catch (e) {
    const error = new Error();
    error.message = "invalid operands";
    error.status = 500;
    throw error;
  }
  const fhirCompliantFacilities = facilities.map(async facility => {
    return fhirCompliantFacilitySchema(facility);
  });
  return {
    name: "MHFR",
    locations: await Promise.all(fhirCompliantFacilities)
  };
};
