import axios from "axios";
import settings from "../settings";

export default async function postFormData(data, resource, endpoint, method, actionType) {
    const END_POINT = `${settings.hostname}/api/`;
    const headers = {
        Authorization: `${await sessionStorage.getItem('token')}`
    };

    const url = `${END_POINT}${resource}/${endpoint}`;
    const response = axios({ method, url, data, headers });

    return {
        type: actionType,
        payload: response
    };
}
