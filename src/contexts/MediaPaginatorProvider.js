"use client";

import useInfinitePagination from "@/hooks/useInfinitePagination";
import { createContext } from "react";

export const MediaPaginatorContext = createContext(null);

export default function MediaPaginatorProvider({ initialPage, children }) {
  const paginator = useInfinitePagination({
    initialPage,
  });

  const value = paginator;

  return (
    <MediaPaginatorContext.Provider value={value}>
      {children}
    </MediaPaginatorContext.Provider>
  );
}
