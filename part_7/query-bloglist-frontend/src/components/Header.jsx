const Header = ({ user, logout }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <p>Logged in as {user.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Header;
