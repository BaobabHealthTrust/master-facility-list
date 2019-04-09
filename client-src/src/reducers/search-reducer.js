import { map } from "lodash";
export default (
  state = {
    quickSearchFacilities: [],
    advancedSearchFacilities: {
      basicDetailsFacilities: [],
      basicDetailsFacilityResources: [],
      basicDetailsFacilityUtilities: [],
      basicDetailsFacilityServices: []
    },
    advancedSearchResults: []
  },
  action
) => {
  switch (action.type) {
    case "FETCH_QUICK_SEARCH_FULFILLED":
      return {
        ...state,
        quickSearchFacilities: action.payload.data.data
      };
    case "FETCH_BASIC_DETAILS_RESULTS_FULFILLED":
      return {
        ...state,
        advancedSearchFacilities: {
          basicDetailsFacilities: map(action.payload.data, "id"),
          basicDetailsFacilityResources:
            state.advancedSearchFacilities.basicDetailsFacilityResources,
          basicDetailsFacilityUtilities:
            state.advancedSearchFacilities.basicDetailsFacilityUtilities,
          basicDetailsFacilityServices:
            state.advancedSearchFacilities.basicDetailsFacilityServices
        }
      };

    case "FETCH_BASIC_RESOURCE_RESULTS_FULFILLED":
      return {
        ...state,
        advancedSearchFacilities: {
          basicDetailsFacilities:
            state.advancedSearchFacilities.basicDetailsFacilities,
          basicDetailsFacilityResources: map(
            action.payload.data,
            "facility_id"
          ),
          basicDetailsFacilityUtilities:
            state.advancedSearchFacilities.basicDetailsFacilityUtilities,
          basicDetailsFacilityServices:
            state.advancedSearchFacilities.basicDetailsFacilityServices
        }
      };
    case "FETCH_BASIC_UTILITY_RESULTS_FULFILLED":
      return {
        ...state,
        advancedSearchFacilities: {
          basicDetailsFacilities:
            state.advancedSearchFacilities.basicDetailsFacilities,
          basicDetailsFacilityResources:
            state.advancedSearchFacilities.basicDetailsFacilityResources,
          basicDetailsFacilityUtilities: map(
            action.payload.data,
            "facility_id"
          ),
          basicDetailsFacilityServices:
            state.advancedSearchFacilities.basicDetailsFacilityServices
        }
      };
    case "FETCH_BASIC_SERVICE_RESULTS_FULFILLED":
      return {
        ...state,
        advancedSearchFacilities: {
          basicDetailsFacilities:
            state.advancedSearchFacilities.basicDetailsFacilities,
          basicDetailsFacilityResources:
            state.advancedSearchFacilities.basicDetailsFacilityResources,
          basicDetailsFacilityUtilities:
            state.advancedSearchFacilities.basicDetailsFacilityUtilities,
          basicDetailsFacilityServices: map(action.payload.data, "facility_id")
        }
      };
    case "FETCH_ADVANCED_SEARCH_RESULTS_FULFILLED":
      return {
        ...state,
        advancedSearchResults: action.payload.data
      };
    case "REMOVE_RESULTS_VALUES_FULFILLED":
      return {
        ...state,
        advancedSearchFacilities: {
          basicDetailsFacilities: [],
          basicDetailsFacilityResources: [],
          basicDetailsFacilityUtilities: [],
          basicDetailsFacilityServices: []
        },
        advancedSearchResults: []
      };
    default:
      return state;
  }
};
