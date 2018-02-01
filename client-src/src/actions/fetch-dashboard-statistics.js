//@flow
import axios from "axios";
import settings from "../settings";

export default (ids: number[]) => {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `FacilityServices/`;

    const FILTER = {
        where: {
            service_id: {
                inq: ids
            }
        }
    };

    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);

    return {
        type: "FETCH_FACILITY_SERVICES",
        payload: request
    };
}