import "./App.css";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Incorrect credentials!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  if (user === null) {
    return (
      <div>
        <h1>Login to application</h1>
        <LoginForm
          handleLogin={handleLogin}
          setUsername={handleUsernameChange}
          setPassword={handlePasswordChange}
          username={username}
          password={password}
        />
        <Notification message={errorMessage} />
      </div>
    );
  }

  return (
    <div>
      <p>Logged in as {user.username}</p>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

};

export default App;
