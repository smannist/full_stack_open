import { TextInput, Pressable, View } from "react-native";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signInSchema as validationSchema } from "../schema/validation";

import { formStyle } from "../styles";
import useSignIn from "../hooks/useSignIn";
import Text from "./Text";

export const SignInContainer = ({
  formik,
  isInvalidUsername,
  isInvalidPassword,
}) => {
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
        style={[formStyle.input, isInvalidUsername && formStyle.validationError]}
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
        style={[formStyle.input, isInvalidPassword && formStyle.validationError]}
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
      <View style={formStyle.buttonContainer}>
        <Pressable style={formStyle.button} onPress={formik.handleSubmit}>
          <Text color="textSecondary" fontWeight="bold">
            Sign in
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      resetForm();
      navigate("/");
    } catch (e) {
      console.log("An error occured during sign in:", e);
    }

  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isInvalidUsername = formik.touched.username && formik.errors.username;
  const isInvalidPassword = formik.touched.password && formik.errors.password;

  return (
    <SignInContainer
      formik={formik}
      isInvalidUsername={isInvalidUsername}
      isInvalidPassword={isInvalidPassword}
    />
  );
};

export default SignIn;
