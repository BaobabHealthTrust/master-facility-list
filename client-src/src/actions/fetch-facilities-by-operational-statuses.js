import axios from "axios";
import settings from '../settings';
import { map } from "lodash";
import DistrictTags from "../Facility/AdvancedSearch/DistrictTags";

export default districts => {
    const END_POINT = `${settings.hostname}/api/Facilities/aggregates/operationalstatuses?districts=${JSON.stringify(districts)}`;
    const request = axios.get(END_POINT);
    return {
        type: "FETCH_FACILITIES_BY_OPERATIONAL_STATUSES",
        payload: request
    };
};