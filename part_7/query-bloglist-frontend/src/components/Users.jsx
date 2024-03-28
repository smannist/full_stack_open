import React from "react";
import User from "./User";

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>
              <strong>Username</strong>
            </td>
            <td>
              <strong># of blogs created</strong>
            </td>
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
