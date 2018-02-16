import axios from 'axios';
import settings from '../../settings';

export default function fetchResourceTypes() {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `ResourceTypes`;
    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios.get(URL);
    return {
        type: 'FETCH_RESOURCE_TYPES',
        payload: request
    };
}
