import axios from "axios";
import settings from '../settings';

export default (service_name, action) => {
    const END_POINT = `${settings.hostname}/api/Facilities/facilitieswithservice?service_name=${service_name}`;
    const request = axios.get(END_POINT);
    return {
        type: action,
        payload: request
    };
};