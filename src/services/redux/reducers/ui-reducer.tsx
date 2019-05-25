import actions from "../actions/actions";

const initialState = {
  advancedSearchOpen: false
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
    default:
      return state;
  }
};
