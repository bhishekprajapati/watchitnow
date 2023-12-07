import { formatResults } from "@/services/formatters";

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
