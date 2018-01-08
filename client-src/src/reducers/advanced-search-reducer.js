import { uniq, without, pull } from "lodash";

export default (
    state = {
        districtValues: []
    },
    action
) => {
    switch (action.type) {
        case "ADD_DISTRICT_VALUES":
            return {
                districtValues: uniq([...state.districtValues, action.payload])
            };
        case "REMOVE_DISTRICT_VALUES":
            return {
                districtValues: pull(
                    state.districtValues,
                    action.payload.toString()
                )
            };
        default:
            return state;
    }
};
