import axios from 'axios';

export default function fetchFacilitiesDetails() {
    const END_POINT = 'http://192.168.2.252:3000/api/';
    
    const RESOURCE = 'Facilities/23/';
    const FILTER = {
        limit: 8,
        include: [
            'contactPeople',
            'addresses',
            'regulatoryStatus',
            'owner',
            'facilityType',
            'operationalStatus',
            { locations: 'district' }
        ]
    };
    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);

    return {
        type: 'FETCH_FACILITY_DETAILS',
        payload: request
    };
}
