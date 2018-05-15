import axios from "axios";
import settings from "../settings";
const token = "QDYQIQS8hca5wNjXSCJu66SWcGSPBWBcSEELbBEAbaocW9j0qGg4BcHMd7FGoVzf"; //from sessionStorage

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
