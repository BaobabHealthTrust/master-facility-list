export default (state = { isError: false, data: "" }, action) => {
    if (action.error) {
        return {
            isError: true,
            data: state.data
        };
    }

    switch (action.type) {
        case "DOWNLOAD_FACILITIES":
            return {
                isError: false,
                data: action.payload.data
            };
        default:
            return state;
    }
};
