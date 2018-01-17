export default (
    state = {
        quickSearchFacilities: [],
        advancedSearchFacilities: {
            basicDetailsFacilities: [],
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
                    basicDetailsFacilities: action.payload.data,
                    basicDetailsFacilityResources: state.basicDetailsFacilityResources
                },
                advancedSearchResults: state.advancedSearchResults
            };
        
        case "FETCH_ADVANCED_SEARCH_RESULTS":
            return {
                quickSearchFacilities: state.quickSearchFacilities,
                advancedSearchFacilities: state.advancedSearchFacilities,
                advancedSearchResults: action.payload.data
            };
        case "FETCH_BASIC_RESOURCE_DETAILS_RESULTS":
            return {
                quickSearchFacilities: state.quickSearchFacilities,
                advancedSearchFacilities: {
                    basicDetailsFacilities: state.basicDetailsFacilities,
                    basicDetailsFacilityResources: action.payload.data
                },
                advancedSearchResults: state.advancedSearchResults
            };
        default:
            return state;
    }
};
