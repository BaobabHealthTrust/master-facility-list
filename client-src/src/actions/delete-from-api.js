import axios from "axios";
import settings from "../settings";

export default (id, resource, actionType) => {
  const END_POINT = `${settings.hostname}/api/`;

  const headers = {
    Authorization: sessionStorage.getItem("token")
  };

  const url = `${END_POINT}${resource}/${id}`;
  const response = axios({ method: "DELETE", url, headers });

  return {
    type: actionType,
    payload: response
  };
};
