import React from "react";
import logo from "../static/blogs.png";

const Header = () => {
  return (
    <div className="py-4 px-6 flex justify-center">
      <img src={logo} alt="Blogs Logo" className="h-20" />
    </div>
  );
};

export default Header;
