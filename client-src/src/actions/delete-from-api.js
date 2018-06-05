import axios from "axios";
import settings from "../settings";
const token = sessionStorage.getItem('token');

export default function deleteFromApi(id, resource, actionType) {
  const END_POINT = `${settings.hostname}/api/`;

  const headers = {
    Authorization: token
  };

  const url = `${END_POINT}${resource}/${id}`;
  const response = axios({ method: "DELETE", url, headers });

  return {
    type: actionType,
    payload: response
  };
}
