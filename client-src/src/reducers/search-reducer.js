export default (
    state = {
        quickSearchFacilities: [],
        advancedSearchFacilities: {
            districtResultsFacilities: []
        }
    },
    action
) => {
    switch (action.type) {
        case "FETCH_QUICK_SEARCH":
            return {
                quickSearchFacilities: action.payload.data,
                advancedSearchFacilities: state.advancedSearchFacilities
            };
        case "FETCH_DISTRICT_RESULTS":
            return {
                quickSearchFacilities: state.quickSearchFacilities,
                advancedSearchFacilities: {
                    districtResultsFacilities: action.payload.data
                }
            };
        default:
            return state;
    }
};
