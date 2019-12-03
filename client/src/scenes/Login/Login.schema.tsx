import * as yup from "yup";

export const LoginSchema: yup.ObjectSchema<any> = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});
