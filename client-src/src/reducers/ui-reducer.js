const initialState = {
  advancedSearchOpen: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_ADVANCED_SEARCH":
      return {
        ...state,
        advancedSearchOpen: !state.advancedSearchOpen
      };
    default:
      return state;
  }
};
