import axios from 'axios';
import settings from "../settings";

export default searchTerm => {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = 'Facilities';
    const REGEX = `.*${searchTerm}`;
    const FILTER = {
        where: {
            facility_name: { regexp: REGEX }
        },
        limit: 5
    };
    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);
    return {
        type: 'FETCH_QUICK_SEARCH',
        payload: request
    };
};
