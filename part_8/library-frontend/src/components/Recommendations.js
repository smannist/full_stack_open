import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import Loading from "./Loading";

const Recommendations = () => {
  const { loading: allBooksLoading, data: books } = useQuery(ALL_BOOKS);
  const { loading: userLoading, data: user } = useQuery(ME);

  if (allBooksLoading || userLoading) {
    return <Loading />;
  }

  const filterByGenre = books.allBooks.filter(
    (book) => book.genres.includes(user.me.favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{user.me.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterByGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
