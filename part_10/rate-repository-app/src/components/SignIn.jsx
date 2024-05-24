import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";

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
});

const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

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
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888888"
        name="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888888"
        name="Password"
        value={formik.values.password}
        secureTextEntry
        onChangeText={formik.handleChange("password")}
      />
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
