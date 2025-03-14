import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5005/api", //url api
});

export default api;