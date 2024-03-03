import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { searchMulti } from "@/services/moviedb";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  const page = searchParams.get("page") ?? 1;
  // TODO: handle errors
  const results = await searchMulti({ query, page });
  return NextResponse.json(results);
}
