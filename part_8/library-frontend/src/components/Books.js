import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import Loading from "./Loading";

const Books = () => {
  const { loading, data } = useQuery(ALL_BOOKS);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
