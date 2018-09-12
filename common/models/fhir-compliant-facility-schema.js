const facilityData = require('./facility-data'); 

module.exports = async (facility) => {
    const { contactPerson, geolocation, address, operationalStatus } = await facilityData(facility);
    return {
        resourceType: 'Location',
        id: facility.id,
        identifier: [
            {
                value: facility.facility_code
            }
        ],
        status: 'active',
        operationalStatus: {
            display: operationalStatus.facility_operational_status,
            user_selected: true
        },
        name: facility.facility_name,
        alias: facility.common_name,
        mode: 'instance',
        telecom: [
            {
                "system": "phone",
                "value": contactPerson.contact_person_phone
            },
            {
                "system": "email",
                "value": contactPerson.contact_person_email
            }
        ],
        position: {
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
        },
        address: {
            use: 'work',
            type: 'both',
            line: [
                address.physical_address,
                address.postal_address,
                address.village
            ]
        },
        endpoint: `/api/Facilities/fhir/location/${facility.id}`
    }
}