import "./App.css";
import { useState, useEffect, useRef } from "react";
import { useNotificationDispatch } from "./context/NotificationContext";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const notificationDispatch = useNotificationDispatch();
  const createBlogRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

  }, []);

  const logout = async (event) => {
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

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      handleNotification("Incorrect login credentials", "notification-failure");
    }
  };

  const createBlog = async (blogObject) => {
    createBlogRef.current.toggleVisibility();

    const newBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(newBlog));

    const updatedBlogs = await blogService.getAll();
    setBlogs(updatedBlogs);

    handleNotification(
      `New blog "${blogObject.title}" added!`,
      "notification-success"
    );
  };

  const removeBlog = async (blogObject) => {
    try {
      const confirmation = window.confirm(
        `Remove blog ${blogObject.title} by ${blogObject.author}?`
      );

      if (confirmation) {
        await blogService.remove(blogObject.id);
        setBlogs(
          blogs.filter((removedBlog) => removedBlog.id !== blogObject.id)
        );
        handleNotification(
          `Blog "${blogObject.title}" removed!`,
          "notification-success"
        );
      }

    } catch (exception) {
      handleNotification(
        `An error occured during deletion: ${exception}`,
        "notification-failure"
      );
    }
  };

  const addLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      await blogService.update(blog.id, updatedBlog);
      const updatedBlogs = blogs.map((blogItem) =>
        blogItem.id === blog.id ? updatedBlog : blogItem
      );
      setBlogs(updatedBlogs);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleNotification = (message, className) => {
    notificationDispatch({
      type: "SHOW",
      payload: {
        message: message,
        className: className
      }
    });
    setTimeout(() => {
      notificationDispatch({ type: "HIDE" });
    }, 5000);
  };

  if (user === null) {
    return (
      <div>
        <h1>Login to application</h1>
        <Notification/>
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <p>Logged in as {user.username}</p>
      <button onClick={logout}>Logout</button>
      <h2>Blogs</h2>
      <Notification/>
      <Blogs
        blogs={blogs.sort((a, b) => b.likes - a.likes)}
        addLike={addLike}
        removeBlog={removeBlog}
        user={user}
      />
      <Togglable buttonLabel="new blog" ref={createBlogRef}>
        <CreateBlogForm createBlog={createBlog} />
      </Togglable>
    </div>
  );
};

export default App;
