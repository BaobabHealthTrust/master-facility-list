import { uniq, pull } from "lodash";

export default (
  state = {
    districtValues: [],
    operationalStatusValues: [],
    facilityTypeValues: [],
    facilityOwnerValues: [],
    regulatoryStatusValues: [],
    typeResourceInstanceValues: [],
    typeUtilityInstanceValues: [],
    typeServiceInstanceValues: []
  },
  action
) => {
  switch (action.type) {
    case "ADD_DISTRICT_VALUES":
      return {
        ...state,
        districtValues: uniq([...state.districtValues, action.payload]),

      };
    case "ADD_OPERATIONAL_STATUS_VALUES":
      return {
        ...state,
        operationalStatusValues: uniq([
          ...state.operationalStatusValues,
          action.payload
        ]),

      };
    case "ADD_FACILITY_TYPE_VALUES":
      return {
        ...state,
        facilityTypeValues: uniq([
          ...state.facilityTypeValues,
          action.payload
        ]),

      };
    case "ADD_FACILITY_OWNER_VALUES":
      return {
        ...state,
        facilityOwnerValues: uniq([
          ...state.facilityOwnerValues,
          action.payload
        ]),

      };
    case "ADD_REGULATORY_STATUS_VALUES":
      return {
        ...state,
        regulatoryStatusValues: uniq([
          ...state.regulatoryStatusValues,
          action.payload
        ]),

      };
    case "ADD_RESOURCE_TYPE_INSTANCE":
      return {
        ...state,
        typeResourceInstanceValues: uniq([
          ...state.typeResourceInstanceValues,
          action.payload
        ]),

      };
    case "ADD_UTILITY_TYPE_INSTANCE":
      return {
        ...state,
        typeUtilityInstanceValues: uniq([
          ...state.typeUtilityInstanceValues,
          action.payload
        ]),

      };
    case "ADD_SERVICE_TYPE_INSTANCE":
      return {
        ...state,
        typeServiceInstanceValues: uniq([
          ...state.typeServiceInstanceValues,
          action.payload
        ])
      };
    case "REMOVE_DISTRICT_VALUES":
      return {
        ...state,
        districtValues: pull(
          state.districtValues,
          action.payload.toString()
        ),

      };
    case "REMOVE_OPERATIONAL_STATUS_VALUES":
      return {
        ...state,
        operationalStatusValues: pull(
          state.operationalStatusValues,
          action.payload.toString()
        ),

      };
    case "REMOVE_FACILITY_TYPE_VALUES":
      return {
        ...state,
        facilityTypeValues: pull(
          state.facilityTypeValues,
          action.payload.toString()
        ),

      };
    case "REMOVE_FACILITY_OWNER_VALUES":
      return {
        ...state,
        facilityOwnerValues: pull(
          state.facilityOwnerValues,
          action.payload.toString()
        ),

      };
    case "REMOVE_REGULATORY_STATUS_VALUES":
      return {
        ...state,
        regulatoryStatusValues: pull(
          state.regulatoryStatusValues,
          action.payload.toString()
        ),

      };
    case "REMOVE_RESOURCE_TYPE_INSTANCES":
      return {
        ...state,
        typeResourceInstanceValues: pull(
          state.typeResourceInstanceValues,
          action.payload.toString()
        ),

      };
    case "REMOVE_UTILITY_TYPE_INSTANCES":
      return {
        ...state,
        typeUtilityInstanceValues: pull(
          state.typeUtilityInstanceValues,
          action.payload.toString()
        ),

      };
    case "REMOVE_SERVICE_TYPE_INSTANCES":
      return {
        ...state,
        typeServiceInstanceValues: pull(
          state.typeServiceInstanceValues,
          action.payload.toString()
        )
      };
    case "REMOVE_ALL_SEARCH_VALUES":
      return {
        facilityTypeValues: [],
        districtValues: [],
        operationalStatusValues: [],
        facilityOwnerValues: [],
        regulatoryStatusValues: [],
        typeResourceInstanceValues: [],
        typeUtilityInstanceValues: [],
        typeServiceInstanceValues: []
      };
    default:
      return state;
  }
};
