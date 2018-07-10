import axios from "axios";
import settings from '../settings';

export default districts => {
    const END_POINT = `${settings.hostname}/api/Facilities/aggregates/typeandownership?districts=${JSON.stringify(districts)}`;
    const request = axios.get(END_POINT);
    return {
        type: "FETCH_FACILITIES_BY_TYPE_AND_OWNERSHIP",
        payload: request
    };
};