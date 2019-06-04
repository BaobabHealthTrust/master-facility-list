import * as yup from "yup";

const passwordValidationMessage =
  "Weak password, The password must be a combination of numbers, letters , and special characters";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .typeError("First name is required")
    .min(3)
    .required("First name is required"),
  username: yup
    .string()
    .typeError("username is required")
    .min(6)
    .required("username is required"),
  email: yup
    .string()
    .typeError("enter a valid email address")
    .email("enter a valid email address")
    .required("email is required"),

  password: yup
    .string()
    .typeError("atleast 8 characters long")
    .min(8, "atleast 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("password is required"),
  confirmPassword: yup
    .string()
    .typeError("Passwords do not match")
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("Password confirm is required")
});
