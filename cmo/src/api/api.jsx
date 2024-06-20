import axios from "axios";

const URL_Servidor = "http://localhost:5000";

const api = axios.create({
  baseURL: URL_Servidor,
});

export default api;
