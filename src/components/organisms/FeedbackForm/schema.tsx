import * as yup from "yup";
export const feedbackSchema: yup.ObjectSchema<any> = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .required(),
  message: yup
    .string()
    .required()
    .min(3),
  email: yup
    .string()
    .required()
    .min(3)
    .email(),

  feedbackType: yup.number().required()
});
