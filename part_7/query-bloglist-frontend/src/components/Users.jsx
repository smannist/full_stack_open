import React from "react";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import User from "./User";

const Users = () => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (users.isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <table>
      <thead>
        <h2>Users</h2>
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
  );
};

export default Users;
