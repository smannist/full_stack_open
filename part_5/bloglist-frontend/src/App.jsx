import "./App.css";
import { useState, useEffect, useRef, createElement } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createBlogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      handleNotification(`Incorrect login credentials`, "notification-failure");
    }
  
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem("loggedUser");
      window.location.reload();
    } catch (exception) {
      handleNotification(
        `An error occured: ${exception}`,
        "notification-failure"
      );
    }

  };

  const createBlog = async (blogObject) => {
    createBlogRef.current.toggleVisibility();

    await blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });

    handleNotification(
      `New blog "${blogObject.title}" added!`,
      "notification-success"
    );
  };

  const handleNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 5000);
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
        <Notification
          type={notificationType}
          message={notificationMessage}
        />
        <LoginForm
          handleLogin={handleLogin}
          setUsername={handleUsernameChange}
          setPassword={handlePasswordChange}
          username={username}
          password={password}
        />
      </div>
    );
  }

  return (
    <div>
      <p>Logged in as {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
      <h2>Blogs</h2>
      <Notification
        type={notificationType}
        message={notificationMessage}
      />
      <Blogs blogs={blogs} />
      <Togglable buttonLabel="new blog" ref={createBlogRef}>
        <CreateBlogForm createBlog={createBlog} />
      </Togglable>
    </div>
  );
};

export default App;
