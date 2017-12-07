import axios from "axios";

export default function fetchCurrentResources(id) {
    const END_POINT = "http://192.168.2.252:3000/api/";
    const RESOURCE = `FacilityUtilities/`;

    const FILTER = {
        where: {
            facility_id: id
        },
        include: "utility"
    };

    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);
    return {
        type: "FETCH_CURRENT_UTILITIES",
        payload: request
    };
}
