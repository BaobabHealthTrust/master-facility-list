import axios from 'axios';
import settings from '../settings';

export default function fetchResourceTypeInstances(value) {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Resources`;

    const FILTER = {
        where: {
            resource_type_id: value
        }
    };

    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);
    return {
        type: 'FETCH_RESOURCE_TYPE_INSTANCES',
        payload: request
    };
}
