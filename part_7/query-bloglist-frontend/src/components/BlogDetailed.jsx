import {
  handleNotification,
  useNotificationDispatch,
} from "../context/NotificationContext";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../queryClient";
import blogService from "../services/blogs";

const BlogDetailed = ({ blog, user }) => {
  const notificationDispatch = useNotificationDispatch();

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

  if (!blog || !user) {
    return null;
  }

  const isOwner = user.username === blog.user.username;

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <br></br>
      <strong>Url:</strong> {blog.url}
      <br></br>
      <strong>Likes:</strong> {blog.likes}{" "}
      <button className="like-button" onClick={() => addLike(blog)}>
        Like
      </button>
      <br></br>
      <strong>Added by:</strong> {blog.user.username}
      <br></br>
      {isOwner && (
        <button data-testid="remove-button" onClick={removeBlog}>
          Remove
        </button>
      )}
    </div>
  );
};

export default BlogDetailed;
