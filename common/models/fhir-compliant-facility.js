const server = require("../../server/server");
const facilityData = require('./facility-data');
const fhirCompliantFacilitySchema = require('./fhir-compliant-facility-schema');

module.exports = async (id) => {
    const facility = await server.models.Facility.findOne({ where: { id } });
    return fhirCompliantFacilitySchema(facility);
}