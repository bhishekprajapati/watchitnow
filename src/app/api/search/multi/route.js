import { NextResponse } from "next/server";
import { searchMulti } from "@/services/moviedb";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  const page = searchParams.get("page") ?? 1;
  const results = await searchMulti({ query, page });
  return NextResponse.json(results);
}
