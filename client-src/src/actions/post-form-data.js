import axios from "axios";
import settings from "../settings";

export default async function postFormData(data, resource, method, actionType, endpoint = "") {
  
  const END_POINT = `${settings.hostname}/api/`;
  const token = await sessionStorage.getItem('token');

  const headers = {
    Authorization: token
  };

  const url = `${END_POINT}${resource}/${endpoint}`;
  const response = axios({ method, url, data, headers });

  return {
    type: actionType,
    payload: response
  };
}
