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
    <div>
      <h2>Login</h2>
      <form data-testid="login-form" onSubmit={loginUser}>
        <div className="login-form">
          Username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div className="login-form">
          Password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            autoComplete="on"
            onChange={handlePasswordChange}
          />
        </div>
        <br></br>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
