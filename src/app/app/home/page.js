import Link from "@/components/Link";
import Section from "@/components/Section";
import MediaDisplayList from "../_components/MediaDisplayList";
import { getTrendingMedia } from "@/services/moviedb";

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
