import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.DEV
        ? "http://localhost:5000/api"
        : "https://ecommerce-website-1-v1l9.onrender.com/api",

    withCredentials: true,
});

export default api;