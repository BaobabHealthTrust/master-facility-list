export default (state = { quickSearchFacilities: [] }, action) => {
    switch (action.type) {
        case 'FETCH_QUICK_SEARCH':
            return {
                quickSearchFacilities: action.payload.data
            };
        default:
            return {
                quickSearchFacilities: state.quickSearchFacilities
            };
    }
};
