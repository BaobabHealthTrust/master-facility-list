export default (
    state = {
        basicResponse: "",
        contactResponse: "",
        geolocationResponse: "",
        districtResponse: "",
        facilityUtilityResponse: "",
    },
    action
) => {
    switch (action.type) {
        case "POST_FORM_BASIC_DATA":
            return {
                ...state,
                basicResponse: action.payload
            };
        case "POST_FORM_CONTACT_DATA":
            return {
                ...state,
                contactResponse: action.payload
            };
        case "POST_FORM_GEOLOCATION_DATA":
            return {
                ...state,
                geolocationResponse: action.payload
            };
        case "PATCH_FORM_FACILITY_DATA":
            return {
                ...state,
                districtResponse: action.payload
            };
        case "POST_FORM_FACILITY_UTILITY_DATA":
            return {
                ...state,
                facilityUtilityResponse: action.payload
            };
        default:
            return state;
    }
};
