import { StyleSheet } from "react-native";
import theme from "./theme";

export const formStyle = StyleSheet.create({
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
