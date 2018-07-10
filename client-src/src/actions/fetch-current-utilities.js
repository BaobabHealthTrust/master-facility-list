import axios from 'axios';
import settings from '../settings';

export default function fetchCurrentResources(id) {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `FacilityUtilities/latest?id=${id}`;

  const URL = `${END_POINT}${RESOURCE}`;
  const request = axios.get(URL);
  return {
    type: 'FETCH_CURRENT_UTILITIES',
    payload: request
  };
}
