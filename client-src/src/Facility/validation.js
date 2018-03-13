import * as EmailValidator from "email-validator";
export default e => {
    let actionTypeError = "";
    let actionType = "";
    let error = "";
    e.target.name === "contact_email"
        ? ((actionTypeError = "EMAIL_ERROR"),
          (error = "Email is not in valid format"),
          (actionType = "CONTACT_EMAIL"))
        : e.target.name === "contact_name"
          ? ((actionTypeError = "CONTACT_NAME_ERROR"),
            (actionType = "CONTACT_NAME"))
          : e.target.name === "phone_number"
            ? ((actionTypeError = "PHONE_NUMBER_ERROR"),
              (actionType = "PHONE_NUMBER"))
            : e.target.name === "latitude"
              ? ((actionTypeError = "LATITUDE_ERROR"),
                (actionType = "LATITUDE"))
              : e.target.name === "longitude"
                ? ((actionTypeError = "LONGITUDE_ERROR"),
                  (actionType = "LONGITUDE"))
                : e.target.name === "facility_name"
                  ? ((actionTypeError = "FACILITY_NAME_ERROR"),
                    (actionType = "FACILITY_NAME"))
                  : e.target.name === "common_name"
                    ? ((actionTypeError = "COMMON_NAME_ERROR"),
                      (actionType = "COMMON_NAME"))
                    : e.target.name === "registration_number"
                      ? ((actionTypeError = "REGISTRATION_NUMBER_ERROR"),
                        (actionType = "REGISTRATION_NUMBER"))
                      :e.target.name === "postal_address"
                      ? ((actionTypeError = "POSTAL_ADDRESS_ERROR"),
                        (actionType = "POSTAL_ADDRESS"))
                      : "";
    if (
        !EmailValidator.validate(e.target.value) &&
        e.target.name === "contact_email"
    ) {
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else if (
        e.target.value.match(/^[a-zA-Z ]+$/) === null &&
        e.target.name === "contact_name"
    ) {
        error = "Name must be letters only";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else if (
        e.target.value.split("").length <= 3 &&
        e.target.name === "contact_name"
    ) {
        error = "Name must be more than 3 characters";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else if (
        e.target.value.match(/^\+(?:[0-9] ?){6,13}[0-9]$/) === null &&
        e.target.name === "phone_number"
    ) {
        error =
            "phone number must be 13 in length and in international format i.e +265... ";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else if (
        e.target.value.match(/^[1-9]\d*(\.\d+)?$/) === null &&
        e.target.name === "latitude"
    ) {
        error = "latitude must be decimal or whole numbers only";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else if (
        e.target.value.match(/^[1-9]\d*(\.\d+)?$/) === null &&
        e.target.name === "longitude"
    ) {
        error = "longitude must be decimal or whole numbers only";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else if (
        e.target.value.match(/^[a-zA-Z ]+$/) === null &&
        e.target.name === "facility_name"
    ) {
        const error = "facility name must be letters only";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else if (
        e.target.value.split("").length <= 3 &&
        e.target.name === "facility_name"
    ) {
        const error = "facility name must be more than 3 characters";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else if (
        e.target.value.match(/^[a-zA-Z ]+$/) === null &&
        e.target.name === "common_name"
    ) {
        const error = "common name must be letters only";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else if (
        e.target.value.split("").length <= 3 &&
        e.target.name === "common_name"
    ) {
        const error = "common name must be more than 3 characters";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else if (
        e.target.value.split("").length <= 5 &&
        e.target.name === "registration_number"
    ) {
        const error = "registration number must be more than 5 in length";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else if (
        e.target.value.split("").length <= 10 &&
        e.target.name === "postal_address"
    ) {
        const error = "postal address must be more than or equal to 10 in length";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } 
    else {
        const error = "";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    }
};
