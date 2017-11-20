export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_FACILITIES':
            const newState = state.concat(action.payload.data);
            return newState;
            case 'FETCH_FACILITY_DETAILS':
            const detailsState = state.concat(action.payload.data);
            return detailsState;
            case 'FETCH_RESOURCE':
            const resourceState = state.concat(action.payload.data);
            return resourceState;
        default:
            return state;
    }
};
