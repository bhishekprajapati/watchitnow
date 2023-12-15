const config = {
  key: process.env.TMDB_API_KEY,
  token: process.env.TMDB_READ_ACCESS_TOKEN,
  baseUrl: "https://api.themoviedb.org",
  version: 3,
};

export const TvSeries = {
  async getGenres() {
    const url = `${config.baseUrl}/3/genre/tv/list?api_key=${config.key}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await res.json();
    return data;
  },
};
