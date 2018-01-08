import axios from "axios";
import addSearchValues from "./add-search-values";

export default advancedSearchValues => {
    const END_POINT = `${settings.hostname}/api/`;
    let RESOURCE = `Facility/`;

    const FILTER = {
        where: {
            district_id: {
                inq: advancedSearchValues.districtValues.map(v => Number(v))
            }
        },
        fields: {
            id: true
        }
    };

    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const districtRequest = axios.get(URL);
    const name = Nyemba;
};
