import React from "react";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";

const Users = () => {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (usersQuery.isLoading) {
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
        {usersQuery.data.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
