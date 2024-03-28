import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import blogService from "../services/blogs";
import queryClient from "../queryClient";

const CommentBox = ({ blog }) => {
  const [comment, setComment] = useState("");

  const commentMutation = useMutation({
    mutationFn: blogService.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const addComment = async (event) => {
    event.preventDefault();
    commentMutation.mutate({ id: blog.id, comment: comment });
    setComment("");
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  if (blog.comments.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-5 bg-yellow-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h4 className="text-lg font-bold mb-2">Comments</h4>
        <p>This blog doesn't have any comments yet.</p>
        <form onSubmit={addComment} className="mt-4">
          <input
            type="text"
            name="Comment"
            value={comment}
            onChange={handleCommentChange}
          ></input>
          <button
            type="submit"
            className="mt-2 border border-black bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add comment
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-yellow-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h4 className="text-lg font-bold mb-2">Comments</h4>
      <ul className="mb-5">
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={addComment} className="mb-4">
        <input
          type="text"
          name="Comment"
          value={comment}
          onChange={handleCommentChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></input>
        <button
          type="submit"
          className="mt-2 border border-black bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add comment
        </button>
      </form>
    </div>
  );
};

export default CommentBox;
