//@flow
import axios from 'axios';
import settings from "../settings";

export default function fetchFacilities(page: ?number) {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = 'Facilities/list';
  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify({})}`;

  const request = axios.get(URL);

  const actionType = page ? 'FETCH_FACILITIES' : 'FETCH_ALL_FACILITIES';

  return {
    type: actionType,
    payload: request
  };
}
