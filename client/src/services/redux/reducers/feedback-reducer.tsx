import actions from "../actions/actions";

const initialState = {
  feedbackTypes: [] as Array<any>
};
export default (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case actions.fetchFeedbackTypes + "_FULFILLED":
      return {
        ...state,
        feedbackTypes: action.payload.data
      };
    default:
      return state;
  }
};
