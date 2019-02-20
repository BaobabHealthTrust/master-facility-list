import axios from "axios";
import settings from "../settings";

export default id => {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `FacilityServices/hierarchy`;

  const URL = `${END_POINT}${RESOURCE}?facility_id=${id}`;

  const request = axios.get(URL);
  return {
    type: "FETCH_CURRENT_SERVICES",
    payload: request
  };
};
