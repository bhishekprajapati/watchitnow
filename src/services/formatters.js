function formatRuntime(minutes) {
  if (!minutes) return "";
  minutes = parseInt(minutes);
  if (typeof minutes !== "number") return "";

  if (minutes < 60) {
    return `${minutes} m`;
  }

  const mins = minutes % 60;
  const hrs = (minutes - mins) / 60;

  if (!mins) {
    return `${hrs} h`;
  }

  return `${hrs} h ${mins} m`;
}

export function formatResults(results) {
  return results.map((data) => ({
    id: data.id,
    title:
      data["original_title"] ||
      data["title"] ||
      data["original_name"] ||
      data["name"] ||
      "",
    year: (
      data["release_date"] ||
      data["last_air_date"] ||
      data["first_air_date"] ||
      ""
    ).substring(0, 4),
    overview: data.overview || "",
    backdropPath: data["backdrop_path"] || "",
    posterPath: data["poster_path"] || "",
    adult: data.adult,
    type: data["media_type"],
    lang: data["original_language"],
  }));
}

export function formatMovieData(data) {
  const formatted = {
    adult: data["adult"],
    type: "movie",
    id: data["id"],
    imdbId: data["imdb_id"],
    title: data["original_title"] || data["title"] || "",
    originalLanguage: data["original_language"] || "unknown",
    posterPath: data["poster_path"] || "",
    releaseDate: data["release_date"] || "",
    status: data["status"] || "unknown",
    tagline: data["tagline"] || "",
    overview: data["overview"] || "",
    runtime: formatRuntime(data["runtime"] || 0),
    genres: Array.isArray(data["genres"]) ? data["genres"] : [],
    backdropPath: data["backdrop_path"] || "",
  };

  const releaseYear = parseInt(formatted.releaseDate.split("-")[0]);
  if (typeof releaseYear === "number") {
    formatted["releaseYear"] = releaseYear;
  }

  return formatted;
}

export function formatTvData(data) {
  const formatted = {
    adult: data["adult"],
    type: "tv",
    id: data["id"],
    title: data["original_name"] || data["name"] || data["title"] || "",
    originalLanguage: data["original_languages"] || "unknown",
    posterPath: data["poster_path"] || "",
    status: data["status"] || "unknown",
    tagline: data["tagline"] || "",
    overview: data["overview"] || "",
    genres: Array.isArray(data["genres"]) ? data["genres"] : [],
    episodeCount: data["number_of_episodes"],
    seasonsCount: data["number_of_seasons"],
    airDates: {
      first: data["first_air_date"] || "",
      last: data["last_air_date"] || "",
    },
    inProd: data["in_production"],
    backdropPath: data["backdrop_path"] || "",
  };

  return formatted;
}
