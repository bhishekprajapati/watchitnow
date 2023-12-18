"use client";

import Grid from "@/components/Grid";
import ScrollTrigger from "@/components/ScrollTrigger";
import MediaDisplayCard from "./MediaDisplayCard";
import { MediaPaginatorContext } from "@/contexts/MediaPaginatorProvider";
import { useContext } from "react";
import { Button } from "@nextui-org/react";
import AllCaughtUp from "@/components/states/AllCaughtUp";

const renderGridItems = (pages) => {
  const dataList = pages.map((page) => page.data).flat();
  return dataList.map((data) => {
    return (
      <Grid.Item key={`${data.id}${data.title}`}>
        <MediaDisplayCard data={data} />
      </Grid.Item>
    );
  });
};

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

export default function MediaDisplay({}) {
  const paginator = useContext(MediaPaginatorContext);
  const isAllCaughtUp = paginator.isAllContentLoaded;

  return (
    <>
      <Grid className="mb-8 md:mb-16">{renderGridItems(paginator.pages)}</Grid>

      {!isAllCaughtUp && !paginator.isError && (
        <ScrollTrigger trigger={paginator.fetchNext} />
      )}
      {!isAllCaughtUp && paginator.isError && (
        <LoadingError error={paginator.error} onClick={paginator.clearError} />
      )}

      {isAllCaughtUp && <AllCaughtUp />}
    </>
  );
}
