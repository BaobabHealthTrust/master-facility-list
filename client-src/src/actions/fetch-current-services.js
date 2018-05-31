import axios from 'axios';
import settings from '../settings';

export default function fetchCurrentServices(id) {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `FacilityServices/`;

  const FILTER = {
    where: {
      facility_id: id
    },
    include: { service: ['serviceType', 'category'] }
  };

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
  const request = axios.get(URL);
  return {
    type: 'FETCH_CURRENT_SERVICES',
    payload: request
  };
}
