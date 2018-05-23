import axios from "axios";
import settings from "../settings";
const token = "9ADQX9G1PrJ1F09RvKFISeaPV8uaIwpYxIz0BrqevdGZawyNFWHCOdwnjEmP0q9d"; //from sessionStorage

export default function postFormData(data, resource, method, actionType, endpoint = "") {
  const END_POINT = `${settings.hostname}/api/`;

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
