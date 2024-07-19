import axios from "axios";

const API_BASE_URL = "http://[::1]:3000/api/main/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
