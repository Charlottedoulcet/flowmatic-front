import { api } from "./api";

export const userService = {
  getAll: async () => {
    const { data } = await api.get("/users");
    return data;
  },

  create: async (userData) => {
    const { data } = await api.post("/users", userData);
    return data;
  },

  update: async (id, userData) => {
    const { data } = await api.put(`/users/${id}`, userData);
    return data;
  },

  delete: async (id) => {
    await api.delete(`/users/${id}`);
  },
};