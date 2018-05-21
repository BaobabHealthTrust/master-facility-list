import axios from "axios";
import settings from "../settings";
const token = "CHTEI5jtaKl8yjfXKuDtCYOfaf4lZTNt0cY2GeZ8m4pTyqtGHGhDvfFRS5Fk7Iso"; //from sessionStorage

export default (data) => {

    const url = `${settings.hostname}/api/Facilities?access_token=${token}`;

    const response = axios.post(url, data);

    return {
        type: "POST_FACILITY_BASIC_DETAILS",
        payload: response
    }

}
