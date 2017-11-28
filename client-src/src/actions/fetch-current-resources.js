import axios from "axios";

export default function fetchCurrentResources(id) {
    const END_POINT = "http://192.168.2.252:3000/api/";
    const RESOURCE = `Facilities/${id}/resources`;
    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios.get(URL);
    return {
        type: "FETCH_CURRENT_RESOURCES",
        payload: request
    };
}
