import { NextResponse } from "next/server";
import { moviedb } from "@/services/moviedb";
import ApiErrors from "../ApiErrors";
import { getSearchParams } from "@/utils";
import { formatResults } from "@/services/formatters";

export async function GET(req) {
  try {
    const res = await moviedb.trending(getSearchParams(req));

    return NextResponse.json({
      error: null,
      data: formatResults(res.results),
      meta: {
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
