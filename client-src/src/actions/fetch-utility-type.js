import axios from 'axios';
import settings from '../settings';

export default function fetchUtilityType() {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `UtilityType`;
    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios.get(URL);
    return {
        type: 'FETCH_UTILITY_TYPE',
        payload: request
    };
}
