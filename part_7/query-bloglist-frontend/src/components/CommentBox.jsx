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

  if (!blog.comments) {
    return (
      <div>
        <h4>Comments</h4>
        <p>This blog doesn't have any comments yet.</p>
        <form onSubmit={addComment}>
          <input
            type="text"
            name="Comment"
            value={comment}
            onChange={handleCommentChange}
          ></input>
          <button type="submit">Add comment</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h4>Comments</h4>
      <form onSubmit={addComment}>
        <input
          type="text"
          name="Comment"
          value={comment}
          onChange={handleCommentChange}
        ></input>
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentBox;
