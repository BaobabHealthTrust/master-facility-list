const facilityData = require('./facility-data');

module.exports = async (facility) => {
    const { contactPerson, geolocation, address, operationalStatus } = await facilityData(facility);
    const facilityCodeMaps = facility.facility_code_mapping;
    const extraIdentifiers = [];
    if (facilityCodeMaps && Array.isArray(facilityCodeMaps)) {
        facilityCodeMaps.forEach(facilityCodeMap => {
            extraIdentifiers.push({
                system: facilityCodeMap.system,
                value: facilityCodeMap.code,
                url: facilityCodeMap.url || ''
            })
        })
    }
    const url = `http://${process.env.HOST}:${process.env.PORT}/api/facilities/${facility.id}`;
    return {
        resourceType: 'Location',
        id: facility.id,
        identifier: [
            {
                "system": "mhfr",
                value: facility.facility_code,
                url
            },
            ...extraIdentifiers
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
        endpoint: url
    }
}