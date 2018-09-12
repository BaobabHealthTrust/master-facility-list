const server = require("../../server/server");

module.exports = async (facility) => {
    const contactPerson = await server.models.ContactPeople.findOne({ where: { facility_id: facility.id } });
    const geolocation = await server.models.Geolocation.findOne({ where: { facility_id: facility.id } });
    const address = await server.models.Address.findOne({ where: { facility_id: facility.id } });
    const operationalStatus = await server.models.OperationalStatus.findOne({ where: { id: facility.facility_operational_status_id } });

    const data = {
        contactPerson,
        geolocation,
        address,
        operationalStatus
    }
    return data;
}