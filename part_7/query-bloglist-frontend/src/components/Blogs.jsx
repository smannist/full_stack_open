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

  const likeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const removeMutation = useMutation({
    mutationFn: blogService.remove,
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

  const removeBlog = async (blogObject) => {
    try {
      const confirmation = window.confirm(
        `Remove blog ${blogObject.title} by ${blogObject.author}?`
      );
      if (confirmation) {
        removeMutation.mutate(blogObject.id);
        handleNotification(
          notificationDispatch,
          `Blog "${blogObject.title}" removed!`,
          "notification-success"
        );
      }
    } catch (exception) {
      handleNotification(
        notificationDispatch,
        `An error occured during deletion: ${exception}`,
        "notification-failure"
      );
    }
  };

  const addLike = async (blog) => {
    likeMutation.mutate(blog);
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
