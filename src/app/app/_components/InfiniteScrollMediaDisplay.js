"use client";

import { CardsDisplay } from "./MediaSection";
import useInfinitePagination from "@/hooks/useInfinitePagination";
import ScrollTrigger from "../../../components/ScrollTrigger";
import AllCaughtUp from "../../../components/states/AllCaughtUp";
import { Button } from "@nextui-org/react";

const LoadingError = ({ error, onClick }) => {
  return (
    <div className="p-16 text-center rounded-xl ">
      <div className="mb-4 text-lg text-red">
        <span>Unable to load more content!</span>
        <div>Error: {error?.message}</div>
      </div>
      <Button variant="solid" color="warning" onClick={onClick}>
        Retry
      </Button>
    </div>
  );
};

export default function InfiniteScrollMediaDisplay({
  initialPage,
  fetcher,
  variant = "poster",
  layout = "list",
}) {
  async function fetchData({ currPage }) {
    /**
     * return `undefined` in case there are no pages left to load
     */
    if (currPage.meta.page === currPage.meta.totalPages) {
      return undefined;
    }

    const nextPage = await fetcher({ page: currPage.meta.page + 1 });
    return nextPage;
  }

  const { isAllContentLoaded, isError, error, pages, fetchNext, clearError } =
    useInfinitePagination({ initialPage, fetcher: fetchData });
  const dataList = pages.map((page) => page.data).flat();

  return (
    <>
      <CardsDisplay dataList={dataList} variant={variant} layout={layout} />
      {!isAllContentLoaded && !isError && <ScrollTrigger trigger={fetchNext} />}

      {!isAllContentLoaded && isError && (
        <LoadingError error={error} onClick={clearError} />
      )}

      {isAllContentLoaded && <AllCaughtUp />}
    </>
  );
}
