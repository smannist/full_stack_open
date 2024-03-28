import React from "react";
import User from "./User";

const Users = ({ users }) => {
  return (
    <div className="max-w-md mx-auto bg-yellow-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2">
              <strong>Username</strong>
            </th>
            <th className="border border-black px-4 py-2">
              <strong># of blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((user) => (
            <tr key={user.id}>
              <User user={user} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
