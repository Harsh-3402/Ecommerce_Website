import api from "./api";

export const getProducts = (page = 1, limit = 5) =>
    api.get(`/products?page=${page}&limit=${limit}`);

export const getProductById = (id) => api.get(`/products/${id}`);

export const createProduct = (data) => api.post("/products", data);

export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/products/${id}`);