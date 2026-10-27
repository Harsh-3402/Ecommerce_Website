import axios from "axios";

const api = axios.create({
  baseURL:  "https://shopnest-dre5.onrender.com/api", // "https://ecommerce-website-ara9.onrender.com/api" ||
  withCredentials: true, // Include cookies in requests
});

export default api;