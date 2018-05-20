import axios from "axios";
import settings from "../settings";
const token = "XqmSAgEQsMZlhsHDI8cwfHvcHn8jiFmthgA5JilgNMNk7D39FoOoH8A406hNo7Ue"; //from sessionStorage

export default function postFormData(data, resource, endpoint, method, actionType) {
    const END_POINT = `${settings.hostname}/api/`;

    const headers = {
        Authorization: token
    };

    const url = `${END_POINT}${resource}/${endpoint}`;
    const response = axios({ method, url, data, headers });

    return {
        type: actionType,
        payload: response
    };
}
