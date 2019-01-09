const initialState = {
  users: [],
  userCreated: false,
  userUpdated: false,
  passwordChanged: false,
  loggedInUser: {
    token: sessionStorage.getItem("token"),
    name: sessionStorage.getItem("firstname")
  },
  userAccessTokens: []
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
      return state;
      break;
    case "FETCH_USER_ACCESS_TOKENS":
      console.log(action.payload);
      if (action.payload.data) {
        return {
          ...state,
          userAccessTokens: action.payload.data,
          isLoading: false
        };
      }
      return state;
      break;
    case "POST_USER":
      console.log(action.payload);
      return {
        ...state,
        userCreated: action.payload.data ? true : false,
        isLoading: false
      };
      break;
    case "UPDATE_USER":
      return {
        ...state,
        userUpdated: action.payload.data ? true : false,
        isLoading: false
      };
      break;
    case "CHANGE_USER_PASSWORD":
      return {
        ...state,
        passwordChanged: action.payload.data ? true : false,
        isLoading: false
      };
      break;
    case "ARCHIVE_USER":
      return {
        ...state,
        isLoading: false
      };
    case "SET_USER_DETAILS":
      return {
        ...state,
        loggedInUser: action.payload,
        isLoading: false
      };
      break;
    default:
      break;
  }
  return state;
};
