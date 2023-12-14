import { MovieDb } from "moviedb-promise";

export const moviedb = new MovieDb(process.env.TMDB_API_KEY);
