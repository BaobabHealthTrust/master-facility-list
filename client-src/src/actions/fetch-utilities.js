import axios from "axios";
import settings from "../settings";

export default function fetchUtilities() {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Utilities`;
    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios.get(URL);
    return {
        type: "FETCH_UTILITIES",
        payload: request
    };
}
