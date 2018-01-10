export default (
    state = {
        quickSearchFacilities: [],
        advancedSearchFacilities: {
            basicDetailsFacilities: []
        },
        advancedSearchResults: []
    },
    action
) => {
    switch (action.type) {
        case "FETCH_QUICK_SEARCH":
            return {
                quickSearchFacilities: action.payload.data,
                advancedSearchFacilities: state.advancedSearchFacilities,
                advancedSearchResults: state.advancedSearchResults
            };
        case "FETCH_BASIC_DETAILS_RESULTS":
            return {
                quickSearchFacilities: state.quickSearchFacilities,
                advancedSearchFacilities: {
                    basicDetailsFacilities: action.payload.data
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
