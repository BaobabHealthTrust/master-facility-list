import axios from 'axios';
import settings from '../settings';

export default function fetchUtilityTypeInstances(e) {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Utilities`;

    const FILTER = {
        where: {
            utility_type_id: e.target.value
        }
    };

    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);
    return {
        type: 'FETCH_UTILITY_TYPE_INSTANCES',
        payload: request
    };
}
