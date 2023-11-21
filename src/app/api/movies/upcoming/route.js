import { NextResponse } from "next/server";
import { moviedb } from "@/services/moviedb";
import ApiErrors from "../../ApiErrors";
import { getSearchParams } from "@/utils";

export async function GET(req) {
  try {
    const res = await moviedb.upcomingMovies(getSearchParams(req));

    return NextResponse.json({
      error: null,
      data: res.results,
      meta: {
        dates: res.dates,
        page: res.page,
        totalPages: res["total_pages"],
        totalResults: res["total_results"],
      },
    });
  } catch (err) {
    // log the error
    console.log(err);

    return ApiErrors.InternalServerError();
  }
}
