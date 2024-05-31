import { TextInput, Pressable, View } from "react-native";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { formStyle } from "../styles";

import { signUpSchema as validationSchema } from "../schema/validation";

import useCreateUser from "../hooks/useCreateUser";
import useSignIn from "../hooks/useSignIn";

import Text from "./Text";

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const { username, password } = values;
      await createUser({ username, password });
      await signIn({ username, password });
      resetForm();
      navigate("/");
    } catch (e) {
      console.log("An error occured during user creation", e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isInvalidUsername = formik.touched.username && formik.errors.username;
  const isInvalidPassword = formik.touched.password && formik.errors.password;

  const isInvalidConfirmPassword =
    formik.touched.confirmPassword && formik.errors.confirmPassword;

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
        style={[
          formStyle.input,
          isInvalidUsername && formStyle.validationError,
        ]}
        placeholder="Username"
        placeholderTextColor="#888888"
        name="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {isInvalidUsername && (
        <Text color="error" textLeftPadding="medium">
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        style={[
          formStyle.input,
          isInvalidPassword && formStyle.validationError,
        ]}
        placeholder="Password"
        placeholderTextColor="#888888"
        name="Password"
        value={formik.values.password}
        secureTextEntry
        onChangeText={formik.handleChange("password")}
      />
      {isInvalidPassword && (
        <Text color="error" textLeftPadding="medium">
          {formik.errors.password}
        </Text>
      )}
      <TextInput
        style={[
          formStyle.input,
          isInvalidPassword && formStyle.validationError,
        ]}
        placeholder="Password confirmation"
        placeholderTextColor="#888888"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        secureTextEntry
        onChangeText={formik.handleChange("confirmPassword")}
      />
      {isInvalidConfirmPassword && (
        <Text color="error" textLeftPadding="medium">
          {formik.errors.confirmPassword}
        </Text>
      )}
      <View style={formStyle.buttonContainer}>
        <Pressable style={formStyle.button} onPress={formik.handleSubmit}>
          <Text color="textSecondary" fontWeight="bold">
            Sign up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;
