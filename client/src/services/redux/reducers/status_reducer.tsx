// @ts-ignore
import { join, split, camelCase } from "lodash";
export default (state = {}, action: any) => {
  let actionGroup = join(
    split(action.type, "_", split(action.type, "_").length - 1),
    "_"
  );
  let formattedActionGroup = camelCase(actionGroup);
  switch (action.type) {
    case `${actionGroup}_PENDING`:
      return {
        ...state,

        [`${formattedActionGroup}`]: true
      };
    case `${actionGroup}_REJECTED`:
      return {
        ...state,

        [formattedActionGroup]: false
      };
    case `${actionGroup}_FULFILLED`:
      return {
        ...state,

        [`${formattedActionGroup}`]: false
      };
    default:
      return state;
  }
};
