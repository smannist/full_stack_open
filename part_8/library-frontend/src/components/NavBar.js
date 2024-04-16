import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate("/");
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>Authors</button>
      <button onClick={() => navigate("/books")}>Books</button>
      {token ? (
        <>
          <button onClick={() => navigate("/add")}>Add Book</button>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </div>
  );
};

export default NavBar;
