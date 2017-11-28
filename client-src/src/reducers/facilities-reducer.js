export default (
    state = {
        list: [],
        currentDetails: {},
        currentResources: [],
        isNetworkError: false,
        isLoading: true
    },
    action
) => {
    if (action.error) {
        return {
            list: state.list,
            currentDetails: state.currentDetails,
            currentResources: state.currentResources,
            isNetworkError: true,
            isLoading: false
        };
    }
    switch (action.type) {
        case "FETCH_FACILITIES":
            return {
                list: state.list.concat(action.payload.data),
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                isNetworkError: false,
                isLoading: false
            };
        case "SET_CURRENT_DETAILS":
            return {
                list: state.list,
                currentDetails: action.payload[0],
                currentResources: state.currentResources,
                isNetworkError: false,
                isLoading: false
            };
        case "FETCH_FACILITY_DETAILS":
            return {
                list: state.list,
                currentDetails: action.payload.data,
                currentResources: state.currentResources,
                isNetworkError: false,
                isLoading: false
            };
        case "FETCH_CURRENT_RESOURCES":
            return {
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: action.payload.data,
                isNetworkError: false,
                isLoading: false
            };
        default:
            return state;
    }
};
