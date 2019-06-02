import actions from "../actions/actions";

const initialState = {
  list: [],
  current: {
    resources: [],
    services: [],
    utilities: []
  },
  advancedFilter: {
    filterValues: [],
    filterResults: {}
  }
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
    case actions.fetchCurrentBasic + "_FULFILLED":
      return {
        ...state,
        current: {
          ...state.current,
          ...action.payload.data
        }
      };
    case actions.fetchCurrentResources + "_FULFILLED":
      return {
        ...state,
        current: {
          ...state.current,
          resources: action.payload.data.data
        }
      };
    case actions.fetchCurrentServices + "_FULFILLED":
      return {
        ...state,
        current: {
          ...state.current,
          services: action.payload.data.hierarchy
        }
      };

    case actions.fetchCurrentUtilities + "_FULFILLED":
      return {
        ...state,
        current: {
          ...state.current,
          utilities: action.payload.data.data
        }
      };

    default:
      return state;
  }
};
