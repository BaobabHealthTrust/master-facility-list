import actions from "./actions";
import { authenticateUser, getUserDetails, getUsers } from "../../api";

export const userLogin = (credencials: {
  username: string;
  password: string;
}) => {
  return {
    type: actions.userLogin,
    payload: authenticateUser(credencials)
  };
};

export const userLogout = () => {
  sessionStorage.clear();
  return {
    type: actions.userLogout
  };
};

export const setActivePage = (page: string) => {
  return {
    type: actions.setActivePage,
    payload: page
  };
};

export const setActiveFacilityPage = (page: string) => {
  return {
    type: actions.setActiveFacilityPage,
    payload: page
  };
};
export const fetchUserDetails = (userId: number, token: string) => {
  return {
    type: actions.fetchUserDetails,
    payload: getUserDetails(userId, token)
  };
};

export const fetchUsers = (token: string) => {
  return {
    type: actions.fetchUsers,
    payload: getUsers(token)
  };
};
