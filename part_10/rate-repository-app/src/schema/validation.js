import * as yup from "yup";

export const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must contain at least 4 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(4, "Password must contain at least 4 characters")
    .required("Password is required"),
});
