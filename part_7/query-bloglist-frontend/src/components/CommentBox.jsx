const CommentBox = ({ blog }) => {
  if (!blog.comments) {
    return (
      <div>
        <h4>Comments</h4>
        <p>This blog doesn't have any comments yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h4>Comments</h4>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentBox;
