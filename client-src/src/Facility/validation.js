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
            : e.target.name === "latititude"
              ? ((actionTypeError = "LATITUDE_ERROR"),
                (actionType = "LATITUDE"))
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
        console.log("in");
        error = "latitude must be decimal or whole numbers only";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    } else {
        const error = "";
        return {
            error: error,
            actionTypeError: actionTypeError,
            actionType: actionType
        };
    }
};
