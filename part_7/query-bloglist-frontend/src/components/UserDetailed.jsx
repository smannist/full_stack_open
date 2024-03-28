import React from "react";

const UserDetailed = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto bg-yellow-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">{user.username}</h2>
      <p className="mb-2">
        <strong>Added blogs</strong>
      </p>
      <ul className="list-disc pl-5">
        {user.blogs.map((blog, index) => (
          <li key={index} className="mb-1">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetailed;
