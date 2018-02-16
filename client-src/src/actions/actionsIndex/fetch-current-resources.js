import axios from 'axios';
import settings from '../../settings';

export default function fetchCurrentResources(id) {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `FacilityResources/`;

    const FILTER = {
        where: {
            facility_id: id
        },
        include: 'resource'
    };

    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);
    return {
        type: 'FETCH_CURRENT_RESOURCES',
        payload: request
    };
}
