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

  return (
    <Section>
      <Section.Header>
        <Section.Title>In Threatres</Section.Title>
      </Section.Header>
      <Section.Content>
        <MediaDisplayList dataList={page.data} />
      </Section.Content>
    </Section>
  );
}

async function TopRatedList() {
  const page = await getTopRatedMovies();

  return (
    <Section>
      <Section.Header>
        <Section.Title>Top Rated</Section.Title>
      </Section.Header>
      <Section.Content>
        <MediaDisplayList dataList={page.data} />
      </Section.Content>
    </Section>
  );
}

async function UpcomingList() {
  const page = await getUpcomingMovies();

  return (
    <Section>
      <Section.Header>
        <Section.Title>Upcoming</Section.Title>
      </Section.Header>
      <Section.Content>
        <MediaDisplayList dataList={page.data} />
      </Section.Content>
    </Section>
  );
}

export default function Page() {
  return (
    <>
      <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
        <InTheatresList />
      </Suspense>

      <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
        <TopRatedList />
      </Suspense>

      <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
        <UpcomingList />
      </Suspense>
    </>
  );
}
