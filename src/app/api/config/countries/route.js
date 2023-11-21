import { NextResponse } from "next/server";
import { Configurations } from "@/services/tmdb";

export async function GET() {
  try {
    const countries = await Configurations.getCountries();

    return NextResponse.json({ data: countries, error: null });
  } catch (err) {
    // log the error
    console.log(err);

    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}
