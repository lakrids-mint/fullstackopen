import axios from "axios";

const baseUrl = "http://localhost:3002/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log("from service:", response.data);

  return response.data;
};
const createNew = async content => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const upVote = async newObject => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  console.log("from service:", response.data);
  return response.data;
};
export default { getAll, createNew, upVote };
