const PEXELS_API_URL = "https://api.pexels.com/v1";

export const pexelsService = {
  search: async (query, perPage = 3) => {
    const response = await fetch(
      `${PEXELS_API_URL}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
      {
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      }
    );
    if (!response.ok) throw new Error("Erreur Pexels API");
    const data = await response.json();
    return data.photos.map((p) => ({
      id: p.id,
      url: p.src.large,
      thumb: p.src.medium,
      photographer: p.photographer,
    }));
  },
};