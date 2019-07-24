const facilityData = require('./facility-data');

module.exports = async (facility) => {
    const { contactPerson, geolocation, address, operationalStatus } = await facilityData(facility);
    const facilityCodeMaps = facility.facility_code_mapping;
    const extraIdentifiers = [];
    if (facilityCodeMaps && Array.isArray(facilityCodeMaps)) {
        facilityCodeMaps.forEach(facilityCodeMap => {
            const { system, code, url } = facilityCodeMap;
            extraIdentifiers.push({
                system: system,
                value: code,
                url: url || ''
            })
        })
    }
    const url = `http://${process.env.HOST}:${process.env.PORT}/api/facilities/${facility.id}`;
    const { contact_person_phone = '', contact_person_email = '' } = contactPerson;
    const { latitude = '', longitude = '' } = geolocation;
    const { facility_code, facility_name, common_name } = facility;
    const { postal_address = '', physical_address = '', village = '' } = address;
    return {
        resourceType: 'Location',
        id: facility.id,
        identifier: [
            {
                "system": "mhfr",
                value: facility_code,
                url
            },
            ...extraIdentifiers
        ],
        status: 'active',
        operationalStatus: {
            display: operationalStatus.facility_operational_status,
            user_selected: true
        },
        name: facility_name,
        alias: common_name,
        mode: 'instance',
        telecom: [
            {
                "system": "phone",
                "value": contact_person_phone
            },
            {
                "system": "email",
                "value": contact_person_email
            }
        ],
        position: {
            latitude,
            longitude,
        },
        address: {
            use: 'work',
            type: 'both',
            line: [
                physical_address,
                postal_address,
                village
            ]
        },
        endpoint: url
    }
}