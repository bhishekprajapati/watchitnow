import Section from "@/components/Section";
import ErrorFetch from "@/components/states/ErrorFetch";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import MediaDisplaySkeleton from "@/app/ui/skeleton/MediaDisplaySkeleton";
import { getTrendingMedia } from "@/services/moviedb";
import MediaDisplayList from "../_components/MediaDisplayList";
import ShowMoreCard from "../_components/ShowMoreCard";

import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { Suspense } from "react";

export const metadata = {
  title: "WatchItNow!",
  description: "Entertainment web app",
};

async function TrendingList() {
  const exploreHref = "/app/trending";
  const page = await getTrendingMedia();

  return (
    <Section>
      <Section.Header>
        <Section.Title>
          <Link
            href={exploreHref}
            className=" transition-colors hover:text-yellow"
          >
            Trending Today{" "}
            <IconChevronRight className="inline w-[1em] h-[1em]" />
          </Link>
        </Section.Title>
      </Section.Header>
      <Section.Content>
        <MediaDisplayList
          dataList={page.data}
          SlotLastItem={
            <Link href={exploreHref}>
              <ShowMoreCard />
            </Link>
          }
        />
      </Section.Content>
    </Section>
  );
}

export default async function Page() {
  return (
    <>
      <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
        <ErrorBoundary fallback={<ErrorFetch />}>
          <TrendingList />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
