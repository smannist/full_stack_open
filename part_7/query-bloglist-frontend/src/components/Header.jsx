import {
  handleNotification,
  useNotificationDispatch,
} from "../context/NotificationContext";

const Header = ({ user }) => {
  const notificationDispatch = useNotificationDispatch();

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
    <div>
      <h1>Blogs</h1>
      <p>Logged in as {user.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Header;
