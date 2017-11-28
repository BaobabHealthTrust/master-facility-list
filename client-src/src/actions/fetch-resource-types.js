import axios from "axios";

export default function fetchResourceTypes() {
    const END_POINT = "http://192.168.2.252:3000/api/";
    const RESOURCE = `ResourceTypes`;
    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios.get(URL);
    return {
        type: "FETCH_RESOURCE_TYPES",
        payload: request
    };
}
