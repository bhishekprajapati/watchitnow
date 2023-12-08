import { formatMovieData, formatResults } from "@/services/formatters";

import { MovieDb } from "moviedb-promise";

export const moviedb = new MovieDb(process.env.TMDB_API_KEY);

export async function getTrendingMedia(
  options = {
    mediaType: "all",
    timeWindow: "day",
  }
) {
  const res = await moviedb.trending({
    media_type: options.mediaType,
    time_window: options.timeWindow,
  });

  return {
    data: formatResults(res.results),
    meta: {
      page: res.page,
      totalPages: res.total_pages,
      totalResults: res.total_results,
    },
  };
}

export async function getNowPlayingMovies(
  params = { language: "en", page: 1 }
) {
  const res = await moviedb.movieNowPlaying(params);

  return {
    data: res.results?.map((movie) => formatMovieData(movie)),
    meta: {
      page: res.page,
      totalPages: res.total_pages,
      totalResults: res.total_results,
    },
  };
}

export async function getTopRatedMovies(params = { language: "en", page: 1 }) {
  const res = await moviedb.movieTopRated(params);

  return {
    data: res.results?.map((movie) => formatMovieData(movie)),
    meta: {
      page: res.page,
      totalPages: res.total_pages,
      totalResults: res.total_results,
    },
  };
}

export async function getUpcomingMovies(params = { language: "en", page: 1 }) {
  const res = await moviedb.upcomingMovies(params);

  return {
    data: res.results?.map((movie) => formatMovieData(movie)),
    meta: {
      page: res.page,
      totalPages: res.total_pages,
      totalResults: res.total_results,
    },
  };
}
