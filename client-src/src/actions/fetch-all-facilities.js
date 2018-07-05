import axios from "axios";
import settings from '../settings';

export default () => {
    const END_POINT = `${settings.hostname}/api/Facilities`;
    const request = axios.get(END_POINT);
    return {
        type: 'FETCH_ALL_FACILITIES',
        payload: request
    };
};