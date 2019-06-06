const initialState = {
  advancedSearchOpen: false,
  activePage: "home"
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_ADVANCED_SEARCH":
      return {
        ...state,
        advancedSearchOpen: !state.advancedSearchOpen
      };
    case "SET_ACTIVE_PAGE":
      return {
        ...state,
        activePage: action.payload.toLowerCase()
      };
    default:
      return state;
  }
};
