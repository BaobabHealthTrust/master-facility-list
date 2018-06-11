
const initialState = {
  users: [],
  userCreated: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      if(action.payload.data){
        console.log(action.payload.data);
        return {
          ...state,
          users: action.payload.data
        };
      }
      return state;
      break;
    case "POST_USER":
    console.log(action.payload);
      return {
        ...state,
        userCreated: action.payload.data ? true : false
      };
      break
    case 'ARCHIVE_USER':
      return {
        ...state
      }
      break;
    default:
      break;
  }
  return state;
}
