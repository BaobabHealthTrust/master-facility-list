import axios from "axios";
import settings from "../settings";
const token = "CABhUk0CDL94am2Iz2WFQqTgLuJEccrJjwcky1hkukJqyiRi91v4KGmqrF9Hzb4E"; //from sessionStorage

export default function postFormData(data, resource, endpoint, method, actionType) {
    const END_POINT = `${settings.hostname}/api/`;

    const headers = {
        Authorization: `${token}`
    };

    const url = `${END_POINT}${resource}/${endpoint}`;
    const response = axios({ method, url, data, headers });

    return {
        type: actionType,
        payload: response
    };
}
