import axios from 'axios';
import settings from '../settings';

export default function(format) {
    const request = axios({
        method: 'POST',
        url: `${settings.hostname}/api/Facilities/download`,
        data: {
            data: {
                where: { district_id: 6 },
                format
            }
        },
        responseType: 'arraybuffer'
    });

    return {
        type: 'DOWNLOAD_FACILITIES',
        payload: request
    };
}
