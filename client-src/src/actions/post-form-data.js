import axios from "axios";
import settings from "../settings";
export default function postFormData(data, token) {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `/Facilities`;
    const urlData = {
        data: data
    };
    const header = {
        headers: {
            Authorization: `${token}`
        }
    };
    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios.patch(URL, urlData, header);
    return {
        type: "POST_FORM_DATA",
        payload: request
    };
}
