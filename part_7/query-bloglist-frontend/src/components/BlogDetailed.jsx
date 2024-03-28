import {
  handleNotification,
  useNotificationDispatch,
} from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../queryClient";
import blogService from "../services/blogs";
import CommentBox from "./CommentBox";

const BlogDetailed = ({ blog, user }) => {
  const notificationDispatch = useNotificationDispatch();
  const navigate = useNavigate();

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

  const removeBlog = async () => {
    try {
      const confirmation = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}?`
      );
      if (confirmation) {
        removeMutation.mutate(blog.id);
        handleNotification(
          notificationDispatch,
          `Blog "${blog.title}" removed!`,
          "notification-success"
        );
        navigate("/");
      }
    } catch (exception) {
      handleNotification(
        notificationDispatch,
        `An error occurred during deletion: ${exception}`,
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
    <div className="max-w-md mx-auto bg-yellow-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">{blog.title}</h2>
      <p>
        <strong>Author:</strong> {blog.author}
      </p>
      <p>
        <strong>Url:</strong> {blog.url}
      </p>
      <p>
        <strong>Likes:</strong> {blog.likes}
        <button
          className="ml-5 border border-black bg-yellow-500 hover:bg-yellow-600 text-black py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={() => addLike(blog)}
        >
          Like
        </button>
      </p>
      <p>
        <strong>Added by:</strong> {blog.user.username}
      </p>
      {isOwner && (
        <button
          className="mt-4 border border-black bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          data-testid="remove-button"
          onClick={removeBlog}
        >
          Remove
        </button>
      )}
      <CommentBox blog={blog} />
    </div>
  );
};

export default BlogDetailed;
