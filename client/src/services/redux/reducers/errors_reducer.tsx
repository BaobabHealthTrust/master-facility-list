// @ts-ignore
import { join, camelCase, split } from "lodash";
import actions from "../actions/actions";
export default (
  state = {
    dependancyError: false
  },
  action: any
) => {
  let actionGroup = join(
    split(action.type, "_", split(action.type, "_").length - 1),
    "_"
  );

  let formattedActionGroup = camelCase(actionGroup);

  switch (action.type) {
    case `${actionGroup}_PENDING`:
      return {
        ...state,
        [`${formattedActionGroup}`]: []
      };
    case `${actionGroup}_REJECTED`:
      console.log(action.payload);
      return {
        ...state,
        [formattedActionGroup]: action.error
          ? action.payload &&
            action.payload.response &&
            action.payload.response.data.error.details
            ? action.payload.response.data.error.details.messages
            : ["There was a general error"]
          : ["There was a network error "]
      };
    case `${actionGroup}_FULFILLED`:
      return {
        ...state,
        [formattedActionGroup]: []
      };
    case actions.dependacyError:
      return {
        ...state,
        ["dependancyError"]: true
      };
    default:
      return state;
  }
};
