import axios from "axios";
import settings from "../settings";

const fetchUserAccessTokens = userId => {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `Clients`;

  const URL = `${END_POINT}${RESOURCE}/${userId}/accessTokens`;

  const headers = {
    Authorization: `${sessionStorage.getItem("token")}`
  };

  const response = axios({
    url: URL,
    headers,
    method: "GET"
  });

  return {
    type: "FETCH_USER_ACCESS_TOKENS",
    payload: response
  };
};

export default fetchUserAccessTokens;
