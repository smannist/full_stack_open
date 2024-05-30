import * as yup from "yup";

export const signInSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must contain at least 4 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(4, "Password must contain at least 4 characters")
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
