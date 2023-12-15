"use server";

import {
  formatMovieData,
  formatResults,
  formatTvData,
} from "@/services/formatters";

import { moviedb } from "./db";
import { retry } from "@/utils";

export async function getTrendingMedia(
  params = {
    media_type: "all",
    time_window: "day",
  }
) {
  const res = await moviedb.trending(params);

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

export async function getAiringTodayTv(params = { language: "en", page: 1 }) {
  const res = await moviedb.tvAiringToday(params);

  return {
    data: res.results?.map((tv) => formatTvData(tv)),
    meta: {
      page: res.page,
      totalPages: res.total_pages,
      totalResults: res.total_results,
    },
  };
}

export async function getOnTheAirTv(params = { language: "en", page: 1 }) {
  const res = await moviedb.tvOnTheAir(params);

  return {
    data: res.results?.map((tv) => formatTvData(tv)),
    meta: {
      page: res.page,
      totalPages: res.total_pages,
      totalResults: res.total_results,
    },
  };
}

export async function getTopRatedTv(params = { language: "en", page: 1 }) {
  const res = await moviedb.tvTopRated(params);

  return {
    data: res.results?.map((tv) => formatTvData(tv)),
    meta: {
      page: res.page,
      totalPages: res.total_pages,
      totalResults: res.total_results,
    },
  };
}

export async function findMedia({ type = "movie", id }) {
  const fetcher = (type === "movie" ? moviedb.movieInfo : moviedb.tvInfo).bind(
    moviedb
  );
  const formatter = type === "movie" ? formatMovieData : formatTvData;
  const res = await fetcher({ id });
  return {
    data: formatter(res),
  };
}

export async function getImdbRating(id) {
  const res = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`
  );
  const { imdbRating } = await res.json();
  return imdbRating;
}

export async function getMovieCast(id) {
  const res = await moviedb.movieCredits({ id });
  return { data: res.cast };
}

export async function getTvCast(id) {
  const res = await moviedb.tvCredits({ id });
  return { data: res.cast };
}

/**
 * Multi search only includes the types
 * `movie` and `tv`
 */
export async function searchMulti({ query, page }) {
  const res = await retry(
    async () =>
      await moviedb.searchMulti(
        { query, page },
        {
          timeout: 1000,
        }
      )
  );

  return {
    data: formatResults(res.results)?.filter(
      (media) => media.type !== "person"
    ),
    meta: {
      page: res.page,
      totalPages: res.page,
      totalResults: res.total_results,
    },
  };
}

export async function searchTv(query) {
  const res = await moviedb.searchTv({ query });

  return {
    data: res.results?.map((movie) => formatMovieData(movie)),
    meta: {
      page: res.page,
      totalPages: res.page,
      totalResults: res.total_results,
    },
  };
}

export async function searchMovie(query) {
  const res = await moviedb.searchMovie({ query });

  return {
    data: res.results?.map((tv) => formatTvData(tv)),
    meta: {
      page: res.page,
      totalPages: res.page,
      totalResults: res.total_results,
    },
  };
}
