import { getTrendingMedia } from "@/services/moviedb";

import MediaDisplayGrid from "../_components/MediaDisplayGrid";
import MediaDisplaySkeleton from "@/app/ui/skeleton/MediaDisplaySkeleton";
import ErrorBoundary from "@/components/errors/ErrorBoundary";

import { Suspense } from "react";
import ErrorFetch from "@/components/states/ErrorFetch";

export const metadata = {
  title: "Trending movies and tv series | WatchItNow!",
  description: "Today's trending movies and tv series on WatchItNow!",
};

async function Trending() {
  const page = await getTrendingMedia();
  return <MediaDisplayGrid heading="Trending Today" initialPage={page} />;
}

export default async function page({}) {
  return (
    <>
      <ErrorBoundary fallback={<ErrorFetch />}>
        <Suspense fallback={<MediaDisplaySkeleton variant="grid" />}>
          <Trending />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
