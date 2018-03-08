export default (
    state = {
        facilityName: "",
        commonName: "",
        operationalStatus: "0",
        postalAddress: "",
        contactName: "",
        contactEmail: "",
        phoneNumber: "",
        facilityNameError: "",
        emailError: "",
        commonNameError: "",
        contactNameError: "",
        phoneNumberError: "",
        latitude: "",
        latitudeError: ""
    },
    action
) => {
    switch (action.type) {
        case "FACILITY_NAME":
            return {
                ...state,
                facilityName: action.payload
            };
        case "FACILITY_NAME_ERROR":
            return {
                ...state,
                facilityNameError: action.payload
            };
        case "EMAIL_ERROR":
            return {
                ...state,
                emailError: action.payload
            };
        case "COMMON_NAME":
            return {
                ...state,
                commonName: action.payload
            };
        case "COMMON_NAME_ERROR":
            return {
                ...state,
                commonNameError: action.payload
            };
        case "OPERATIONAL_STATUS":
            return {
                ...state,
                operationalStatus: action.payload
            };
        case "POSTAL_ADDRESS":
            return {
                ...state,
                postalAddress: action.payload
            };
        case "CONTACT_NAME":
            return {
                ...state,
                contactName: action.payload
            };
        case "CONTACT_NAME_ERROR":
            return {
                ...state,
                contactNameError: action.payload
            };
        case "CONTACT_EMAIL":
            return {
                ...state,
                contactEmail: action.payload
            };
        case "PHONE_NUMBER":
            return {
                ...state,
                phoneNumber: action.payload
            };
        case "PHONE_NUMBER_ERROR":
            return {
                ...state,
                phoneNumberError: action.payload
            };
        case "LATITUDE":
            return {
                ...state,
                latitude: action.payload
            };
        case "LATITUDE_ERROR":
            return {
                ...state,
                latitudeError: action.payload
            };

        case "REMOVE_ALL_FORM_VALUES":
            return {
                facilityName: "",
                commonName: "",
                operationalStatus: "",
                postalAddress: "",
                contactName: "",
                contactEmail: ""
            };
        default:
            return state;
    }
};
