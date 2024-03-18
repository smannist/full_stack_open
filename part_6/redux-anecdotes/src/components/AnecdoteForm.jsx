import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    dispatch(setNotification(`"${content}" created!`));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <form onSubmit={addAnecdote}>
        <h2>create new</h2>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
