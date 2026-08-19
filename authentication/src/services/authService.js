import api from "./api";

export const registerUser = (data) => {
  return api.post("/auth", data);
};

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};