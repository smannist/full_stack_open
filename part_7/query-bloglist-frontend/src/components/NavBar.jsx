import { Link } from "react-router-dom";
import {
  handleNotification,
  useNotificationDispatch,
} from "../context/NotificationContext";

const NavBar = ({ user }) => {
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
    <div className="flex justify-between items-center bg-blue-300 w-full p-2">
      <div>
        <Link
          className="border border-black bg-yellow-400 hover:bg-yellow-500 rounded px-4 py-2 mr-5 inline-block"
          to="/"
        >
          Blogs
        </Link>
        <Link
          className="border border-black bg-yellow-400 hover:bg-yellow-500 rounded px-4 py-2 mr-5 inline-block"
          to="/users"
        >
          Users
        </Link>
      </div>
      <div>
        <p className="mr-5 inline-block">Logged in as {user.username}</p>
        <button
          className="border border-black bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
