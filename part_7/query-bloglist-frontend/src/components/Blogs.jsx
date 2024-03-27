import React from "react";
import Blog from "./Blog";
import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";

const Blogs = ({
  blogs,
  addLike,
  removeBlog,
  user,
  createBlogRef,
  createBlog,
}) => (
  <>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        addLike={() => addLike(blog)}
        removeBlog={() => removeBlog(blog)}
        user={user}
      />
    ))}
    <Togglable buttonLabel="new blog" ref={createBlogRef}>
      <CreateBlogForm createBlog={createBlog} />
    </Togglable>
  </>
);

export default Blogs;
