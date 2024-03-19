import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data);

export const addVote = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  const anecdoteToUpdate = request.data;
  const updatedAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1,
  };
  await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
};
