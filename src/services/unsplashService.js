import { api } from "./api";

export const unsplashService = {
  search: async (query) => {
    const { data } = await api.get("/images/search", { params: { query } });
    return data;
  },
};
