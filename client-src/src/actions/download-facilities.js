import axios from "axios";

export default function(format) {
    const request = axios({
        method: "POST",
        url: "http://server1:3000/api/Facilities/download",
        data: {
            data: {
                where: { district_id: 6 },
                format
            }
        },
        responseType: "arraybuffer"
    });

    return {
        type: "DOWNLOAD_FACILITIES",
        payload: request
    };
}
