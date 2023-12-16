import { getTrendingMedia } from "@/services/moviedb";
import MediaDisplay from "../_components/MediaDisplay";
import Section from "@/components/Section";
import MediaPaginatorProvider from "@/contexts/MediaPaginatorProvider";
import List from "@/components/List";
import MediaDisplayList from "../_components/MediaDisplayList";
import { Suspense } from "react";
import MediaDisplaySkeleton from "@/app/ui/skeleton/MediaDisplaySkeleton";
import Link from "@/components/Link";

export const metadata = {
  title: "WatchItNow!",
  description: "Entertainment web app",
};

async function TrendingList() {
  const res = await getTrendingMedia();
  return <MediaDisplayList dataList={res.data} variant="backdrop" />;
}

export default async function Page() {
  return (
    <>
      <Section>
        <Section.Header className="flex items-center justify-between">
          <Section.Title>Trending Today</Section.Title>
          <Link href="/app/trending" className="text-sm md:text-lg text-yellow">
            View More
          </Link>
        </Section.Header>
        <Section.Content>
          <TrendingList />
        </Section.Content>
      </Section>
    </>
  );
}
