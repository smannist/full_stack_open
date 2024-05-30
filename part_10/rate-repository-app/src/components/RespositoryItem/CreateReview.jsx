import { TextInput, Pressable, View } from "react-native";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { formStyle } from "../../styles";
import { reviewSchema as validationSchema } from "../../schema/validation";
import useCreateReview from "../../hooks/useCreateReview";
import Text from "../Text";

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      await createReview({ ownerName, repositoryName, rating, text });
      resetForm();
      navigate(`/repositories/${ownerName}.${repositoryName}`);
    } catch (e) {
      console.log("An error occured during review creation:", e);
    }

  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isInvalidOwner = formik.touched.ownerName && formik.errors.ownerName;
  const isInvalidName = formik.touched.repositoryName && formik.errors.repositoryName;
  const isInvalidRating = formik.touched.rating && formik.errors.rating;

  return (
    <View
      style={{
        flexDirection: "column",
        marginTop: 10,
        backgroundColor: "#ffffff",
      }}
      role="form"
    >
      <TextInput
        style={[formStyle.input, isInvalidOwner && formStyle.validationError]}
        placeholder="Repository owner name"
        placeholderTextColor="#888888"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        name="ownerName"
      />
      {isInvalidOwner && (
        <Text color="error" textLeftPadding="medium">
          {formik.errors.ownerName}
        </Text>
      )}
      <TextInput
        style={[formStyle.input, isInvalidName && formStyle.validationError]}
        placeholder="Repository name"
        placeholderTextColor="#888888"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        name="repositoryName"
      />
      {isInvalidName && (
        <Text color="error" textLeftPadding="medium">
          {formik.errors.repositoryName}
        </Text>
      )}
      <TextInput
        style={[formStyle.input, isInvalidRating && formStyle.validationError]}
        placeholder="Rating between 0 and 100"
        placeholderTextColor="#888888"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        name="rating"
      />
      {isInvalidRating && (
        <Text color="error" textLeftPadding="medium">
          {formik.errors.rating}
        </Text>
      )}
      <TextInput
        style={formStyle.input}
        placeholder="Review"
        placeholderTextColor="#888888"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        multiline
        name="text"
      />
      <View style={formStyle.buttonContainer}>
        <Pressable style={formStyle.button} onPress={formik.handleSubmit}>
          <Text color="textSecondary" fontWeight="bold">
            Create a review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateReview;
