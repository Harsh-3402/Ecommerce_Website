import api from "./api";

export const addToCart = (data) =>  api.post("/cart", data);
export const getCart = () => api.get("/cart");
export const updateCart = (id, data) => api.put(`/cart/${id}`, data);
export const deleteCart = (id) => api.delete(`/cart/${id}`);
