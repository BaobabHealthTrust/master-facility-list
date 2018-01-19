import {map} from "lodash";
export default (
    state = {
        quickSearchFacilities: [],
        advancedSearchFacilities: {
            basicDetailsFacilities: [0],
            basicDetailsFacilityResources: []
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
                    basicDetailsFacilities: map(action.payload.data,"id"),
                    basicDetailsFacilityResources:state.advancedSearchFacilities.basicDetailsFacilityResources
                },
                advancedSearchResults: state.advancedSearchResults
            };

            case "FETCH_BASIC_RESOURCE_RESULTS":
            return {
                quickSearchFacilities: state.quickSearchFacilities,
                advancedSearchFacilities: {
                    basicDetailsFacilities:state.advancedSearchFacilities.basicDetailsFacilities,

                    basicDetailsFacilityResources: map(action.payload.data, "facility_id")
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
