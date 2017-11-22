export default (
    state = {
        list: [],
        currentDetails: {}
    },
    action
) => {
    switch (action.type) {
        case "FETCH_FACILITIES":
            return {
                list: state.list.concat(action.payload.data),
                currentDetails: state.currentDetails
            };
        case "SET_CURRENT_DETAILS":
            return {
                list: state.list,
                currentDetails: action.payload[0]
            };
        case "FETCH_FACILITY_DETAILS":
            return {
                list: state.list,
                currentDetails: action.payload.data
            };
        default:
            return state;
    }
};
