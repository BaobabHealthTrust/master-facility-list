export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_FACILITIES':
            const newState = state.concat(action.payload.data);
            return newState;
        default:
            return state;
    }
};
