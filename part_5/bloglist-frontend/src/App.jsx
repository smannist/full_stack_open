import "./App.css";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlogForm from "./components/CreateBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem("loggedUser");
      window.location.reload();
    } catch (exception) {
      setErrorMessage(exception);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

  };

  const handleCreate = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    blogService.create(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
    window.location.reload();
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
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
      <button onClick={handleLogout}>Logout</button>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <CreateBlogForm
        handleCreate={handleCreate}
        setTitle={handleTitleChange}
        setUrl={handleUrlChange}
        setAuthor={handleAuthorChange}
        title={title}
        author={author}
        url={url}
      />
    </div>
  );
};

export default App;
