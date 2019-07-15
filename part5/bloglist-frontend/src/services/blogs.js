import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  console.log(token);
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const deleteBlog = async id => {
  console.log("blogsrvice:", id);
  await axios.delete(`${baseUrl}/${id}`);
  console.log("item deleted");
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };
  console.log(config);
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};
export default { getAll, create, setToken, deleteBlog };
