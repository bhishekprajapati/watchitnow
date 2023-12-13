import Section from "@/components/Section";
import MediaDisplay from "../_components/MediaDisplay";
import { TrendingMediaFetcher } from "../_components/MediaFetchers";

import { getTrendingMedia } from "@/services/moviedb";
import MediaPaginatorProvider from "@/contexts/MediaPaginatorProvider";

export const metadata = {
  title: "Trending movies and tv series | WatchItNow!",
  description: "Today's trending movies and tv series on WatchItNow!",
};

export default async function page({}) {
  return (
    <>
      <MediaPaginatorProvider initialPage={await getTrendingMedia()}>
        <Section className="relative">
          <Section.Header className="sticky flex items-center justify-between">
            <Section.Title>Trending Today</Section.Title>
          </Section.Header>
          <Section.Content>
            <TrendingMediaFetcher>
              <MediaDisplay />
            </TrendingMediaFetcher>
          </Section.Content>
        </Section>
      </MediaPaginatorProvider>
    </>
  );
}
