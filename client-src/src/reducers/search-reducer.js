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
        advancedSearchResults: [],
    },
    action
) => {
    switch (action.type) {
        case "FETCH_QUICK_SEARCH":
            return {
                quickSearchFacilities: action.payload.data,
                advancedSearchFacilities: state.advancedSearchFacilities,
                advancedSearchResults: state.advancedSearchResults,
            };
        case "FETCH_BASIC_DETAILS_RESULTS":
            return {
                quickSearchFacilities: state.quickSearchFacilities,
                advancedSearchFacilities: {
                    basicDetailsFacilities: map(action.payload.data, "id"),
                    basicDetailsFacilityResources: state.advancedSearchFacilities.basicDetailsFacilityResources,
                    basicDetailsFacilityUtilities: state.advancedSearchFacilities.basicDetailsFacilityUtilities,
                    basicDetailsFacilityServices: state.advancedSearchFacilities.basicDetailsFacilityServices
                },
                advancedSearchResults: state.advancedSearchResults
            };

        case "FETCH_BASIC_RESOURCE_RESULTS":
            return {
                quickSearchFacilities: state.quickSearchFacilities,
                advancedSearchFacilities: {
                    basicDetailsFacilities: state.advancedSearchFacilities.basicDetailsFacilities,
                    basicDetailsFacilityResources: map(action.payload.data, "facility_id"),
                    basicDetailsFacilityUtilities: state.advancedSearchFacilities.basicDetailsFacilityUtilities,
                    basicDetailsFacilityServices: state.advancedSearchFacilities.basicDetailsFacilityServices
                },
                advancedSearchResults: state.advancedSearchResults
            };
        case "FETCH_BASIC_UTILITY_RESULTS":
            return {
                quickSearchFacilities: state.quickSearchFacilities,
                advancedSearchFacilities: {
                    basicDetailsFacilities: state.advancedSearchFacilities.basicDetailsFacilities,
                    basicDetailsFacilityResources: state.advancedSearchFacilities.basicDetailsFacilityResources,
                    basicDetailsFacilityUtilities: map(action.payload.data, "facility_id"),
                    basicDetailsFacilityServices: state.advancedSearchFacilities.basicDetailsFacilityServices
                },
                advancedSearchResults: state.advancedSearchResults
            };
        case "FETCH_BASIC_SERVICE_RESULTS":
            return {
                quickSearchFacilities: state.quickSearchFacilities,
                advancedSearchFacilities: {
                    basicDetailsFacilities: state.advancedSearchFacilities.basicDetailsFacilities,
                    basicDetailsFacilityResources: state.advancedSearchFacilities.basicDetailsFacilityResources,
                    basicDetailsFacilityUtilities: state.advancedSearchFacilities.basicDetailsFacilityUtilities,
                    basicDetailsFacilityServices: map(action.payload.data, "facility_id")
                },
                advancedSearchResults: state.advancedSearchResults
            };
        case "FETCH_ADVANCED_SEARCH_RESULTS":
            return {
                quickSearchFacilities: state.quickSearchFacilities,
                advancedSearchFacilities: state.advancedSearchFacilities,
                advancedSearchResults: action.payload.data
            };
        default:
            return state;
    }
};
