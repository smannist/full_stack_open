import "../App.css";
import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibilityChange = () => {
    setVisible(!visible);
  };

  if (visible) {
    return (
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={handleVisibilityChange}>Hide</button>
        <br></br>
        <strong>Url:</strong> {blog.url}
        <br></br>
        <strong>Likes:</strong> {blog.likes} <button>Like</button>
        <br></br>
        <strong>Added by:</strong> {blog.user.username}
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
