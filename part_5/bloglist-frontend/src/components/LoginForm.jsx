import { useState } from "react";

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (event) => {
    event.preventDefault();
    login(username, password);
    setUsername("");
    setPassword("");
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
      <form onSubmit={loginUser}>
        <div className="login-form">
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div className="login-form">
          Password
          <input
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
