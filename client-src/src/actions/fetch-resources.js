import axios from "axios";
import settings from "../settings";

export default function fetchResources() {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Resources`;
    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios.get(URL);
    return {
        type: "FETCH_RESOURCES",
        payload: request
    };
}
