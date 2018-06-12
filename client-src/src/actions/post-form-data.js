import axios from "axios";
import settings from "../settings";
const token = sessionStorage.getItem('token');

export default function postFormData(data, resource, method, actionType, endpoint = '', id = null) {
  const END_POINT = `${settings.hostname}/api/`;

  const headers = {
    Authorization: token
  };
  let url = `${END_POINT}${resource}/${endpoint}`;
  if (id) url = `${END_POINT}${resource}/${id}/${endpoint}`;
  const response = axios({ method, url, data, headers });

  return {
    type: actionType,
    payload: response
  };
}
