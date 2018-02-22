export default (
    state = {
        loginResponse: {},
        isLoginFailed: false
    },
    action
) => {
    if (action.error) {
        return {
            loginResponse: state.loginResponse,
            isLoginFailed: true
        };
    }
    switch (action.type) {
        case "CHECK_CREDENTIALS":
            return {
                isLoginFailed: false,
                loginResponse: action.payload.data
            };
        default:
            return state;
    }
};
