"use client";

import { useState } from "react";

export default function useInfinitePagination({ fetcher, initialPage }) {
  const [isAllContentLoaded, setIsAllContentLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [error, setError] = useState(null);
  const [pages, setPages] = useState([initialPage]);

  async function fetchNext() {
    // SKIP FIRING FETCH REQUEST IF ALREADY FETCHING
    if (isFetching) {
      return;
    }

    // SKIP TRYING IF WE HAVE ERROR
    if (isError) {
      return;
    }

    if (typeof fetcher !== "function") {
      console.error("Fetcher is not a function");
      return;
    }
    try {
      setIsFetching(true);
      const nextPage = await fetcher({
        currPage: pages[pages.length - 1],
      });
      setIsFetching(false);

      // if `true` means all pages are loaded
      if (nextPage === undefined) {
        setIsAllContentLoaded(true);
        return;
      }

      setPages((prev) => [...prev, nextPage]);
    } catch (err) {
      setIsError(true);
      setError(err);
      setIsFetching(false);
    }
  }

  /**
   * Paginator will stop accepting new fetch triggers if any error has occured
   * in order to make paginator work again, `clearError` can be called
   */
  function clearError() {
    setIsError(false); // clear
    setError(null);
  }

  return {
    pages,
    isAllContentLoaded,
    isFetching,
    fetchNext,
    error,
    isError,
    clearError,
  };
}
