import { formatResults, formatMovieData, formatTvData } from "./formatters";

const config = {
  key: process.env.TMDB_API_KEY,
  token: process.env.TMDB_READ_ACCESS_TOKEN,
  baseUrl: "https://api.themoviedb.org",
  version: 3,
};

function transformResponse(data, meta) {
  return { data, meta };
}

export async function getTrending(params = { by: "day" }) {
  try {
    const url = `${config.baseUrl}/3/trending/all/${params.by}?api_key=${config.key}`;
    const res = await fetch(url);

    if (!res.ok) {
      return { error: res.statusText };
    }

    const { page, results, total_pages, total_results } = await res.json();
    return transformResponse(formatResults(results), {
      page,
      total_pages,
      total_results,
    });
  } catch (err) {
    return { error: "Something went wrong!" };
  }
}

export async function search({ slug }) {
  try {
    const url = `${config.baseUrl}/3/search/multi?api_key=${
      config.key
    }&query=${encodeURIComponent(slug)}`;
    const res = await fetch(url);

    if (!res.ok) {
      return { error: res.statusText };
    }

    const { page, results, total_pages, total_results } = await res.json();
    return transformResponse(formatResults(results), {
      page,
      total_pages,
      total_results,
    });
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
}

export async function findMovie(id) {
  try {
    const url = `${config.baseUrl}/3/movie/${id}?api_key=${config.key}`;
    const res = await fetch(url);

    if (!res.ok) {
      return { status: res.status, error: res.statusText };
    }

    return { status: 200, data: formatMovieData(await res.json()) };
  } catch (err) {
    return { status: 500, error: "Something went wrong!" };
  }
}

export async function findTvSeries(id) {
  try {
    const url = `${config.baseUrl}/3/tv/${id}?api_key=${config.key}`;
    const res = await fetch(url);

    if (!res.ok) {
      return { status: res.status, error: res.statusText };
    }

    return { status: 200, data: formatTvData(await res.json()) };
  } catch (err) {
    return { status: 500, error: "Something went wrong!" };
  }
}

async function execFetch(url, ...args) {
  const res = await fetch(url, ...args);
  if (!res.ok) {
    throw new Error("Something went wrong!");
  }
  const data = await res.json();
  return data;
}

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
