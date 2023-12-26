import Section from "@/components/Section";
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/services/moviedb";
import MediaDisplayList from "../_components/MediaDisplayList";
import MediaDisplaySkeleton from "@/app/ui/skeleton/MediaDisplaySkeleton";

import { Suspense } from "react";

export const metadata = {
  title: "Explore Movies | WatchItNow!",
};

async function InTheatresList() {
  const page = await getNowPlayingMovies();
  throw Error("Unhandled error");
  return <MediaDisplayList dataList={page.data} variant="backdrop" />;
}

async function TopRatedList() {
  const page = await getTopRatedMovies();
  return <MediaDisplayList dataList={page.data} />;
}

async function UpcomingList() {
  const page = await getUpcomingMovies();
  return <MediaDisplayList dataList={page.data} />;
}

export default function Page() {
  return (
    <>
      <Section>
        <Section.Header>
          <Section.Title>In Threatres</Section.Title>
        </Section.Header>
        <Section.Content>
          <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
            <InTheatresList />
          </Suspense>
        </Section.Content>
      </Section>

      <Section>
        <Section.Header>
          <Section.Title>Top Rated</Section.Title>
        </Section.Header>
        <Section.Content>
          <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
            <TopRatedList />
          </Suspense>
        </Section.Content>
      </Section>

      <Section>
        <Section.Header>
          <Section.Title>Upcoming</Section.Title>
        </Section.Header>
        <Section.Content>
          <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
            <UpcomingList />
          </Suspense>
        </Section.Content>
      </Section>
    </>
  );
}
