import {
  useNotificationDispatch,
  handleNotification,
} from "../context/NotificationContext";
import { useMutation } from "@tanstack/react-query";
import Blog from "./Blog";
import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";
import queryClient from "../queryClient";
import blogService from "../services/blogs";

const Blogs = ({ blogs, addLike, removeBlog, user, createBlogRef }) => {
  const notificationDispatch = useNotificationDispatch();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const createBlog = async (blogObject) => {
    createBlogRef.current.toggleVisibility();
    newBlogMutation.mutate(blogObject);
    handleNotification(
      `New blog "${blogObject.title}" added!`,
      "notification-success"
    );
  };

  return (
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
};

export default Blogs;
