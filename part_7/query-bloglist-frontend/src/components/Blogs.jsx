import {
  handleNotification,
  useNotificationDispatch,
} from "../context/NotificationContext";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import Blog from "./Blog";
import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";
import queryClient from "../queryClient";
import blogService from "../services/blogs";

const Blogs = ({ blogs, user }) => {
  const createBlogRef = useRef();
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
      notificationDispatch,
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
          user={user}
        />
      ))}
      <Togglable buttonLabel="New blog" ref={createBlogRef}>
        <CreateBlogForm createBlog={createBlog} />
      </Togglable>
    </>
  );
};

export default Blogs;
