import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useUserDispatch } from "../context/UserContext";
import {
  handleNotification,
  useNotificationDispatch,
} from "../context/NotificationContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const loginUser = (event) => {
    event.preventDefault();
    login(username, password);
    setUsername("");
    setPassword("");
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: "LOGIN", payload: user });
    } catch (exception) {
      handleNotification(
        notificationDispatch,
        "Incorrect login credentials",
        "notification-failure"
      );
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className=" bg-yellow-400 p-4 rounded-lg shadow-md max-w-md">
      <form data-testid="login-form" onSubmit={loginUser}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-black"
          >
            Username
          </label>
          <input
            data-testid="username"
            type="text"
            value={username}
            id="username"
            name="Username"
            onChange={handleUsernameChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black"
          >
            Password
          </label>
          <input
            data-testid="password"
            type="password"
            value={password}
            id="password"
            name="Password"
            autoComplete="on"
            onChange={handlePasswordChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 border border-black hover:bg-yellow-600 text-black py-2 px-4 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
