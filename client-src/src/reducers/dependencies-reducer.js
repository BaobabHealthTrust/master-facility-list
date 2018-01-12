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
        searchResourceTypes: []
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
                operationalStatuses: state.operationalStatuses,
                facilityTypes: state.facilityTypes,
                facilityOwners: state.facilityOwners,
                regulatoryStatuses: state.regulatoryStatuses,
                searchResourceTypes: state.searchResourceTypes
            };
        case "FETCH_UTILITY_TYPES":
            return {
                resourceTypes: state.resourceTypes,
                utilityTypes: action.payload.data,
                serviceTypes: state.serviceTypes,
                districts: state.districts,
                operationalStatuses: state.operationalStatuses,
                facilityTypes: state.facilityTypes,
                facilityOwners: state.facilityOwners,
                regulatoryStatuses: state.regulatoryStatuses,
                searchResourceTypes: state.searchResourceTypes
            };
        case "FETCH_DISTRICTS":
            return {
                resourceTypes: state.resourceTypes,
                utilityTypes: state.utilityTypes,
                serviceTypes: state.serviceTypes,
                districts: action.payload.data,
                operationalStatuses: state.operationalStatuses,
                facilityTypes: state.facilityTypes,
                facilityOwners: state.facilityOwners,
                regulatoryStatuses: state.regulatoryStatuses,
                searchResourceTypes: state.searchResourceTypes

            };
        case "FETCH_OPERATIONAL_STATUSES":
            return {
                resourceTypes: state.resourceTypes,
                utilityTypes: state.utilityTypes,
                serviceTypes: state.serviceTypes,
                districts: state.districts,
                operationalStatuses: action.payload.data,
                facilityTypes: state.facilityTypes,
                facilityOwners: state.facilityOwners,
                regulatoryStatuses: state.regulatoryStatuses,
                searchResourceTypes: state.searchResourceTypes
            };
        case "FETCH_FACILITY_TYPES":
            return {
                resourceTypes: state.resourceTypes,
                utilityTypes: state.utilityTypes,
                serviceTypes: state.serviceTypes,
                districts: state.districts,
                operationalStatuses: state.operationalStatuses,
                facilityTypes: action.payload.data,
                facilityOwners: state.facilityOwners,
                regulatoryStatuses: state.regulatoryStatuses,
                searchResourceTypes: state.searchResourceTypes
            };
        case "FETCH_FACILITY_OWNERS":
            return {
                resourceTypes: state.resourceTypes,
                utilityTypes: state.utilityTypes,
                serviceTypes: state.serviceTypes,
                districts: state.districts,
                operationalStatuses: state.operationalStatuses,
                facilityTypes: state.facilityTypes,
                facilityOwners: action.payload.data,
                regulatoryStatuses: state.regulatoryStatuses,
                searchResourceTypes: state.searchResourceTypes

            };
        case "FETCH_REGULATORY_STATUSES":
            return {
                resourceTypes: state.resourceTypes,
                utilityTypes: state.utilityTypes,
                serviceTypes: state.serviceTypes,
                districts: state.districts,
                operationalStatuses: state.operationalStatuses,
                facilityTypes: state.facilityTypes,
                facilityOwners: state.facilityOwners,
                regulatoryStatuses: action.payload.data,
                searchResourceTypes: state.searchResourceTypes.state

            };
            case "FETCH_SEARCH_RESOURCE_TYPE":
            return {
                resourceTypes: state.resourceTypes,
                utilityTypes: state.utilityTypes,
                serviceTypes: state.serviceTypes,
                districts: state.districts,
                operationalStatuses: state.operationalStatuses,
                facilityTypes: state.facilityTypes,
                facilityOwners: state.facilityOwners,
                regulatoryStatuses: state.regulatoryStatuses,
                searchResourceTypes: action.payload.data

            };

        default:
            return state;
    }
};
