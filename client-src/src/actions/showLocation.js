import axios from 'axios';

export default function fetchFacilities() {
    const END_POINT = 'http://192.168.2.252:3000/api/';
    const RESOURCE = 'Facilities/23/';
    const FILTER = {
        include: [
            'owner',
            'operationalStatus',
            'contactPeople',
            'regulatoryStatus',
            'addresses',
            'locations',
            'geolocations',
            {district:'zone'}
        ]
    };
    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);

    return {
        type: 'FETCH_LOCATION',
        payload: request
    };
}
