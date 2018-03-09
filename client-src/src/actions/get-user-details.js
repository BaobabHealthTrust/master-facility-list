import axios from "axios";
import settings from "../settings";
export default function getUserDetails(id, token) {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Clients/${id}`;
    const FILTER = {
        fields: {
            firstname: true,
            lastname: true
        }
    };
    const header = {
        headers: {
            Authorization: `${token}`
        }
    };
    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL, header);
    return {
        type: "GET_USER_DETAILS",
        payload: request
    };
}
