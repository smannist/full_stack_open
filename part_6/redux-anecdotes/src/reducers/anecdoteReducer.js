import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateVotes(state, action) {
      return state.map((anecdote) =>
        action.payload.id !== anecdote.id ? anecdote : action.payload
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.addVote(id);
    dispatch(updateVotes(votedAnecdote));
  };
};

export const { appendAnecdote, setAnecdotes, updateVotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
