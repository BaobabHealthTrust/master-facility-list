const initialState = {
  users: [],
  userCreated: false,
  userUpdated: false,
  passwordChanged: false,
  loggedInUser: {
    token: sessionStorage.getItem("token"),
    name: sessionStorage.getItem("firstname")
  },
  userAccessTokens: [],
  validationErrors: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      if (action.payload.data) {
        return {
          ...state,
          users: action.payload.data,
          isLoading: false
        };
      }
      break;
    case "FETCH_USER_ACCESS_TOKENS":
      if (action.payload.data) {
        return {
          ...state,
          userAccessTokens: action.payload.data,
          isLoading: false
        };
      }
      break;
    case "POST_USER":
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
    case "UPDATE_USER":
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
    case "CHANGE_USER_PASSWORD":
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
    case "ARCHIVE_USER":
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
