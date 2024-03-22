import { useField } from "../hooks";

const AnecdoteForm = ({ addNew }) => {
  const content = useField("content");
  const author = useField("author");
  const info = useField("info");

  const handleSubmit = (event) => {
    event.preventDefault();

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

  };

  const handleReset = () => {
    content.onReset();
    author.onReset();
    info.onReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
