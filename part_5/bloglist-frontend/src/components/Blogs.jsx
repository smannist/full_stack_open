import Blog from "./Blog";

const Blogs = ({ blogs, addLike, removeBlog, user }) => (
  <>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} addLike={() => addLike(blog)} removeBlog={() => removeBlog(blog)} user={user}/>
    ))}
  </>
);

export default Blogs;
