import { NextResponse } from "next/server";
import { TvSeries } from "@/services/tmdb";

export async function GET() {
  try {
    const data = await TvSeries.getGenres();

    return NextResponse.json({ data, error: null });
  } catch (err) {
    // log the error
    console.log(err);

    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}
