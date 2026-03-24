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

  create: async (quoteData) => {
    const response = await api.post("/quotes", quoteData);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/quotes/${id}`);
    return response.data;
  },

  update: async (id, quoteData) => {
    const response = await api.put(`/quotes/${id}`, quoteData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/quotes/${id}`);
  },

  extract: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/quotes/extract", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};