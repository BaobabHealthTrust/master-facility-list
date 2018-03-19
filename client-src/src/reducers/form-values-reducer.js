import { uniq, pull } from "lodash";
export default (
    state = {
        facilityName: "",
        commonName: "",
        name: "",
        district: "",
        quantity: "",
        ambulance: "",
        vehicle: "",
        motorCycle: "",
        bikeAmbulance: "",
        maternityBed: "",
        deliveryBed: "",
        otherInPatientsBed: "",
        kw20Generator: "",
        kw40Generator: "",
        kw60Generator: "",
        kw80Generator: "",
        desktop: "",
        laptop: "",
        tablet: "",
        mobilePhone: "",
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
        resources: [],
        error: [],
        utilities: [],
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
                facilityNameError: action.payload,
                error: action.payload !==""?uniq([...state.error, "facilityNameError"]):pull(state.error, "facilityNameError")
            };
        case "EMAIL_ERROR":
            return {
                ...state,
                emailError: action.payload,
                error: action.payload !==""?uniq([...state.error, "emailError"]):pull(state.error, "emailError")
            };
        case "COMMON_NAME":
            return {
                ...state,
                commonName: action.payload
            };
        case "COMMON_NAME_ERROR":
            return {
                ...state,
                commonNameError: action.payload,
                error: action.payload !==""?uniq([...state.error, "commonNameError"]):pull(state.error, "commonNameError")
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
                postalAddressError: action.payload,
                error: action.payload !==""?uniq([...state.error, "postalAddressError"]):pull(state.error, "postalAddressError")
            };
        case "CONTACT_NAME":
            return {
                ...state,
                contactName: action.payload
            };
        case "CONTACT_NAME_ERROR":
            return {
                ...state,
                contactNameError: action.payload,
                error: action.payload !==""?uniq([...state.error, "contactNameError"]):pull(state.error, "contactNameError")
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
                phoneNumberError: action.payload,
                error: action.payload !==""?uniq([...state.error, "phoneNumberError"]):pull(state.error, "phoneNumberError")
            };
        case "LATITUDE":
            return {
                ...state,
                latitude: action.payload
            };
        case "LATITUDE_ERROR":
            return {
                ...state,
                latitudeError: action.payload,
                error: action.payload !==""?uniq([...state.error, "latitudeError"]):pull(state.error, "latitudeError")
            };
        case "LONGITUDE":
            return {
                ...state,
                longitude: action.payload
            };
        case "LONGITUDE_ERROR":
            return {
                ...state,
                longitudeError: action.payload,
                error: action.payload !==""?uniq([...state.error, "longitudeError"]):pull(state.error, "longitudeError")
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
                registrationNumberError: action.payload,
                error: action.payload !==""?uniq([...state.error, "registrationNumberError"]):pull(state.error, "registrationNumberError")
            };
        case "AMBULANCE":
            return {
                ...state,
                ambulance: action.payload
            };
        case "VEHICLE":
            return {
                ...state,
                vehicle: action.payload
            };
        case "MOTOR_CYCLE":
            return {
                ...state,
                motorCycle: action.payload
            };
        case "BIKE_AMBULANCE":
            return {
                ...state,
                bikeAmbulance: action.payload
            };

        case "MATERNITY_BED":
            return {
                ...state,
                maternityBed: action.payload
            };
        case "DELIVERY_BED":
            return {
                ...state,
                deliveryBed: action.payload
            };
        case "OTHER_IN_PATIENT_BED":
            return {
                ...state,
                otherInPatientsBed: action.payload
            };
        case "KW_20_GENERATOR":
            return {
                ...state,
                kw20Generator: action.payload
            };
        case "KW_40_GENERATOR":
            return {
                ...state,
                kw40Generator: action.payload
            };
        case "KW_60_GENERATOR":
            return {
                ...state,
                kw60Generator: action.payload
            };
        case "KW_80_GENERATOR":
            return {
                ...state,
                kw80Generator: action.payload
            };
        case "DESKTOP":
            return {
                ...state,
                desktop: action.payload
            };
        case "LAPTOP":
            return {
                ...state,
                laptop: action.payload
            };
        case "TABLET":
            return {
                ...state,
                tablet: action.payload
            };
        case "MOBILE_PHONE":
            return {
                ...state,
                mobilePhone: action.payload
            };
        case "DISTRICT":
            return {
                ...state,
                district: action.payload
            };
        case "ADD_RESOURCE":
            return {
                ...state,
                quantity: action.payload,
                name: action.name
            };
        case "ADD_UTILITY":
            return {
                ...state,
                utilities: uniq([...state.utilities, action.payload]),
            };
        case "REMOVE_UTILITY":
            return {
                ...state,
                utilities: pull(state.utilities, action.payload),
            };
        case "REMOVE_ALL_FORM_VALUES":
            return {
                facilityName: "",
                commonName: "",
                name: "",
                district: "",
                quantity: "",
                ambulance: "",
                vehicle: "",
                motorCycle: "",
                bikeAmbulance: "",
                maternityBed: "",
                deliveryBed: "",
                otherInPatientsBed: "",
                kw20Generator: "",
                kw40Generator: "",
                kw60Generator: "",
                kw80Generator: "",
                desktop: "",
                laptop: "",
                tablet: "",
                mobilePhone: "",
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
                resources: [],
                utilities: [],
            };
        default:
            return state;
    }
};
