import axios from "axios";

const getTasks = async () => {
  const response = await axios.get("http://localhost:3000/boards");
  return response.data;
};

export default getTasks;
