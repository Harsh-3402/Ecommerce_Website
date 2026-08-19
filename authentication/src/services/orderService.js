import api from "./api";

// Create Order
export const createOrder = (orderData) => {
  return api.post("/orders", orderData);
};

// Get My Orders
export const getMyOrders = () => {
  return api.get("/orders");
};

// Get Single Order
export const getOrderById = (id) => {
  return api.get(`/orders/${id}`);
};

// Cancel Order
export const cancelOrder = (id) => {
  return api.put(`/orders/${id}/cancel`);
};