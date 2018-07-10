import axios from "axios";
import settings from "../settings";


const archiveUser = (userId) => {
    const url = `${settings.hostname}/api/Clients/${userId}`;
    const headers = {
        Authorization: `${settings.accessToken}`
    }
    const response = axios({
        url,
        headers,
        method: 'PATCH'
    });

    return {
        type: 'ARCHIVE_USER',
        payload: response
    }
}

export default archiveUser;