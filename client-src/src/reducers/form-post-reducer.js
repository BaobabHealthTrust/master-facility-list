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
    editFacilityUtilityResponse: ""
  },
  action
) => {
  switch (action.type) {
    case "POST_FORM_BASIC_DATA_FULFILLED":
      return {
        ...state,
        basicResponse: action.payload
      };
    case "POST_FORM_CONTACT_DATA_FULFILLED":
      return {
        ...state,
        contactResponse: action.payload
      };
    case "POST_FORM_GEOLOCATION_DATA_FULFILLED":
      return {
        ...state,
        geolocationResponse: action.payload
      };
    case "PATCH_FORM_FACILITY_DATA_FULFILLED":
      return {
        ...state,
        districtResponse: action.payload
      };
    case "POST_FORM_FACILITY_UTILITY_DATA_FULFILLED":
      return {
        ...state,
        facilityUtilityResponse: action.payload
      };
    case "POST_FORM_LOCATION_DATA_FULFILLED":
      return {
        ...state,
        locationResponse: action.payload
      };
    case "POST_FORM_ADDRESS_DATA_FULFILLED":
      return {
        ...state,
        addressResponse: action.payload
      };
    case "EDIT_FACILITY_BASIC_DATA_FULFILLED":
      return {
        ...state,
        editBasicResponse: action.payload
      };
    case "EDIT_FACILITY_UTILITY_DATA_FULFILLED":
      return {
        ...state,
        editFacilityUtilityResponse: action.payload
      };
    case "EDIT_FORM_CONTACT_DATA_FULFILLED":
      return {
        ...state,
        editContactResponse: action.payload
      };
    case "EDIT_FORM_GEOLOCATION_DATA_FULFILLED":
      return {
        ...state,
        editGeolocationResponse: action.payload
      };
    case "EDIT_FORM_LOCATION_DATA_FULFILLED":
      return {
        ...state,
        editLocationResponse: action.payload
      };
    case "EDIT_FORM_ADDRESS_DATA_FULFILLED":
      return {
        ...state,
        editAddressResponse: action.payload
      };
    default:
      return state;
  }
};
