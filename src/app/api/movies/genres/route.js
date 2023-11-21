import { NextResponse } from "next/server";
import { moviedb } from "@/services/moviedb";
import ApiErrors from "../../ApiErrors";
import { getSearchParams } from "@/utils";

export async function GET(req) {
  try {
    const { genres } = await moviedb.genreMovieList(getSearchParams(req));
    return NextResponse.json({ data: genres, error: null });
  } catch (err) {
    // log the error
    console.log(err);

    return ApiErrors.InternalServerError();
  }
}
