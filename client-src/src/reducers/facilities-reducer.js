export default (
  state = {
    list: [],
    all: [],
    currentDetails: {},
    currentResources: {},
    currentUtilities: [],
    currentServices: [],
    error: {},
    isLoading: true,
    typeResourceInstances: [],
    typeUtilityInstances: [],
    typeServiceInstances: [],
    resources: [],
    utilities: [],
    services: [],
    basicDetailsResponse: {},
    contactDetailsResponse: {},
    resourcesResponse: {},
    utilitiesResponse: {},
    servicesResponse: {},
    deleteServiceResponse: {},
    patchResponse: {}
  },
  action
) => {
  if (action.error) {
    return {
      ...state,
      error: action.payload,
      isLoading: false
    };
  }
  switch (action.type) {
    case "FETCH_FACILITIES":
      return {
        ...state,
        list: action.payload.data,
        isLoading: false
      };
    case "SET_CURRENT_DETAILS":
      return {
        ...state,
        currentDetails: action.payload[0],
        isLoading: false
      };
    case "FETCH_FACILITY_DETAILS":
      return {
        ...state,
        currentDetails: action.payload.data,
        isLoading: false
      };
    case "FETCH_CURRENT_RESOURCES":
      return {
        ...state,
        currentResources: action.payload.data,
        isLoading: false
      };
    case "FETCH_CURRENT_UTILITIES":
      return {
        ...state,
        currentUtilities: action.payload.data,
        isLoading: false
      };
    case "FETCH_CURRENT_SERVICES":
      return {
        ...state,
        currentServices: action.payload.data,
        isLoading: false
      };
    case "FETCH_RESOURCE_TYPE_INSTANCES":
      return {
        ...state,
        typeResourceInstances: action.payload.data,
        isLoading: false
      };
    case "FETCH_UTILITY_TYPE_INSTANCES":
      return {
        ...state,
        typeUtilityInstances: action.payload.data,
        isLoading: false
      };

    case "FETCH_SERVICE_TYPE_INSTANCES":
      return {
        ...state,
        typeServiceInstances: action.payload.data,
        isLoading: false
      };
    case "FETCH_RESOURCES":
      return {
        ...state,
        resources: action.payload.data,
        isLoading: false
      };
    case "FETCH_UTILITIES":
      return {
        ...state,
        utilities: action.payload.data,
        isLoading: false
      };
    case "FETCH_SERVICES":
      return {
        ...state,
        services: action.payload.data,
        isLoading: false
      };
    case "FETCH_ALL_FACILITIES":
      return {
        ...state,
        all: action.payload.data,
        isLoading: false
      };
    case "POST_FACILITY_BASIC_DETAILS":
      return {
        ...state,
        basicDetailsResponse: action.payload.data,
        isLoading: false
      };
    case "POST_FACILITY_CONTACT_DETAILS":
      return {
        ...state,
        contactDetailsResponse: action.payload.data,
        isLoading: false
      }
    case "POST_FACILITY_RESOURCES":
      return {
        ...state,
        resourcesResponse: action.payload.data,
        isLoading: false
      }
    case "POST_FACILITY_UTILITIES":
      return {
        ...state,
        utilitiesResponse: action.payload.data,
        isLoading: false
      }
    case "POST_FACILITY_SERVICE":
      return {
        ...state,
        servicesResponse: action.payload.data,
        isLoading: false
      }
    case "DELETE_FACILITY_SERVICE":
      return {
        ...state,
        deleteServiceResponse: action.payload.data,
        isLoading: false
      }
    case "PATCH_BASIC_DETAILS":
      return {
        ...state,
        patchResponse: action.payload.data,
        isLoading: false
      }
    default:
      return state;
  }
};
