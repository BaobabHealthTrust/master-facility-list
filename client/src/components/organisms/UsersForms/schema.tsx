import * as yup from "yup";

const passwordValidationMessage =
  "Weak password, The password must be a combination of numbers, letters , and special characters";
const name = "Please put you full name separated by a space";
export const userSchema = yup.object().shape({
  // TODO: validate name
  name: yup
    .string()
    .typeError("Name is required")
    .min(7, "Name must be at least 7 characters")
    .required("Name is required"),
  // .matches(/^([a-zA-Z].{2,})[\s]([a-zA-Z].{2,})$/g, name),
  username: yup
    .string()
    .typeError("Username is required")
    .min(6, "Username must be at least 6 characters")
    .required("Username is required"),
  email: yup
    .string()
    .typeError("Enter a valid email address")
    .email("Enter a valid email address")
    .required("Email is required"),

  role: yup.string().required("Email is required"),

  password: yup
    .string()
    .typeError("Atleast 8 characters long")
    .min(8, "Atleast 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .typeError("Passwords do not match")
    .oneOf([yup.ref("password"), ""], "Passwords do not match")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("Password confirm is required")
});

export const updateSchema = yup.object().shape({
  // TODO: validate name
  name: yup
    .string()
    .typeError("Name is required")
    .min(3)
    .required("Name is required"),
  //.matches(/^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/g, name),
  username: yup
    .string()
    .typeError("Username is required")
    .min(6)
    .required("Username is required"),
  email: yup
    .string()
    .typeError("Enter a valid email address")
    .email("Enter a valid email address")
    .required("Email is required")
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .typeError("Current Password required")
    .min(3)
    .required("Current Password required"),
  newPassword: yup
    .string()
    .typeError("Atleast 8 characters long")
    .min(8, "Atleast 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("Password is required"),
  confirmNewPassword: yup
    .string()
    .typeError("Passwords do not match")
    .oneOf([yup.ref("newPassword"), ""], "Passwords do not match")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("Password confirm is required")
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .typeError("Atleast 8 characters long")
    .min(8, "atleast 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("Password is required"),
  confirmNewPassword: yup
    .string()
    .typeError("Passwords do not match")
    .oneOf([yup.ref("newPassword"), ""], "Passwords do not match")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("Password confirm is required")
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .typeError("Current Password required")
    .min(3)
    .required("Current Password required"),
  newPassword: yup
    .string()
    .typeError("atleast 8 characters long")
    .min(8, "atleast 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("password is required"),
  confirmNewPassword: yup
    .string()
    .typeError("Passwords do not match")
    .oneOf([yup.ref("newPassword"), ""], "Passwords do not match")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("Password confirm is required")
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .typeError("atleast 8 characters long")
    .min(8, "atleast 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("password is required"),
  confirmNewPassword: yup
    .string()
    .typeError("Passwords do not match")
    .oneOf([yup.ref("newPassword"), ""], "Passwords do not match")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
      passwordValidationMessage
    )
    .required("Password confirm is required")
});
