import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import { SignInContainer } from "../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const initialValues = { username: "obiwan", password: "kenobi" };

      const onSubmit = jest.fn();
      const handleChange = jest.fn();
      const handleSubmit = jest.fn(() => {
        onSubmit(formik.values);
      });

      const formik = {
        values: initialValues,
        touched: {},
        errors: {},
        handleSubmit: handleSubmit,
        handleChange: handleChange,
      };

      render(<SignInContainer formik={formik} />);

      fireEvent.changeText(screen.getByPlaceholderText("Username"), "obiwan");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "kenobi");
      fireEvent.press(screen.getByText("Sign in"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "obiwan",
          password: "kenobi",
        });
      });
    });
  });
});
