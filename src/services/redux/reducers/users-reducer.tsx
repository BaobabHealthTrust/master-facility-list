import actions from "../actions/actions";

const initialState = {
  users: [],
  currentUser: {
    authenticated: sessionStorage.getItem("token") || false,
    authDetails: JSON.parse(sessionStorage.getItem("user") || "{}"),
    details: JSON.parse(sessionStorage.getItem("user") || "{}")
  }
};
export default (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case actions.userLogin + "_FULFILLED":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          authenticated: true,
          authDetails: action.payload.data
        }
      };
    case actions.userLogout:
      return {
        users: [],
        currentUser: {
          authenticated: false,
          authDetails: {},
          details: {}
        }
      };
    case actions.fetchUserDetails + "_FULFILLED":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          details: action.payload.data
        }
      };
    default:
      return state;
  }
};
