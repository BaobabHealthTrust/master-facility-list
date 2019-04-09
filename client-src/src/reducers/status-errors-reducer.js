import _ from "lodash";
export default (
  state = {
    isLoading: {},
    errors: {}
  },
  action
) => {
  let actionGroup = _.join(
    _.split(action.type, "_", _.split(action.type, "_").length - 1),
    "_"
  );
  let formattedActionGroup = _.camelCase(actionGroup);

  switch (action.type) {
    case `${actionGroup}_PENDING`:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [`${formattedActionGroup}`]: true
        },
        errors: {
          ...state.errors,
          [`${formattedActionGroup}`]: []
        }
      };
    case `${actionGroup}_REJECTED`:
      return {
        ...state,
        errors: {
          ...state.errors,
          [formattedActionGroup]: action.error
            ? action.payload && action.payload.response.data.error.details
              ? action.payload.response.data.error.details.messages
              : ["There was a general error"]
            : []
        },
        isLoading: {
          ...state.isLoading,
          [formattedActionGroup]: false
        }
      };
    case `${actionGroup}_FULFILLED`:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [`${formattedActionGroup}`]: false
        }
      };
    default:
      return state;
  }
};
