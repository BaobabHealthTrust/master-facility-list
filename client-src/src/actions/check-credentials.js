import axios from "axios";
import settings from "../settings";
export default function checkCredentials(username, password) {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Clients/login/`;
    const credentials = {
        username: username,
        password: password
    };

    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios.post(URL, credentials);

    return {
        type: "CHECK_CREDENTIALS",
        payload: request
    };
}
