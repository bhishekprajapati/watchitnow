import { NextResponse } from "next/server";
import { search } from "@/services/tmdb";

// export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const searchTerm = searchParams.get("q");
  const limit = parseInt(searchParams.get("limit"));

  if (
    searchParams.get("limit") &&
    (isNaN(limit) || typeof limit !== "number")
  ) {
    return NextResponse.json({ error: "Invalid limit parameter" });
  }

  if (!searchTerm) {
    // validation
    return NextResponse.json({
      error: "Invalid search query!",
    });
  }
  const { data, meta } = await search({ slug: searchTerm });
  let result = Array.isArray(data) ? data : [];

  if (limit) {
    result = result.splice(0, limit);
  }

  return NextResponse.json({
    data: result,
    meta,
  });
}
