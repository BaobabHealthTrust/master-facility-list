export default (
    state = {
        resourceTypes: [],
        utilityTypes: [],
        serviceTypes: []
    },
    action
) => {
    switch (action.type) {
        case "FETCH_RESOURCE_TYPES":
            return {
                resourceTypes: action.payload.data,
                utilityTypes: state.utilityTypes,
                serviceTypes: state.serviceTypes
            };
        default:
            return state;
    }
};
