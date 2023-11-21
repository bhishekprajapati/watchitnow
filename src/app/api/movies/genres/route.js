import { NextResponse } from "next/server";
import { Movies } from "@/services/tmdb";
import ApiErrors from "../../ApiErrors";

export async function GET() {
  try {
    const data = await Movies.getGenres();
    return NextResponse.json({ data, error: null });
  } catch (err) {
    // log the error
    console.log(err);

    return ApiErrors.InternalServerError();
  }
}
