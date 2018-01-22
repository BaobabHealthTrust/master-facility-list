export default (
    state = {
        list: [],
        currentDetails: {},
        currentResources: [],
        currentUtilities: [],
        currentServices: [],
        isNetworkError: false,
        isLoading: true,
        typeResourceInstances: [],
        typeUtilityInstances: [],
        typeServiceInstances: []
    },
    action
) => {
    if (action.error) {
        return {
            list: state.list,
            currentDetails: state.currentDetails,
            currentResources: state.currentResources,
            currentServices: state.currentServices,
            isNetworkError: true,
            isLoading: false,
            typeResourceInstances: state.typeResourceInstances,
            typeUtilityInstances: state.typeUtilityInstances,
            typeServiceInstances: state.typeServiceInstances,

        };
    }
    switch (action.type) {
        case 'FETCH_FACILITIES':
            return {
                list: state.list.concat(action.payload.data),
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances

            };
        case 'SET_CURRENT_DETAILS':
            return {
                list: state.list,
                currentDetails: action.payload[0],
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances

            };
        case 'FETCH_FACILITY_DETAILS':
            return {
                list: state.list,
                currentDetails: action.payload.data,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances
                

            };
        case 'FETCH_CURRENT_RESOURCES':
            return {
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: action.payload.data,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances

            };
        case 'FETCH_CURRENT_UTILITIES':
            return {
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: action.payload.data,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances

            };
        case 'FETCH_CURRENT_SERVICES':
            return {
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: action.payload.data,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances
                

            };
        case 'FETCH_RESOURCE_TYPE_INSTANCES':
            return {
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: action.payload.data,
                typeUtilityInstances: state.typeUtilityInstances,
                typeServiceInstances: state.typeServiceInstances
            };
        case 'FETCH_UTILITY_TYPE_INSTANCES':
            return {
                list: state.list,
                currentDetails: state.currentDetails,
                currentResources: state.currentResources,
                currentUtilities: state.currentUtilities,
                currentServices: state.currentServices,
                isNetworkError: false,
                isLoading: false,
                typeResourceInstances: state.typeResourceInstances,
                typeUtilityInstances: action.payload.data,
                typeServiceInstances: state.typeServiceInstances
            };

            case 'FETCH_SERVICE_TYPE_INSTANCES':
            return {
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
            };


        default:
            return state;
    }
};
