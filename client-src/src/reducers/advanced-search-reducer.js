export default (state = { districtValues: [] }, action) => {
    switch (action.type) {
        case "DISTRICT_VALUES":
            return {
                districtValues: action.payload
            }
        default:
            return {
                districtValues: state.districtValues
            }
    }
}
