import axios from 'axios';
import settings from '../../settings';
export default function fetchCurrentDetails(id) {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Facilities/${id}`;
    const FILTER = {
        include: [
            'owner',
            'facilityType',
            'operationalStatus',
            'regulatoryStatus',
            'contactPeople',
            'addresses',
            'locations',
            { district: 'zone' }
        ]
    };
    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);
    return {
        type: 'FETCH_FACILITY_DETAILS',
        payload: request
    };
}
