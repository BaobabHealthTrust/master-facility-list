export default (
  state = {
    loginResponse: {},
    isLoginFailed: false,
    userDetails: {}
  },
  action
) => {
  if (action.error) {
    return {
      loginResponse: {},
      isLoginFailed: true,
      userDetails: {}
    };
  }
  switch (action.type) {
    case "CHECK_CREDENTIALS_FULFILLED":
      return {
        isLoginFailed: false,
        loginResponse: action.payload.data,
        userDetails: state.userDetails
      };
    case "GET_USER_DETAILS_FULFILLED":
      return {
        isLoginFailed: false,
        loginResponse: state.loginResponse,
        userDetails: action.payload.data
      };
    default:
      return state;
  }
};
