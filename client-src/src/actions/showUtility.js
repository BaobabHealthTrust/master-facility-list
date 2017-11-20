import axios from 'axios';

export default function fetchFacilities() {
    const END_POINT ='http://192.168.2.252:3000/api/';
    const RESOURCE = 'Facilities/23/utilities';
    const FILTER = {
        include: [
            'energy provider',
            'water provider',
            'waste disposal',
            'network provider'
        ]
    };
    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);

    return {
        type: 'FETCH_UTILITY',
        payload: request
    };
}
