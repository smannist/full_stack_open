const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="login-form">
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={setUsername}
          />
        </div>
        <div className="login-form">
          Password
          <input
            type="password"
            value={password}
            name="Password"
            autoComplete="on"
            onChange={setPassword}
          />
        </div>
        <br></br>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
