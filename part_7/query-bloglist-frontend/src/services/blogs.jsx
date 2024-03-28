import axios from "axios";

let token = null;
const baseUrl = "/api/blogs";

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (blog) => {
  const config = { headers: { Authorization: token } };
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };
  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    updatedBlog,
    config
  );
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const createComment = async ({ id, comment }) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config);
  return response.data;
};

export default { getAll, setToken, create, update, remove, createComment };
