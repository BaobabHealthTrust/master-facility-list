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
            all: state.all,
            list: state.list,
            currentDetails: state.currentDetails,
            currentResources: state.currentResources,
            currentServices: state.currentServices,
            isNetworkError: true,
            isLoading: false,
            typeResourceInstances: state.typeResourceInstances,
            typeUtilityInstances: state.typeUtilityInstances,
            typeServiceInstances: state.typeServiceInstances,
            resources: state.resources,
            utilities: state.utilities,
            services: state.services,
        };
    }
    switch (action.type) {
        case "FETCH_FACILITIES":
            return {
                all: state.all,
                list: state.list.concat(action.payload.data),
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances,
                resources: state.resources,
                utilities: state.utilities,
                services: state.services
            };
        case "SET_CURRENT_DETAILS":
            return {
                all: state.all,
                list: state.list,
                currentDetails: action.payload[0],
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances,
                resources: state.resources,
                utilities: state.utilities,
                services: state.services
            };
        case "FETCH_FACILITY_DETAILS":
            return {
                all: state.all,
                list: state.list,
                currentDetails: action.payload.data,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances,
                resources: state.resources,
                utilities: state.utilities,
                services: state.services
            };
        case "FETCH_CURRENT_RESOURCES":
            return {
                all: state.all,
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: action.payload.data,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances,
                resources: state.resources,
                utilities: state.utilities,
                services: state.services
            };
        case "FETCH_CURRENT_UTILITIES":
            return {
                all: state.all,
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: action.payload.data,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances,
                resources: state.resources,
                utilities: state.utilities,
                services: state.services
            };
        case "FETCH_CURRENT_SERVICES":
            return {
                all: state.all,
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: action.payload.data,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances,
                resources: state.resources,
                utilities: state.utilities,
                services: state.services
            };
        case "FETCH_RESOURCE_TYPE_INSTANCES":
            return {
                all: state.all,
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: action.payload.data,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances,
                resources: state.resources,
                utilities: state.utilities,
                services: state.services
            };
        case "FETCH_UTILITY_TYPE_INSTANCES":
            return {
                all: state.all,
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: action.payload.data,
                typeServiceInstances: state.typeServiceInstances,
                resources: state.resources,
                utilities: state.utilities,
                services: state.services
            };

        case "FETCH_SERVICE_TYPE_INSTANCES":
            return {
                all: state.all,
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: action.payload.data,
                resources: state.resources,
                utilities: state.utilities,
                services: state.services
            };
        case "FETCH_RESOURCES":
            return {
                all: state.all,
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances,
                resources: action.payload.data,
                utilities: state.utilities,
                services: state.services
            };
        case "FETCH_UTILITIES":
            return {
                all: state.all,
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances,
                resources: state.resources,
                utilities: action.payload.data,
                services: state.services
            };
        case "FETCH_SERVICES":
            return {
                all: state.all,
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances,
                resources: state.resources,
                utilities: state.utilities,
                services: action.payload.data
            };
        case "FETCH_ALL_FACILITIES":
            return {
                all: action.payload.data,
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances,
                resources: state.resources,
                utilities: state.utilities,
                services: state.services
            };
        default:
            return state;
    }
};
