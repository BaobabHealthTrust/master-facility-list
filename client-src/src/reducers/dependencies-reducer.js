import _ from "lodash";
import Store from "../Store";

export default (
  state = {
    resourceTypes: [],
    utilityTypes: [],
    serviceTypes: [],
    districts: [],
    operationalStatuses: [],
    facilityTypes: [],
    facilityOwners: [],
    regulatoryStatuses: [],
    searchResourceTypes: [],
    serviceInstance: [],
    isLoading: {},
    isNetworkError: false
  },
  action
) => {
  let actionGroup = _.join(
    _.split(action.type, "_", _.split(action.type, "_").length - 1),
    "_"
  );

  switch (action.type) {
    case "FETCH_RESOURCE_TYPES_FULFILLED":
      return {
        ...state,
        resourceTypes: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${actionGroup}`]: false
        }
      };
    case "FETCH_UTILITY_TYPES_FULFILLED":
      return {
        ...state,
        utilityTypes: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${actionGroup}`]: false
        }
      };
    case "FETCH_DISTRICTS_FULFILLED":
      return {
        ...state,
        districts: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${actionGroup}`]: false
        }
      };
    case "FETCH_OPERATIONAL_STATUSES_FULFILLED":
      return {
        ...state,
        operationalStatuses: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${actionGroup}`]: false
        }
      };
    case "FETCH_FACILITY_TYPES_FULFILLED":
      return {
        ...state,
        facilityTypes: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${actionGroup}`]: false
        }
      };
    case "FETCH_FACILITY_OWNERS_FULFILLED":
      return {
        ...state,
        facilityOwners: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${actionGroup}`]: false
        }
      };
    case "FETCH_REGULATORY_STATUSES_FULFILLED":
      return {
        ...state,
        regulatoryStatuses: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${actionGroup}`]: false
        }
      };
    case "FETCH_SERVICE_TYPES_FULFILLED":
      return {
        ...state,
        serviceTypes: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${actionGroup}`]: false
        }
      };

    default:
      return state;
  }
};
