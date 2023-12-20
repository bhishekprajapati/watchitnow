"use client";

import { useEffect, useState, useRef } from "react";
import { createContext } from "react";

import useActiveElement from "@/hooks/useActiveElement";
import useFetch from "@/hooks/useFetch";

export const SearchContext = createContext(null);

export default function SearchProvider({ children }) {
  const searchInputRef = useRef(null);
  const searchStateRef = useRef(null);

  const [query, setQuery] = useState(null);
  const [isSearchStateVisible, setIsSearchStateVisible] = useState(false);

  const activeElement = useActiveElement();
  const { data: res, error, isFetching, refetch, reset } = useFetch(fetcher);

  useEffect(() => {
    const hasData = Array.isArray(res?.data) && res.data.length;
    const shouldShow =
      query && // input must contain a query
      !isFetching && // data fetching is done
      // either we have data or search elements are in focus
      (hasData ||
        searchInputRef.current === activeElement ||
        searchStateRef.current === activeElement);

    setIsSearchStateVisible(shouldShow);
  }, [query, isFetching, activeElement]);

  async function fetcher(abortController) {
    const signal = abortController.signal;

    if (!query) {
      await abortController.abort("Empty query");
      reset();
    }

    const res = await fetch(`/api/search/multi?q=${query}&limit=10`, {
      signal,
    });
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  }

  useEffect(() => {
    refetch();
  }, [query]);

  const state = {
    searchInputRef,
    searchStateRef,
    isSearchStateVisible,
    data: res?.data,
    meta: res?.meta,
    query,
    error,
    isFetching,
    setQuery,
  };

  return (
    <SearchContext.Provider value={state}>{children}</SearchContext.Provider>
  );
}
