import axios from 'axios';
import settings from '../settings';

export default function fetchCurrentResources(id) {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `FacilityResources/latest?id=${id}`;


  const URL = `${END_POINT}${RESOURCE}`;
  const request = axios.get(URL);
  return {
    type: 'FETCH_CURRENT_RESOURCES',
    payload: request
  };
}
