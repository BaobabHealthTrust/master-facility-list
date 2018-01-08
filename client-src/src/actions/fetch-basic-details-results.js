import axios from "axios";
import settings from "../settings";

export default searchValues => {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Facilities/`;

    const FILTER = {
        where: {
            and: [
                {
                    district_id: {
                        inq: searchValues.districtValues.map(v => Number(v))
                    }
                },
                {
                    facility_operational_status_id: {
                        inq: searchValues.operationalStatusValues.map(v =>
                            Number(v)
                        )
                    }
                }
            ]
        },
        fields: {
            id: true
        }
    };

    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);

    return {
        type: "FETCH_DISTRICT_RESULTS",
        payload: request
    };
};
