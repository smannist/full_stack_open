import "../App.css";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div className="flex justify-center mt-5">
      <div className="container mx-auto max-w-lg bg-yellow-400 hover:bg-yellow-500 p-4 rounded-lg shadow-lg text-center">
        <div className="blog">
          <Link to={`/blogs/${blog.id}`} className="text-black">{blog.title}</Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
