import { moviedb } from "@/services/moviedb";
import { formatResults } from "@/services/formatters";

import MediaDisplayGrid from "../_components/MediaDisplayGrid";
import MediaDisplaySkeleton from "@/app/ui/skeleton/MediaDisplaySkeleton";

import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export const metadata = {
  title: "Trending movies and tv series | WatchItNow!",
  description: "Today's trending movies and tv series on WatchItNow!",
};

async function getTrendingAllToday() {
  const res = await moviedb.trending({
    media_type: "all",
    language: "en",
    time_window: "day",
  });

  return {
    data: formatResults(res.results),
    meta: {
      page: res.page,
      totalPages: res.total_pages,
      totalResults: res.total_results,
    },
  };
}

async function TrendingToday() {
  const page = await getTrendingAllToday();
  return (
    <MediaDisplayGrid
      heading="Trending Today"
      href="/app"
      initialPage={page}
      ViewMoreButton={
        <Link href="/app/trending">
          <Button color="default" variant="flat" className="bg-semi-dark-blue">
            View More
          </Button>
        </Link>
      }
    />
  );
}

export default function page({}) {
  return (
    <>
      <Suspense fallback={<MediaDisplaySkeleton variant="grid" />}>
        <TrendingToday />
      </Suspense>
    </>
  );
}
