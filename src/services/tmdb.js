const config = {
  key: process.env.TMDB_API_KEY,
  token: process.env.TMDB_READ_ACCESS_TOKEN,
  baseUrl: "https://api.themoviedb.org",
};

function transformResponse(data, meta) {
  return { data, meta };
}

function formatResults(results) {
  return results.map((data) => ({
    id: data.id,
    title: data["original_title"] || data["title"] || data["name"] || "",
    year: (data["release_date"] || data["first_air_date"] || "").substring(
      0,
      4
    ),
    overview: data.overview,
    backdropPath: data["backdrop_path"],
    posterPath: data["poster_path"],
    adult: data.adult,
    type: data["media_type"],
    lang: data["original_language"],
  }));
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

export async function search({ slug, type }) {
  try {
    const url = `${config.baseUrl}/3/search/${type}?api_key=${config.key}&query=${slug}`;
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

    return { status: 200, data: await res.json() };
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

    return { status: 200, data: await res.json() };
  } catch (err) {
    return { status: 500, error: "Something went wrong!" };
  }
}
