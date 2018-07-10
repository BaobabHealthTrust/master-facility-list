import axios from "axios";
import settings from "../settings";

const fetchUsers = async () => {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `Clients`;
  const FILTER = {
    where: {
      archived_date: null
    },
    order: "created_at DESC"
  }

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;

  const headers = {
    Authorization: `${await sessionStorage.getItem('token')}`
  };

  const response = axios({
    url: URL,
    headers,
    method: 'GET'
  });

  return {
    type: 'FETCH_USERS',
    payload: response
  };
}

export default fetchUsers;
