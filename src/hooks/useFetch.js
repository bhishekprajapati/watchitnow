"use client";

import { useEffect } from "react";
import { useState } from "react";

export default function useFetch(
  fetcher,
  options = {
    refetch: {
      cancelPending: true,
    },
  }
) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setIsFetching(true);
      try {
        const res = await fetcher(abortController);
        setData(res);
        setError(null);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    }

    fetchData();

    if (options.refetch.cancelPending) {
      /**
       * Built to cancel the previous request
       * on a new refetch request
       */
      return () => abortController.abort();
    }

    return () => {};
  }, [trigger]);

  function refetch() {
    setTrigger((prev) => prev + 1);
  }

  /**
   * Can be useful to reset the states
   * whenever required
   */
  function reset() {
    setData(null);
    setError(null);
    setIsFetching(false);
  }

  return { data, error, isFetching, refetch, reset };
}
