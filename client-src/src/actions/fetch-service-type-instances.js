import axios from "axios";
import settings from '../settings';

export default function fetchServicetypeInstances(value) {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Services`;

    const FILTER = {
        where: {
            service_type_id: value
        }
    };

    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);
    return {
        type: "FETCH_SERVICE_TYPE_INSTANCES",
        payload: request
    };
}
