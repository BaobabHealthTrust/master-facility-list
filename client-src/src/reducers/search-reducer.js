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
        case "FETCH_QUICK_SEARCH":
            return {
                ...state,
                quickSearchFacilities: action.payload.data,

            };
        case "FETCH_BASIC_DETAILS_RESULTS":
            return {
                ...state,
                advancedSearchFacilities: {
                    basicDetailsFacilities: map(action.payload.data, "id"),
                    basicDetailsFacilityResources:
                        state.advancedSearchFacilities
                            .basicDetailsFacilityResources,
                    basicDetailsFacilityUtilities:
                        state.advancedSearchFacilities
                            .basicDetailsFacilityUtilities,
                    basicDetailsFacilityServices:
                        state.advancedSearchFacilities
                            .basicDetailsFacilityServices
                },

            };

        case "FETCH_BASIC_RESOURCE_RESULTS":
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
                        state.advancedSearchFacilities
                            .basicDetailsFacilityUtilities,
                    basicDetailsFacilityServices:
                        state.advancedSearchFacilities
                            .basicDetailsFacilityServices
                },

            };
        case "FETCH_BASIC_UTILITY_RESULTS":
            return {
                ...state,
                advancedSearchFacilities: {
                    basicDetailsFacilities:
                        state.advancedSearchFacilities.basicDetailsFacilities,
                    basicDetailsFacilityResources:
                        state.advancedSearchFacilities
                            .basicDetailsFacilityResources,
                    basicDetailsFacilityUtilities: map(
                        action.payload.data,
                        "facility_id"
                    ),
                    basicDetailsFacilityServices:
                        state.advancedSearchFacilities
                            .basicDetailsFacilityServices
                },

            };
        case "FETCH_BASIC_SERVICE_RESULTS":
            return {
                ...state,
                advancedSearchFacilities: {
                    basicDetailsFacilities:
                        state.advancedSearchFacilities.basicDetailsFacilities,
                    basicDetailsFacilityResources:
                        state.advancedSearchFacilities
                            .basicDetailsFacilityResources,
                    basicDetailsFacilityUtilities:
                        state.advancedSearchFacilities
                            .basicDetailsFacilityUtilities,
                    basicDetailsFacilityServices: map(
                        action.payload.data,
                        "facility_id"
                    )
                },

            };
        case "FETCH_ADVANCED_SEARCH_RESULTS":
            return {
                ...state,
                advancedSearchResults: action.payload.data
            };
        case "REMOVE_RESULTS_VALUES":
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
