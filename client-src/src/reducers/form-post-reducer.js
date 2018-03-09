export default (
    state = {
        messageResponse: ""
    },
    action
) => {
    switch (action.type) {
        case "POST_FORM_DATA":
            return {
                messageResponse: action.payload.data
            };
        default:
            return state;
    }
};
