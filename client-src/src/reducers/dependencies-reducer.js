export default (
    state = {
        resourceTypes: [],
        utilityTypes: [],
        serviceTypes: [],
        districts: [],
        operationalStatuses: []
    },
    action
) => {
    switch (action.type) {
        case "FETCH_RESOURCE_TYPES":
            return {
                resourceTypes: action.payload.data,
                utilityTypes: state.utilityTypes,
                serviceTypes: state.serviceTypes,
                districts: state.districts,
                operationalStatuses: state.operationalStatuses
            };
        case "FETCH_UTILITY_TYPES":
            return {
                resourceTypes: state.resourceTypes,
                utilityTypes: action.payload.data,
                serviceTypes: state.serviceTypes,
                districts: state.districts,
                operationalStatuses: state.operationalStatuses
            };
        case "FETCH_DISTRICTS":
            return {
                resourceTypes: state.resourceTypes,
                utilityTypes: state.utilityTypes,
                serviceTypes: state.serviceTypes,
                districts: action.payload.data,
                operationalStatuses: state.operationalStatuses
            };
        case "FETCH_OPERATIONAL_STATUSES":
            return {
                resourceTypes: state.resourceTypes,
                utilityTypes: state.utilityTypes,
                serviceTypes: state.serviceTypes,
                districts: state.districts,
                operationalStatuses: action.payload.data
            };
        default:
            return state;
    }
};
