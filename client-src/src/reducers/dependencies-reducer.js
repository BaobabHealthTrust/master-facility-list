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
    isLoading: {
      fetchResourceTypes:true,
      fetchUtilityTypes:true,
      fetchDistricts:true,
      fetchOperationalStatuses:true,
      fetchFacilityTypes:true,
      fetchFacilityOwners:true,
      fetchRegulatoryStatuses:true,
      fetchServiceTypes:true
    },
    isNetworkError: false
  },
  action
) => {
  let actionGroup = _.join(
    _.split(action.type, "_", _.split(action.type, "_").length - 1),
    "_"
  );
  let formattedActionGroup = _.camelCase(actionGroup);
  
  switch (action.type) {
    case "DEPENDANCY_ERROR":return {
      ...state,
      isLoading: {
        ...state.isLoading,
        fetchResourceTypes:false,
      fetchUtilityTypes:false,
      fetchDistricts:false,
      fetchOperationalStatuses:false,
      fetchFacilityTypes:false,
      fetchFacilityOwners:false,
      fetchRegulatoryStatuses:false,
      fetchServiceTypes:false
      },
      isNetworkError:true
    };
    case "FETCH_RESOURCE_TYPES_FULFILLED":
      return {
        ...state,
        resourceTypes: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${formattedActionGroup}`]: false
        }
      };
    case "FETCH_UTILITY_TYPES_FULFILLED":
      return {
        ...state,
        utilityTypes: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${formattedActionGroup}`]: false
        }
      };
    case "FETCH_DISTRICTS_FULFILLED":
      return {
        ...state,
        districts: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${formattedActionGroup}`]: false
        }
      };
    case "FETCH_OPERATIONAL_STATUSES_FULFILLED":
      return {
        ...state,
        operationalStatuses: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${formattedActionGroup}`]: false
        }
      };
    case "FETCH_FACILITY_TYPES_FULFILLED":
      return {
        ...state,
        facilityTypes: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${formattedActionGroup}`]: false
        }
      };
    case "FETCH_FACILITY_OWNERS_FULFILLED":
      return {
        ...state,
        facilityOwners: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${formattedActionGroup}`]: false
        }
      };
    case "FETCH_REGULATORY_STATUSES_FULFILLED":
      return {
        ...state,
        regulatoryStatuses: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${formattedActionGroup}`]: false
        }
      };
    case "FETCH_SERVICE_TYPES_FULFILLED":
      return {
        ...state,
        serviceTypes: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [`${formattedActionGroup}`]: false
        }
      };

    default:
      return state;
  }
};
