import axios from "axios";
import settings from "../settings";
export default function postFormData(
    postData,
    resource,
    method,
    actionName,
    token
) {
    const END_POINT = `${settings.hostname}/api/`;

    const header = {
        Authorization: `${token}`
    };
    const URL = `${END_POINT}${resource}`;
    const request = axios({
        method: method,
        url: URL,
        data: postData,
        headers: header
    });
    return {
        type: actionName,
        payload: request
    };
}
