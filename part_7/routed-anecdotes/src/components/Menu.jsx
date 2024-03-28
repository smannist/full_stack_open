import { Link } from "react-router-dom";

const Menu = ({ user }) => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
      <p>Logged in as {user.username}</p>
    </div>
  );
};

export default Menu;
