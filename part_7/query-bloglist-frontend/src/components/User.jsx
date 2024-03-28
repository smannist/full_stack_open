import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <>
      <td className="border border-black px-4 py-2">
        <Link className="text-black hover:underline" to={`/users/${user.id}`}>
          {user.username}
        </Link>
      </td>
      <td className="border border-black px-4 py-2">{user.blogs.length}</td>
    </>
  );
};

export default User;
