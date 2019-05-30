import { map, uniq } from "lodash";
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
    case "FETCH_ADVANCED_SEARCH_BASIC_FULFILLED":
      return {
        ...state,
        advancedSearchFacilities: {
          ...state.advancedSearchFacilities,
          basicDetailsFacilities: map(action.payload.data.data, "id")
        }
      };
    case "FETCH_FACILITY_BY_RESOURCES_FULFILLED":
      let tempResources = [];

      for (let index = 0; index < action.payload.data.length; index++) {
        if (
          typeof tempResources[action.payload.data[index].resource_id] ===
          "undefined"
        )
          tempResources[action.payload.data[index].resource_id] = [];

        tempResources[action.payload.data[index].resource_id].push(
          action.payload.data[index].facility_id
        );
      }

      return {
        ...state,
        advancedSearchFacilities: {
          ...state.advancedSearchFacilities,
          basicDetailsFacilityResources: tempResources
        }
      };

    case "FETCH_FACILITY_BY_UTILITIES_FULFILLED":
      let tempUtilities = [];

      for (let index = 0; index < action.payload.data.length; index++) {
        if (
          typeof tempUtilities[action.payload.data[index].utility_id] ===
          "undefined"
        )
          tempUtilities[action.payload.data[index].utility_id] = [];

        tempUtilities[action.payload.data[index].utility_id].push(
          action.payload.data[index].facility_id
        );
      }

      return {
        ...state,
        advancedSearchFacilities: {
          ...state.advancedSearchFacilities,
          basicDetailsFacilityUtilities: tempUtilities
        }
      };
    case "FETCH_FACILITY_BY_SERVICES_FULFILLED":
      let tempServices =
        state.advancedSearchFacilities.basicDetailsFacilityServices;
      if (action.payload.data.length > 0) {
        tempServices[action.payload.data[0].service_id] = uniq(
          map(action.payload.data, "facility_id")
        );
      } else {
        let index =
          tempServices.findIndex(cur => cur != null) == -1
            ? 0
            : tempServices.findIndex(cur => cur != null);
        tempServices[index] = [];
      }
      return {
        ...state,
        advancedSearchFacilities: {
          ...state.advancedSearchFacilities,
          basicDetailsFacilityServices: tempServices
        }
      };

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
        advancedSearchResults: action.payload.data.data
      };

    case "REMOVE_ALL_SEARCH_VALUES":
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
