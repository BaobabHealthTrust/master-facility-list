import axios from "axios";
import settings from "../settings";

export default searchValues => {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = `Facilities/`;

    const query = [];

    if (searchValues.districtValues.length > 0) {
        query.push({
            district_id: {
                inq: searchValues.districtValues.map(v => Number(v))
            }
        });
    }

    if (searchValues.operationalStatusValues.length > 0) {
        query.push({
            facility_operational_status_id: {
                inq: searchValues.operationalStatusValues.map(v => Number(v))
            }
        });
    }

    if (searchValues.facilityTypeValues.length > 0) {
        query.push({
            facility_type_id: {
                inq: searchValues.facilityTypeValues.map(v => Number(v))
            }
        });
    }

    if (searchValues.facilityOwnerValues.length > 0) {
        query.push({
            facility_owner_id: {
                inq: searchValues.facilityOwnerValues.map(v => Number(v))
            }
        });
    }

    if (searchValues.regulatoryStatusValues.length > 0) {
        query.push({
            facility_regulatory_status_id: {
                inq: searchValues.regulatoryStatusValues.map(v => Number(v))
            }
        });
    }

    if (query.length === 0) {
        query.push({
            id: 0
        });
    }

    const FILTER = {
        where: {
            and: query
        },
        fields: {
            id: true
        }
    };

    const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    const request = axios.get(URL);

    return {
        type: "FETCH_BASIC_DETAILS_RESULTS",
        payload: request
    };
};
