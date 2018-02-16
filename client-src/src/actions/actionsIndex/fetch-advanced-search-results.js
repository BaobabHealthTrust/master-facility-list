import axios from "axios";
import settings from '../../settings';
import { map } from "lodash";

export default facilityIds => {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Facilities/`;

    const FILTER = {
        limit: 10,
        where: {
            id: {
                inq: map(facilityIds)
            }
        },
        include: [
            "owner",
            "facilityType",
            "operationalStatus",
            "regulatoryStatus",
            "contactPeople",
            "locations",
            { district: "zone" }
        ]
    };

    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);

    return {
        type: "FETCH_ADVANCED_SEARCH_RESULTS",
        payload: request
    };
};
