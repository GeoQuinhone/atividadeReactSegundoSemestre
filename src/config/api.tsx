import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;