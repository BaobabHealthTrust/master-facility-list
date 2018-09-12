'use strict'
const server = require("../../server/server");
const facilityData = require('./facility-data');
const fhirCompliantFacilitySchema = require('./fhir-compliant-facility-schema');

module.exports = async () => {
    const facilities = await server.models.Facility.find();
    const fhirCompliantFacilities = facilities.map(async (facility) => {
        return fhirCompliantFacilitySchema(facility);
    });
    return {
        name: 'MHFR',
        locations: await Promise.all(fhirCompliantFacilities)
    }
}