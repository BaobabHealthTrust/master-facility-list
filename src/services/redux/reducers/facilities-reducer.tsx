import actions from "../actions/actions";

const initialState = {
  list: []
};
export default (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case actions.fetchFacilities + "_FULFILLED":
      return {
        ...state,
        list: action.payload.data.data
      };
    default:
      return state;
  }
};
