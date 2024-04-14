import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")}>Authors</button>
      <button onClick={() => navigate("/books")}>Books</button>
      <button onClick={() => navigate("/add")}>Add Book</button>
    </div>
  );
};

export default NavBar;
