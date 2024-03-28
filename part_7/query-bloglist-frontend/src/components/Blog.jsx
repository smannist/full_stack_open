import "../App.css";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const style = {
    marginTop: "5px",
  };

  return (
    <div style={style} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  );
};

export default Blog;
