import { NextResponse } from "next/server";
import { Movies } from "@/services/tmdb";
import ApiErrors from "../../ApiErrors";

export async function GET() {
  try {
    const res = await Movies.getTopRated();

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
