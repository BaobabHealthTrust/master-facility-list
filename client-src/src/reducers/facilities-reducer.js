import _ from "lodash";

export default (
  state = {
    list: [],
    all: [],
    currentDetails: {},
    currentResources: {},
    currentUtilities: [],
    currentServices: [],
    error: {},
    isLoading: {},
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
    totalFacilities: 0,
    facilitiesWithOPD: [],
    facilitiesWithANC: [],
    facilitiesWithHTC: [],
    facilitiesWithART: []
  },
  action
) => {
  let actionGroup = _.join(
    _.split(action.type, "_", _.split(action.type, "_").length - 1),
    "_"
  );

  switch (action.type) {
    case "FETCH_FACILITIES_FULFILLED":
      return {
        ...state,
        list: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };

    case "SET_CURRENT_DETAILS_FULFILLED":
      return {
        ...state,
        currentDetails: action.payload[0],
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };

    case "FETCH_FACILITY_DETAILS_FULFILLED":
      return {
        ...state,
        currentDetails: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };

    case "FETCH_CURRENT_RESOURCES_FULFILLED":
      return {
        ...state,
        currentResources: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "FETCH_CURRENT_UTILITIES_FULFILLED":
      return {
        ...state,
        currentUtilities: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "FETCH_CURRENT_SERVICES_FULFILLED":
      return {
        ...state,
        currentServices: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "FETCH_RESOURCE_TYPE_INSTANCES_FULFILLED":
      return {
        ...state,
        typeResourceInstances: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "FETCH_UTILITY_TYPE_INSTANCES_FULFILLED":
      return {
        ...state,
        typeUtilityInstances: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };

    case "FETCH_SERVICE_TYPE_INSTANCES_FULFILLED":
      return {
        ...state,
        typeServiceInstances: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "FETCH_RESOURCES_FULFILLED":
      return {
        ...state,
        resources: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "FETCH_UTILITIES_FULFILLED":
      return {
        ...state,
        utilities: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "FETCH_SERVICES_FULFILLED":
      return {
        ...state,
        services: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "FETCH_ALL_FACILITIES_FULFILLED":
      return {
        ...state,
        all: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "POST_FACILITY_BASIC_DETAILS_FULFILLED":
      return {
        ...state,
        basicDetailsResponse: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "POST_FACILITY_CONTACT_DETAILS_FULFILLED":
      return {
        ...state,
        contactDetailsResponse: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "POST_FACILITY_RESOURCES_FULFILLED":
      return {
        ...state,
        resourcesResponse: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "POST_FACILITY_UTILITIES_FULFILLED":
      return {
        ...state,
        utilitiesResponse: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "POST_FACILITY_SERVICE_FULFILLED":
      return {
        ...state,
        servicesResponse: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "DELETE_FACILITY_SERVICE_FULFILLED":
      return {
        ...state,
        deleteServiceResponse: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "PATCH_BASIC_DETAILS_FULFILLED":
      return {
        ...state,
        patchResponse: action.payload.data,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
    case "FETCH_FACILITIES_BY_REGULATORY_STATUSES_FULFILLED":
      return {
        ...state,
        facilitiesByRegulatoryStatus: action.payload.data.response,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
      break;
    case "FETCH_FACILITIES_BY_OPERATIONAL_STATUSES_FULFILLED":
      return {
        ...state,
        facilitiesByOperationalStatus: action.payload.data.response,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
      break;
    case "FETCH_FACILITIES_BY_TYPE_AND_OWNERSHIP_FULFILLED":
      if (action.payload.data.response) {
        const snakeCased = action.payload.data.response.map(
          facilityByTypeAndOnwership => {
            const _facilityByTypeAndOwnership = _.mapKeys(
              facilityByTypeAndOnwership,
              (key, value) => {
                return _.snakeCase(value);
              }
            );
            return _facilityByTypeAndOwnership;
          }
        );
        return {
          ...state,
          facilitiesByTypeAndOwnership: snakeCased,
          facilitiesByTypeAndOwnershipKeys: _.keys(snakeCased[0]),
          isLoading: {
            ...state.isLoading,
            [actionGroup]: false
          }
        };
      }
      return { ...state };
      break;
    case "FETCH_FACILITIES_WITH_OPD_FULFILLED":
      return {
        ...state,
        facilitiesWithOPD: action.payload.data.response,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
      break;
    case "FETCH_FACILITIES_WITH_ANC_FULFILLED":
      return {
        ...state,
        facilitiesWithANC: action.payload.data.response,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
      break;
    case "FETCH_FACILITIES_WITH_HTC_FULFILLED":
      return {
        ...state,
        facilitiesWithHTC: action.payload.data.response,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
      break;
    case "FETCH_FACILITIES_WITH_ART_FULFILLED":
      return {
        ...state,
        facilitiesWithART: action.payload.data.response,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
      break;
    case "FETCH_TOTAL_FACILITIES_FULFILLED":
      return {
        ...state,
        totalFacilities: action.payload.data.response,
        isLoading: {
          ...state.isLoading,
          [actionGroup]: false
        }
      };
      break;
    default:
      return state;
  }
};
