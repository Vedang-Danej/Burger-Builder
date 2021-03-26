import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-a9ff8-default-rtdb.firebaseio.com/",
});

export default instance;
