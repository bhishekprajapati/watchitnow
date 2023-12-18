"use client";

import { MediaPaginatorContext } from "@/contexts/MediaPaginatorProvider";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";

async function getTrending({ page = 1 }) {
  const res = await fetch(
    `/api/trending?media_type=all&time_window=day&page=${page}`
  );
  return res.json();
}

export function TrendingMediaFetcher({ children }) {
  const ctx = useContext(MediaPaginatorContext);
  ctx.setFetcher(async ({ currPage }) => {
    if (currPage.meta.page === currPage.meta.totalPages) {
      return undefined;
    }

    const nextPage = await getTrending({ page: currPage.meta.page + 1 });
    return nextPage;
  });

  return children;
}

async function search({ page = 1, query }) {
  const res = await fetch(`/api/search/multi?q=${query}&page=${page}`);
  return res.json();
}

export function SearchMediaFetcher({ children }) {
  const ctx = useContext(MediaPaginatorContext);
  const searchParams = useSearchParams();

  ctx.setFetcher(async ({ currPage }) => {
    /**
     * return `undefined` in case there are no pages left to load
     */
    if (currPage.meta.page === currPage.meta.totalPages) {
      return undefined;
    }

    const nextPage = await search({
      query: searchParams.get("query"),
      page: currPage.meta.page + 1,
    });
    return nextPage;
  });

  return children;
}
