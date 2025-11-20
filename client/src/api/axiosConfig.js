import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const api = axios.create({
  baseURL: `${BACKEND}/api`,
  timeout: 120000,
});

export default api;
