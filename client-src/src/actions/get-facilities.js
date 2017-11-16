import axios from 'axios';

export default function fetchFacilities() {
    const END_POINT = 'http://192.168.2.252:3000/api/';
    const RESOURCE = 'Facilities';
    const FILTER = {
        limit: 8,
        include: [
            'owner',
            'facilityType',
            'operationalStatus',
            { locations: 'district' }
        ]
    };
    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);

    return {
        type: 'FETCH_FACILITIES',
        payload: request
    };
}
