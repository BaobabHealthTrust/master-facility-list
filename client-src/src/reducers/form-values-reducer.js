export default (
    state = {
        facilityName: "",
        commonName: "",
        ambulance: "",
        operationalStatus: "",
        regulatoryStatus: "",
        postalAddress: "",
        postalAddressError: "",
        contactName: "",
        contactEmail: "",
        phoneNumber: "",
        facilityNameError: "",
        emailError: "",
        commonNameError: "",
        contactNameError: "",
        phoneNumberError: "",
        latitude: "",
        latitudeError: "",
        longitude: "",
        longitudeError: "",
        facilityType: "",
        facilityOwner: "",
        dateOpened: "",
        registrationNumber: "",
        registrationNumberError: "",
        resourceName: [],
        utilityType: []
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
        case "REGULATORY_STATUS":
            return {
                ...state,
                regulatoryStatus: action.payload
            };
        case "POSTAL_ADDRESS":
            return {
                ...state,
                postalAddress: action.payload
            };
        case "POSTAL_ADDRESS_ERROR":
            return {
                ...state,
                postalAddressError: action.payload
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
        case "LONGITUDE":
            return {
                ...state,
                longitude: action.payload
            };
        case "LONGITUDE_ERROR":
            return {
                ...state,
                longitudeError: action.payload
            };
        case "FACILITY_TYPE":
            return {
                ...state,
                facilityType: action.payload
            };
        case "FACILITY_OWNER":
            return {
                ...state,
                facilityOwner: action.payload
            };
        case "DATE_OPENED":
            return {
                ...state,
                dateOpened: action.payload
            };
        case "REGISTRATION_NUMBER":
            return {
                ...state,
                registrationNumber: action.payload
            };
        case "REGISTRATION_NUMBER_ERROR":
            return {
                ...state,
                registrationNumberError: action.payload
            };
        case "AMBULANCE":
            return {
                ...state,
                ambulance: action.payload
            };
        case "REMOVE_ALL_FORM_VALUES":
            return {
                facilityName: "",
                commonName: "",
                ambulance: "",
                operationalStatus: "",
                regulatoryStatus: "",
                postalAddress: "",
                postalAddressError: "",
                contactName: "",
                contactEmail: "",
                phoneNumber: "",
                facilityNameError: "",
                emailError: "",
                commonNameError: "",
                contactNameError: "",
                phoneNumberError: "",
                latitude: "",
                latitudeError: "",
                longitude: "",
                longitudeError: "",
                facilityType: "",
                facilityOwner: "",
                dateOpened: "",
                registrationNumber: "",
                registrationNumberError: ""
            };
        default:
            return state;
    }
};
