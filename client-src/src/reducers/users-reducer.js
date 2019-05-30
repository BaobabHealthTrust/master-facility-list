const initialState = {
  users: [],
  userCreated: false,
  userUpdated: false,
  passwordChanged: false,
  loggedInUser: sessionStorage.getItem("user")
    ? {
        ...JSON.parse(sessionStorage.getItem("user")),
        name: JSON.parse(sessionStorage.getItem("user")).firstname
      }
    : { token: null, name: null },
  userAccessTokens: [],
  validationErrors: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_FULFILLED":
      if (action.payload.data) {
        return {
          ...state,
          users: action.payload.data,
          isLoading: false
        };
      }
      break;
    case "FETCH_USER_ACCESS_TOKENS_FULFILLED":
      if (action.payload.data) {
        return {
          ...state,
          userAccessTokens: action.payload.data,
          isLoading: false
        };
      }
      break;
    case "POST_USER_FULFILLED":
      return {
        ...state,
        userCreated: action.payload.data ? true : false,
        validationErrors: action.error
          ? action.payload
            ? action.payload.response.data.error.details.messages
            : ["There was a general error"]
          : [],
        isLoading: false
      };
      break;
    case "UPDATE_USER_FULFILLED":
      return {
        ...state,
        userUpdated: action.payload.data ? true : false,
        validationErrors: action.error
          ? action.payload
            ? action.payload.response.data.error.details.messages
            : ["There was a general error"]
          : [],
        isLoading: false
      };
      break;
    case "CHANGE_USER_PASSWORD_FULFILLED":
      return {
        ...state,
        passwordChanged: action.payload.data ? true : false,
        validationErrors: action.error
          ? action.payload
            ? action.payload.response.data.error.details.messages
            : ["There was a general error"]
          : [],
        isLoading: false
      };
      break;
    case "ARCHIVE_USER_FULFILLED":
      return {
        ...state,
        isLoading: false
      };
      break;
    case "SET_USER_DETAILS":
      return {
        ...state,
        loggedInUser: action.payload,
        isLoading: false
      };
      break;
    case "RESET_USER_DETAILS":
      return {
        ...state,
        loggedInUser: {},
        isLoading: false
      };
      break;
    default:
      return state;
      break;
  }
};
