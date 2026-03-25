import { api } from "./api";

export const agencyService = {
  getAgency: async () => {
    const response = await api.get("/agency");
    return response.data;
  },

  updateAgency: async (payload) => {
    const { data } = await api.put("/agency", payload);
    return data;
  }
}