import axios from "axios";
import settings from "../settings";
import moment from 'moment';

const fetchUsers = (limit = 5, skip = 0) => {
    const url = `
        ${settings.hostname}/api/Clients?filter[limit]=${limit}
        &filter[skip]=${skip}
        &filter[order]=created_at%20DESC
        &access_token=${sessionStorage.getItem('token')}
    `;

    const headers = {
        Authorization: `${settings.accessToken}`
    };

    const response = axios({
        url,
        headers,
        method: 'get'
    }); 

    return {
        type: 'FETCH_USERS',
        payload: response
    };
}

export default fetchUsers;