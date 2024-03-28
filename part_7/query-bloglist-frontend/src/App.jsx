import { Routes, Route, useMatch } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UserContext from "./context/UserContext";
import logo from "./static/blogs.png";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import UserDetailed from "./components/UserDetailed";
import BlogDetailed from "./components/BlogDetailed";
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
  const [user, userDispatch] = useContext(UserContext);

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

  const users = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const userMatch = useMatch("/users/:id");
  const singleUser =
    userMatch && users.data
      ? users.data.find((foundUser) => foundUser.id === userMatch.params.id)
      : null;

  const blogMatch = useMatch("/blogs/:id");
  const singleBlog =
    blogMatch && blogs.data
      ? blogs.data.find((foundBlog) => foundBlog.id === blogMatch.params.id)
      : null;

  if (blogs.isLoading || users.isLoading) {
    return <div>Loading data...</div>;
  }

  if (user === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={logo} alt="Blogs Logo" className="h-20" />
        <h1 className="text-3xl font-bold mb-4">Login to Application</h1>
        <LoginForm />
        <Notification />
      </div>
    );
  }

  return (
    <div>
      <NavBar user={user} />
      <Header />
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs user={user} blogs={blogs.data} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserDetailed user={singleUser} />} />
        <Route
          path="/blogs/:id"
          element={<BlogDetailed blog={singleBlog} user={user} />}
        />
      </Routes>
    </div>
  );
};

export default App;
