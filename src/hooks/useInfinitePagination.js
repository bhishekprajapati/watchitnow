"use client";

import { useState } from "react";

export default function useInfinitePagination({ fetcher, initialPage }) {
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [error, setError] = useState(null);
  const [pages, setPages] = useState([initialPage]);

  async function fetchNext() {
    try {
      setIsError(false); // clear
      setIsFetching(true);
      const nextPage = await fetcher({
        currPage: pages[pages.length - 1],
      });
      setIsFetching(false);
      setPages((prev) => [...prev, nextPage]);
    } catch (err) {
      setIsError(true);
      setError(err);
      setIsFetching(false);
    }
  }

  return {
    error,
    pages,
    isFetching,
    isError,
    fetchNext,
  };
}
