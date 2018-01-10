export default (state = {
    isSearchContainerHidden: true
}, action) => {
    switch (action.type) {
        case "HIDE_SEARCH_CONTAINER":
            return {
                isSearchContainerHidden: action.payload
            }
        default:
            return {
                isSearchContainerHidden: state.isSearchContainerHidden
            }
    }
}
