import { NextResponse } from "next/server";
import { getTrendingMedia } from "@/services/moviedb";
import ApiErrors from "../ApiErrors";
import { getSearchParams } from "@/utils";

export async function GET(req) {
  try {
    const res = await getTrendingMedia(getSearchParams(req));

    return NextResponse.json(res);
  } catch (err) {
    // log the error
    console.log(err);

    return ApiErrors.InternalServerError();
  }
}
