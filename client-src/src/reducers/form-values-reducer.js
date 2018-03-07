export default (
    state = {
        facilityName: "",
        commonName: "",
        operationalStatus: "0",
        postalAddress: "",
        contactName: "",
        contactEmail: "",
        facilityNameError: ""
    },
    action
) => {
    switch (action.type) {
        case "FACILITY_NAME":
            return {
                ...state,
                facilityNameError: state.facilityNameError,
                facilityName: action.payload
            };
        case "FACILITY_NAME_ERROR":
            return {
                ...state,
                facilityNameError: action.payload
            };
        case "COMMON_NAME":
            return {
                ...state,
                commonName: action.payload
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
        case "CONTACT_EMAIL":
            return {
                ...state,
                contactEmail: action.payload
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
