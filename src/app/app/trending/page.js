import { getTrendingMedia } from "@/services/moviedb";

import MediaDisplayGrid from "../_components/MediaDisplayGrid";
import MediaDisplaySkeleton from "@/app/ui/skeleton/MediaDisplaySkeleton";
import ErrorBoundary from "@/components/errors/ErrorBoundary";

import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import ErrorFetch from "@/components/states/ErrorFetch";

export const metadata = {
  title: "Trending movies and tv series | WatchItNow!",
  description: "Today's trending movies and tv series on WatchItNow!",
};

export default async function page({}) {
  return (
    <>
      <Suspense fallback={<MediaDisplaySkeleton variant="grid" />}>
        <ErrorBoundary fallback={<ErrorFetch />}>
          <MediaDisplayGrid
            heading="Trending Today"
            href="/app"
            initialPage={await getTrendingMedia()}
          />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
