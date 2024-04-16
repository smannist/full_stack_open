import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import Loading from "./Loading";

const Books = () => {
  const [genre, setGenre] = useState("");
  const { loading, data } = useQuery(ALL_BOOKS);

  if (loading) {
    return <Loading />;
  }

  const genres = new Set(
    data.allBooks.flatMap((book) => book.genres));

  const filterByGenre = genre
    ? data.allBooks.filter((book) => book.genres.includes(genre))
    : data.allBooks;

  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filterByGenre.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div>
        Genre:{" "}
        <select onChange={({ target }) => setGenre(target.value)}>
          <option value="">All</option>
          {[...genres].map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Books;
