import axios from "axios";
import settings from "../settings";

export default searchValues => {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `FacilityResources/`;

    const query = [];

    if (searchValues.typeInstanceValues.length > 0) {
        query.push({
            resource_id: {
                inq: searchValues.typeInstanceValues.map(v => Number(v))
            }
        });
    }



    if (query.length === 0) {
        query.push({
            facility_id: 0
        });
    }

    const FILTER = {
        where: {
            and: query
        },
        fields: {
            facility_id: true
        }
    };

    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);

    return {
        type: "FETCH_BASIC_DETAILS_RESULTS",
        payload: request
    };
};
