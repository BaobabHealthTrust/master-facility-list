import axios from 'axios';
import settings from '../../settings';

export default function fetchUtilityTypes() {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `UtilityTypes`;
    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios.get(URL);
    return {
        type: 'FETCH_UTILITY_TYPES',
        payload: request
    };
}
