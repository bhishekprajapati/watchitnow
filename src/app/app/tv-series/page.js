import MediaDisplaySkeleton from "@/app/ui/skeleton/MediaDisplaySkeleton";
import Section from "@/components/Section";
import {
  getAiringTodayTv,
  getOnTheAirTv,
  getTopRatedTv,
} from "@/services/moviedb";
import { Suspense } from "react";
import MediaDisplayList from "../_components/MediaDisplayList";

export const metadata = {
  title: "Explore TV Series",
};

async function AiringTodayList() {
  const page = await getAiringTodayTv();

  return (
    <Section>
      <Section.Header>
        <Section.Title>Airing Today</Section.Title>
      </Section.Header>
      <Section.Content>
        <MediaDisplayList dataList={page.data} />
      </Section.Content>
    </Section>
  );
}

async function OnTheAirList() {
  const page = await getOnTheAirTv();

  return (
    <Section>
      <Section.Header>
        <Section.Title>On The Air</Section.Title>
      </Section.Header>
      <Section.Content>
        <MediaDisplayList dataList={page.data} />
      </Section.Content>
    </Section>
  );
}

async function TopRatedList() {
  const page = await getTopRatedTv();

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

export default function Page() {
  return (
    <>
      <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
        <AiringTodayList />
      </Suspense>

      <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
        <TopRatedList />
      </Suspense>

      <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
        <OnTheAirList />
      </Suspense>
    </>
  );
}
