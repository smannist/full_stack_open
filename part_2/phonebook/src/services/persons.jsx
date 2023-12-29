import axios from "axios";

const getAll = () => {
  const request = axios.get(import.meta.env.VITE_PERSONS_SERVICE_URL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(
    import.meta.env.VITE_PERSONS_SERVICE_URL,
    newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(
    `${import.meta.env.VITE_PERSONS_SERVICE_URL}/${id}`,
    newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update };
