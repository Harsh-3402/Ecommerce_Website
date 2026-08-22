import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-website-ara9.onrender.com/api",
  withCredentials: true, // Include cookies in requests
});

export default api;