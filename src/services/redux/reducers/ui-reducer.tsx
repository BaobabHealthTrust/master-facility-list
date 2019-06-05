import actions from "../actions/actions";

const initialState = {
  advancedSearchOpen: false,
  searchOpen: false,
  activePage: "Home",
  activeFacilityPage: "summary"
};
export default (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case actions.toggleFacilityFilter:
      return {
        ...state,
        advancedSearchOpen: !state.advancedSearchOpen
      };
    case actions.setActivePage:
      return {
        ...state,
        activePage: action.payload
      };
    case actions.setActiveFacilityPage:
      return {
        ...state,
        activeFacilityPage: action.payload
      };
    case actions.toggleSearch:
      return {
        ...state,
        searchOpen: !state.searchOpen
      };
    default:
      return state;
  }
};
