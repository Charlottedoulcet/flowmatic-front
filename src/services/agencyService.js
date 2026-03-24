import { api } from "./api";

export const agencyService = {
  getAgency: async () => {
    const response = await api.get("/agency");
    return response.data;
  },
};