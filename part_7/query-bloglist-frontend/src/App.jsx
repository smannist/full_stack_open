import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UserContext from "./context/UserContext";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import Header from "./components/Header";
import blogService from "./services/blogs";

const App = () => {
  const [user, userDispatch] = useContext(UserContext);
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

  if (blogs.isLoading) {
    return <div>Loading data...</div>;
  }

  if (user === null) {
    return (
      <div>
        <h1>Login to application</h1>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <Header user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <Blogs
              user={user}
              blogs={blogs.data}
              createBlogRef={createBlogRef}
            />
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;
