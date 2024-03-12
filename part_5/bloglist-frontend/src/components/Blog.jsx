import "../App.css";
import React, { useState } from "react";

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibilityChange = () => {
    setVisible(!visible);
  };

  const isOwner = user.username === blog.user.username;

  if (visible) {
    return (
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={handleVisibilityChange}>Hide</button>
        <br></br>
        <strong>Url:</strong> {blog.url}
        <br></br>
        <strong>Likes:</strong> {blog.likes} <button onClick={() => addLike(blog)}>Like</button>
        <br></br>
        <strong>Added by:</strong> {blog.user.username}
        <br></br>
        {isOwner && <button onClick={removeBlog}>Remove</button>}
      </div>
    );
  }

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={handleVisibilityChange}>View</button>
    </div>
  );
};

export default Blog;
