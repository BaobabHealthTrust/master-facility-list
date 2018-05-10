export default (
    state = {
        basicResponse: "",
        contactResponse: "",
        geolocationResponse: "",
        districtResponse: "",
        facilityUtilityResponse: "",
        locationResponse: "",
        addressResponse: "",
        editContactResponse: "",
        editGeolocationResponse: "",
        editLocationResponse: "",
        editAddressResponse: "",
        editBasicResponse: "",
        editFacilityUtilityResponse: "",
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
        case "POST_FORM_LOCATION_DATA":
            return {
                ...state,
                locationResponse: action.payload
            };
        case "POST_FORM_ADDRESS_DATA":
            return {
                ...state,
                addressResponse: action.payload
            };
        case "EDIT_FACILITY_BASIC_DATA":
            return {
                ...state,
                editBasicResponse: action.payload
            }; 
        case "EDIT_FACILITY_UTILITY_DATA":
            return {
                ...state,
                editFacilityUtilityResponse: action.payload
            };
        case "EDIT_FORM_CONTACT_DATA":
            return {
                ...state,
                editContactResponse: action.payload
            };
        case "EDIT_FORM_GEOLOCATION_DATA":
            return {
                ...state,
                editGeolocationResponse: action.payload
            };
        case "EDIT_FORM_LOCATION_DATA":
            return {
                ...state,
                editLocationResponse: action.payload
            };
        case "EDIT_FORM_ADDRESS_DATA":
            return {
                ...state,
                editAddressResponse: action.payload
            };  
        default:
            return state;
    }
};
