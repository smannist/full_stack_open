import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNotificationDispatch } from "./context/NotificationContext";
import UserContext from "./context/UserContext";
import queryClient from "./queryClient";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import Header from "./components/Header";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [user, userDispatch] = useContext(UserContext);
  const notificationDispatch = useNotificationDispatch();
  const createBlogRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  const blogs = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const likeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const removeMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

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
      userDispatch({ type: "LOGIN", payload: user });
    } catch (exception) {
      handleNotification("Incorrect login credentials", "notification-failure");
    }
  };

  const createBlog = async (blogObject) => {
    createBlogRef.current.toggleVisibility();
    newBlogMutation.mutate(blogObject);
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
        removeMutation.mutate(blogObject.id);
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
    likeMutation.mutate(blog);
  };

  const handleNotification = (message, className) => {
    notificationDispatch({
      type: "SHOW",
      payload: {
        message: message,
        className: className,
      },
    });
    setTimeout(() => {
      notificationDispatch({ type: "HIDE" });
    }, 5000);
  };

  if (blogs.isLoading) {
    return <div>Loading data...</div>;
  }

  if (user === null) {
    return (
      <div>
        <h1>Login to application</h1>
        <Notification />
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <Header user={user} logout={logout} />
      <Routes>
        <Route
          path="/"
          element={
            <Blogs
              user={user}
              blogs={blogs.data}
              addLike={addLike}
              removeBlog={removeBlog}
              logout={logout}
              createBlogRef={createBlogRef}
              createBlog={createBlog}
            />
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;
