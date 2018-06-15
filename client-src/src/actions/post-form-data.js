import axios from "axios";
import settings from "../settings";

export default async (
  data: any,
  resource: string,
  method: string,
  actionType: string,
  endpoint = '',
  id = null) => {
  const END_POINT = `${settings.hostname}/api/`;
  const token = await sessionStorage.getItem('token');

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
