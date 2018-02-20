export default (
    state = {
        list: [],
        all: [],
        currentDetails: {},
        currentResources: [],
        currentUtilities: [],
        currentServices: [],
        isNetworkError: false,
        isLoading: true,
        typeResourceInstances: [],
        typeUtilityInstances: [],
        typeServiceInstances: [],
        resources: [],
        utilities: [],
        services: []
    },
    action
) => {
    if (action.error) {
        return {
            ...state,
            isNetworkError: true,
            isLoading: false,

        };
    }
    switch (action.type) {
        case "FETCH_FACILITIES":
            return {
                ...state,
                list: action.payload.data,

            };
        case "SET_CURRENT_DETAILS":
            return {
                ...state,
                currentDetails: action.payload[0],

            };
        case "FETCH_FACILITY_DETAILS":
            return {
                ...state,
                currentDetails: action.payload.data,

            };
        case "FETCH_CURRENT_RESOURCES":
            return {
                ...state,
                currentResources: action.payload.data,

            };
        case "FETCH_CURRENT_UTILITIES":
            return {
                ...state,
                currentUtilities: action.payload.data,

            };
        case "FETCH_CURRENT_SERVICES":
            return {
                ...state,
                currentServices: action.payload.data,

            };
        case "FETCH_RESOURCE_TYPE_INSTANCES":
            return {
                ...state,
                typeResourceInstances: action.payload.data,

            };
        case "FETCH_UTILITY_TYPE_INSTANCES":
            return {
                ...state,
                typeUtilityInstances: action.payload.data,

            };

        case "FETCH_SERVICE_TYPE_INSTANCES":
            return {
                ...state,
                typeServiceInstances: action.payload.data,

            };
        case "FETCH_RESOURCES":
            return {

                ...state,
                resources: action.payload.data,

            };
        case "FETCH_UTILITIES":
            return {
                ...state,
                utilities: action.payload.data,

            };
        case "FETCH_SERVICES":
            return {
                ...state,
                services: action.payload.data
            };
        case "FETCH_ALL_FACILITIES":
            return {
                ...state,
                all: action.payload.data,

            };
        default:
            return state;
    }
};
