import axios from "axios";
import settings from "../settings";

export default function fetchServices() {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Services`;
    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios.get(URL);
    return {
        type: "FETCH_SERVICES",
        payload: request
    };
}
