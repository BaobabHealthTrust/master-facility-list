//@flow
import axios from 'axios';
import settings from "../settings";

export default function fetchFacilities(page: ?number) {
    const END_POINT = `${settings.hostname}/api/`;
    const RESOURCE = 'Facilities';
    let URL = `${END_POINT}${RESOURCE}`;

    if (page) {
        const limit = 2000;
        const skip = (page - 1) * limit;
        const FILTER = {
            limit,
            skip,
            include: [
                'owner',
                'facilityType',
                'operationalStatus',
                'regulatoryStatus',
                'contactPeople',
                'locations',
                { district: 'zone' }
            ]
        };
        URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
    }

    const request = axios.get(URL);

    const actionType = page ? 'FETCH_FACILITIES' : 'FETCH_ALL_FACILITIES';

    return {
        type: actionType,
        payload: request
    };
}
