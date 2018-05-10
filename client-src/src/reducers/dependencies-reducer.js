export default (
    state = {
        resourceTypes: [],
        utilityTypes: [],
        serviceTypes: [],
        districts: [],
        operationalStatuses: [],
        facilityTypes: [],
        facilityOwners: [],
        regulatoryStatuses: [],
        searchResourceTypes: [],
        serviceInstance: [],
        isLoading: true,
        isNetworkError: false
    },
    action
) => {
    if (action.error) {
        return {
            ...state,
            isLoading: false,
            isNetworkError: true
        };
    }
    switch (action.type) {
        case "FETCH_RESOURCE_TYPES":
            return {
                ...state,
                resourceTypes: action.payload.data,
                isLoading: false,
            };
        case "FETCH_UTILITY_TYPES":
            return {
                ...state,
                utilityTypes: action.payload.data,
                isLoading: false,
            };
        case "FETCH_DISTRICTS":
            return {
                ...state,
                districts: action.payload.data,
                isLoading: false,
            };
        case "FETCH_OPERATIONAL_STATUSES":
            return {
                ...state,
                operationalStatuses: action.payload.data,
                isLoading: false,
            };
        case "FETCH_FACILITY_TYPES":
            return {
                ...state,
                facilityTypes: action.payload.data,
                isLoading: false,
            };
        case "FETCH_FACILITY_OWNERS":
            return {
                ...state,
                facilityOwners: action.payload.data,
                isLoading: false,
            };
        case "FETCH_REGULATORY_STATUSES":
            return {
                ...state,
                regulatoryStatuses: action.payload.data,
                isLoading: false,
            };
        case "FETCH_SERVICE_TYPES":
            return {
                ...state,
                serviceInstance: action.payload.data,
                isLoading: false,
            };

        default:
            return state;
    }
};
