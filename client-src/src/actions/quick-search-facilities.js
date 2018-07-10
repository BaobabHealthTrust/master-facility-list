import axios from 'axios';
import settings from "../settings";

export default searchTerm => {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = 'Facilities/list';
  const URL = `${END_POINT}${RESOURCE}?regex=${searchTerm}`;
  const request = axios.get(URL);
  return {
    type: 'FETCH_QUICK_SEARCH',
    payload: request
  };
};
