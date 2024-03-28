import { Routes, Route, useMatch } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UserContext from "./context/UserContext";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import Header from "./components/Header";
import UserDetailed from "./components/UserDetailed";
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
  const detailedUser =
    userMatch && users.data
      ? users.data.find((foundUser) => foundUser.id === userMatch.params.id)
      : null;

  if (blogs.isLoading || users.isLoading) {
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
        <Route path="/" element={<Blogs user={user} blogs={blogs.data} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/users/:id"
          element={<UserDetailed user={detailedUser} />}
        />
      </Routes>
    </div>
  );
};

export default App;
