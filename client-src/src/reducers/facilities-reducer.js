import _ from 'lodash';

export default (
  state = {
    list: [],
    all: [],
    currentDetails: {},
    currentResources: {},
    currentUtilities: [],
    currentServices: [],
    isNetworkError: false,
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
    patchResponse: {},
    facilitiesByRegulatoryStatus: [],
    facilitiesByOperationalStatus: [],
    facilitiesByTypeAndOwnership: [],
    facilitiesByTypeAndOwnershipKeys: [],
    allFacilities: [],
    facilitiesWithOPD: [],
    facilitiesWithANC: [],
    facilitiesWithHTC: []
  },
  action
) => {
  if (action.error) {
    return {
      ...state,
      isNetworkError: true,
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
    case 'FETCH_FACILITIES_BY_REGULATORY_STATUSES':
      return {
        ...state,
        facilitiesByRegulatoryStatus: action.payload.data.response
      }
      break;
    case 'FETCH_FACILITIES_BY_OPERATIONAL_STATUSES':
      return {
        ...state,
        facilitiesByOperationalStatus: action.payload.data.response
      }
      break;
    case 'FETCH_FACILITIES_BY_TYPE_AND_OWNERSHIP':
      
      if(action.payload.data.response){
        const snakeCased = action.payload.data.response.map(facilityByTypeAndOnwership => {
          const _facilityByTypeAndOwnership = _.mapKeys(facilityByTypeAndOnwership, (key, value) => {
            return _.snakeCase(value);
          });
          return _facilityByTypeAndOwnership;
        });
        return {
          ...state,
          facilitiesByTypeAndOwnership: snakeCased,
          facilitiesByTypeAndOwnershipKeys: _.keys(snakeCased[0])
        }
      }
      return {...state}
      break;
    case 'FETCH_FACILITIES_WITH_OPD':
        return {
          ...state,
          facilitiesWithOPD: action.payload.data.response
        }
      break;
    case 'FETCH_FACILITIES_WITH_ANC':
      return {
        ...state,
        facilitiesWithANC: action.payload.data.response
      }
      break;
    case 'FETCH_FACILITIES_WITH_HTC':
      return {
        ...state,
        facilitiesWithHTC: action.payload.data.response
      }
      break;
    case 'FETCH_ALL_FACILITIES':
      console.clear()
      console.log('ddoeodeendnndendeudn')
      return {
        ...state,
        allFacilities: action.payload.data.response
      }
      break;
    default:
      return state;
  }
};
