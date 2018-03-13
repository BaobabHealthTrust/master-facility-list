export default (
    state = {
        basicResponse: "",
        contactResponse: ""
    },
    action
) => {
    switch (action.type) {
        case "POST_FORM_BASIC_DATA":
            return {
                basicResponse: action.payload
            };
        case "POST_FORM_CONTACT_DATA":
            return {
                contactResponse: action.payload
            };
        default:
            return state;
    }
};
