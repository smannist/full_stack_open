import Blog from "./Blog";

const Blogs = ({ blogs, addLike }) => (
  <>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} addLike={() => addLike(blog)} />
    ))}
  </>
);

export default Blogs;
