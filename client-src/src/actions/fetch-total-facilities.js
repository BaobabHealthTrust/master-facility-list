import axios from "axios";
import settings from '../settings';

export default (districts) => {
    const END_POINT = `${settings.hostname}/api/Facilities/total?districts=${JSON.stringify(districts)}`;
    const request = axios.get(END_POINT);
    return {
        type: 'FETCH_TOTAL_FACILITIES',
        payload: request
    };
};
