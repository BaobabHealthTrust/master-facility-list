import axios from 'axios';
import settings from '../settings';

export default function fetchFacilities(page) {
    const limit = 15;
    const skip = (page - 1) * limit;
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = 'Facilities';
    const FILTER = {
        limit,
        skip,
        include: [
            'owner',
            'facilityType',
            'operationalStatus',
            'regulatoryStatus',
            'contactPeople',
            'locations',
            { district: 'zone' }
        ]
    };
    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);
    return {
        type: 'FETCH_FACILITIES',
        payload: request
    };
}
