import { Link } from "react-router-dom";
import {
  handleNotification,
  useNotificationDispatch,
} from "../context/NotificationContext";

const NavBar = ({ user }) => {
  const notificationDispatch = useNotificationDispatch();

  const containerStyle = {
    backgroundColor: "lightblue",
    width: "100%",
    padding: "5px",
  };

  const padding = {
    paddingRight: "5px",
    display: "inline-block",
  };

  const logout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedUser");
      window.location.reload();
    } catch (exception) {
      handleNotification(
        notificationDispatch,
        `An error occured: ${exception}`,
        "notification-failure"
      );
    }
  };

  return (
    <div style={containerStyle}>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      <p style={padding}>Logged in as {user.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default NavBar;
