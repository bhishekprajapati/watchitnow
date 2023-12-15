import { NextResponse } from "next/server";
import { searchMulti } from "@/services/moviedb";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  const results = await searchMulti(query);
  return NextResponse.json(results);
}
