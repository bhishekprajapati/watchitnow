import { NextResponse } from "next/server";
import { Movies } from "@/services/tmdb";

export async function GET() {
  try {
    const data = await Movies.getGenres();

    return NextResponse.json({ data, error: null });
  } catch (err) {
    // log the error
    console.log(err);

    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}
