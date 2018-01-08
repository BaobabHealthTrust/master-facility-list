import { uniq, without, pull } from "lodash";

export default (
    state = {
        districtValues: [],
        operationalStatusValues: []
    },
    action
) => {
    switch (action.type) {
        case "ADD_DISTRICT_VALUES":
            return {
                districtValues: uniq([...state.districtValues, action.payload]),
                operationalStatusValues: state.operationalStatusValues
            };
        case "ADD_OPERATIONAL_STATUS_VALUES":
            const value = action.payload;
            return {
                districtValues: state.districtValues,
                operationalStatusValues: uniq([
                    ...state.operationalStatusValues,
                    action.payload
                ])
            };
        case "REMOVE_DISTRICT_VALUES":
            return {
                districtValues: pull(
                    state.districtValues,
                    action.payload.toString()
                ),
                operationalStatusValues: state.operationalStatusValues
            };
        default:
            return state;
    }
};
