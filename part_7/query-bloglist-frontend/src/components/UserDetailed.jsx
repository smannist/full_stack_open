const UserDetailed = ({ user }) => {
  if (!user || !user.blogs) {
    return null;
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <strong>Added blogs</strong>
      </p>
      <ul>
        {user.blogs.map((blog, index) => (
          <li key={index}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetailed;
