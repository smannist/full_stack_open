import * as yup from "yup";

export const signInSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required"),
});

export const reviewSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required("Repository owner name is required"),
  repositoryName: yup
    .string()
    .required("Repository name is required"),
  rating: yup
    .number()
    .integer()
    .typeError("Rating must be a whole number")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100")
    .required("Rating is required")
});

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Username must contain at least 4 characters")
    .max(30, "Username must not contain more than 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must contain at least 4 characters")
    .max(50, "Password must not contain more than 50 characters"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match")
});
