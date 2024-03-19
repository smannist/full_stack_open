import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (anecdote) => {
  const asObject = {
    content: anecdote,
    votes: 0,
  };

  const response = await axios.post(baseUrl, asObject);

  return response.data;
};

const addVote = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);

  const anecdoteToUpdate = request.data;

  const updatedAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1,
  };

  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);

  return response.data;
};

export default { getAll, createNew, addVote };
