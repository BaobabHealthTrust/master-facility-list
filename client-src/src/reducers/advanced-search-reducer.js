import { uniq, pull } from "lodash";

export default (
    state = {
        districtValues: [],
        operationalStatusValues: [],
        facilityTypeValues: [],
        facilityOwnerValues: [],
        regulatoryStatusValues: [],
        typeResourceInstanceValues: [],
        typeUtilityInstanceValues: []
    },
    action
) => {
    switch (action.type) {
        case "ADD_DISTRICT_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: uniq([...state.districtValues, action.payload]),
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                UtilityTypes:state.UtilityTypes,
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "ADD_OPERATIONAL_STATUS_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: uniq([
                    ...state.operationalStatusValues,
                    action.payload
                ]),
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                UtilityTypes:state.UtilityTypes,
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "ADD_FACILITY_TYPE_VALUES":
            return {
                facilityTypeValues: uniq([
                    ...state.facilityTypeValues,
                    action.payload
                ]),
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                UtilityTypes:state.UtilityTypes,
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "ADD_FACILITY_OWNER_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: uniq([
                    ...state.facilityOwnerValues,
                    action.payload
                ]),
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                UtilityTypes:state.UtilityTypes,
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "ADD_REGULATORY_STATUS_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: uniq([
                    ...state.facilityOwnerValues,
                    action.payload
                ]),
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                UtilityTypes:state.UtilityTypes,
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "ADD_RESOURCE_TYPE_INSTANCE":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: uniq([
                    ...state.typeResourceInstanceValues,
                    action.payload
                ]),
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "ADD_UTILITY_INSTANCE_TYPE":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                typeUtilityInstanceValues: uniq([
                    ...state.typeUtilityInstanceValues,
                    action.payload
                ]),
            };
        case "REMOVE_DISTRICT_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: pull(
                    state.districtValues,
                    action.payload.toString()
                ),
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "REMOVE_OPERATIONAL_STATUS_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: pull(
                    state.operationalStatusValues,
                    action.payload.toString()
                ),
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "REMOVE_FACILITY_TYPE_VALUES":
            return {
                facilityTypeValues: pull(
                    state.facilityTypeValues,
                    action.payload.toString()
                ),
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "REMOVE_FACILITY_OWNER_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: pull(
                    state.facilityOwnerValues,
                    action.payload.toString()
                ),
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "REMOVE_REGULATORY_STATUS_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: pull(
                    state.regulatoryStatusValues, action.payload.toString()
                ),
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "REMOVE_RESOURCE_TYPE_INSTANCES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: pull(state.typeResourceInstanceValues, action.payload.toString()),
                typeUtilityInstanceValues: state.typeUtilityInstanceValues
            };
        case "REMOVE_UTILITY_TYPE_INSTANCES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                typeResourceInstanceValues: state.typeResourceInstanceValues,
                typeUtilityInstanceValues: pull(state.typeUtilityInstanceValues, action.payload.toString()),
            };

        default:
            return state;
    }
};
