import axios from "axios";
import settings from '../settings';

export default () => {
    const url = `${settings.hostname}/api/FeedbackTYpes`;

    const request = axios.get(url);
    
    return {
        type: "FETCH_FEEDBACK_TYPES",
        payload: request
    };
};
