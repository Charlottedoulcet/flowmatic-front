const UNSPLASH_API_URL = "https://api.unsplash.com";

export const unsplashService = {
  search: async (query, perPage = 6) => {
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape&content_filter=high`,
      {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
      }
    );
    if (!response.ok) throw new Error("Erreur Unsplash API");
    const data = await response.json();
    return data.results.map((p) => ({
      id: p.id,
      url: p.urls.regular,
      thumb: p.urls.small,
      photographer: p.user.name,
      photographerUrl: `${p.user.links.html}?utm_source=flowmatic&utm_medium=referral`,
    }));
  },
};
