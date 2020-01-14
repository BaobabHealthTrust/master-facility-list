import actions from "./actions";
import {
  authenticateUser,
  getUserDetails,
  getUsers,
  addUser,
  putUser,
  deleteUser,
  requestResetPassword,
  resetPassword
} from "../../api";

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

export const createUser = (data: any, token: string) => {
  return {
    type: actions.addUser,
    payload: addUser(data, token)
  };
};

export const updateUser = (userId: number, data: any, token: string) => {
  return {
    type: actions.putUser,
    payload: putUser(userId, data, token)
  };
};

export const delUser = (userId: number, token: string) => {
  return {
    type: actions.deleteUser,
    payload: deleteUser(userId, token)
  };
};

export const requestPasswordReset = (data: { email: any }) => {
  return {
    type: actions.requestResetPassword,
    payload: requestResetPassword(data)
  };
};

export const passwordReset = (data: { newPassword: String }, token: String) => {
  return {
    type: actions.resetPassword,
    payload: resetPassword(data, token)
  };
};
