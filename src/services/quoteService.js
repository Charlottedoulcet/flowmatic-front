import { api } from "./api"

export const quoteService = {
  getAll: async () => {
    const response = await api.get("/quotes");
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/quotes/${id}/status`, { status });
    return response.data
  },
};