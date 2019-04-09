import yup from "yup";

const REQUIRED_MESSAGE = "You can't leave this field blank";
const PHONE_MIN_MESSAGE = "Invalid phone number";
const INVALID_NUM_MESSAGE = "Invalid number";
const INVALID_TEXT = "This is not a valid text";

export const contactSchema = yup.object().shape({
  postalAddress: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(5, "Postal Address is too short")
    .required(REQUIRED_MESSAGE),
  physicalAddress: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(3, "Physical Address is too short")
    .required(REQUIRED_MESSAGE),
  contactName: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(3, "Contact Name is too short")
    .required(REQUIRED_MESSAGE),
  contactEmail: yup
    .string()
    .typeError(INVALID_TEXT)
    .email("Invalid Email format")
    .required(REQUIRED_MESSAGE),
  contactPhoneNumber: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(8, PHONE_MIN_MESSAGE)
    .max(10, PHONE_MIN_MESSAGE)
    .matches(/^[0]{1}?[1,2,8,9]{1}?[0-9]{6,8}$/im, "Invalid Phone number")
    .required(REQUIRED_MESSAGE),
  catchmentArea: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(3, "Catchment Area is too short")
    .required(REQUIRED_MESSAGE),
  catchmentPopulation: yup
    .number()
    .typeError(INVALID_NUM_MESSAGE)
    .positive()
    .integer()
    .required(REQUIRED_MESSAGE),
  longitude: yup
    .number()
    .typeError(INVALID_NUM_MESSAGE)
    .positive()
    .required(REQUIRED_MESSAGE),
  latitude: yup
    .number()
    .typeError(INVALID_NUM_MESSAGE)
    .negative()
    .required(REQUIRED_MESSAGE)
});

export const basicSchema = yup.object().shape({
  facilityName: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(3, "Facility name must have atleast 3 characters")
    .required(REQUIRED_MESSAGE),
  commonName: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(3, "Common name must have atleast 3 characters")
    .required(REQUIRED_MESSAGE),
  registrationNumber: yup
    .number()
    .typeError(INVALID_NUM_MESSAGE)
    .required(REQUIRED_MESSAGE)
    .min(8, "Invalid Registration Number")
});

export const getResourcesSchema = resources => {
  let validationFields = {};

  for (let resource of resources) {
    validationFields[`resource_${resource.id}`] = yup
      .number()
      .typeError(INVALID_NUM_MESSAGE)
      .positive("Must be a positive number")
      .required(REQUIRED_MESSAGE);
  }
  return yup.object().shape(validationFields);
};
