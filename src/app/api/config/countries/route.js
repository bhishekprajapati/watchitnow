import { NextResponse } from "next/server";
import ApiErrors from "@/app/api/ApiErrors";
import { moviedb } from "@/services/moviedb";

export async function GET() {
  try {
    const countries = await moviedb.countries();
    return NextResponse.json({ data: countries, error: null });
  } catch (err) {
    // log the error
    console.log(err);
    return ApiErrors.InternalServerError();
  }
}
