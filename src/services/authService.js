import { api } from "./api";

export const authService = {
  login: async ({ email, password }) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (registerData) => {
    const response = await api.post("/auth/register", registerData);
    return response.data;
  },
};  