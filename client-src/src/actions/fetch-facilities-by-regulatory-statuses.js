import axios from "axios";
import settings from '../settings';

export default districts => {
    const END_POINT = `${settings.hostname}/api/Facilities/aggregates/regulatorystatuses?districts=${JSON.stringify(districts)}`;
    const request = axios.get(END_POINT);
    return {
        type: "FETCH_FACILITIES_BY_REGULATORY_STATUSES",
        payload: request
    };
};