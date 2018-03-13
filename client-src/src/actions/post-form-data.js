import axios from "axios";
import settings from "../settings";
export default function postFormData(postData,token) {

    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `/Facilities`;

    const header = {
            Authorization: `${token}`
    };
    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios({
           method: 'post',
           url: URL,
           data: postData,
           headers: header
           });
    return {
        type: "POST_FORM_DATA",
        payload: request
    };
}
