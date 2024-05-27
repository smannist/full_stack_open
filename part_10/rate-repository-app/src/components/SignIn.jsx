import * as yup from "yup";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";

import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

import Text from "./Text";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    maxWidth: 200,
    borderColor: "#888888",
  },
  buttonContainer: {
    margin: 12,
    width: 200,
  },
  button: {
    backgroundColor: "#426FBD",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFFF",
    fontSize: 16,
  },
  validationError: {
    borderColor: theme.colors.error,
  },
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(4, "Username must contain at least 4 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(4, "Password must contain at least 4 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      resetForm();
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
    <View
      style={{
        flexDirection: "column",
        marginTop: 10,
        backgroundColor: "#ffffff",
      }}
      role="form"
    >
      <TextInput
        style={[styles.input, isInvalidUsername && styles.validationError]}
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
        style={[styles.input, isInvalidPassword && styles.validationError]}
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
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={formik.handleSubmit}>
          <Text color="textSecondary" fontWeight="bold">
            Sign in
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
