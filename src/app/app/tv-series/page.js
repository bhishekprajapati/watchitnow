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
  return <MediaDisplayList dataList={page.data} />;
}

async function OnTheAirList() {
  const page = await getOnTheAirTv();
  return <MediaDisplayList dataList={page.data} />;
}

async function TopRatedList() {
  const page = await getTopRatedTv();
  return <MediaDisplayList dataList={page.data} />;
}

export default function Page() {
  return (
    <>
      <Section>
        <Section.Header>
          <Section.Title>Airing Today</Section.Title>
        </Section.Header>
        <Section.Content>
          <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
            <AiringTodayList />
          </Suspense>
        </Section.Content>
      </Section>

      <Section>
        <Section.Header>
          <Section.Title>On The Air</Section.Title>
        </Section.Header>
        <Section.Content>
          <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
            <TopRatedList />
          </Suspense>
        </Section.Content>
      </Section>

      <Section>
        <Section.Header>
          <Section.Title>Top Rated</Section.Title>
        </Section.Header>
        <Section.Content>
          <Suspense fallback={<MediaDisplaySkeleton variant="list" />}>
            <OnTheAirList />
          </Suspense>
        </Section.Content>
      </Section>
    </>
  );
}
