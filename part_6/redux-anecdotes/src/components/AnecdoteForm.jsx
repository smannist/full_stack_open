import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes"

import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const newAnecdote = await anecdoteService.createNew(content);

    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`"${newAnecdote.content}" created!`));

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
