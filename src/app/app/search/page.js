import Section from "@/components/Section";
import MediaDisplay from "../_components/MediaDisplay";
import { SearchMediaFetcher } from "../_components/MediaFetchers";

import { searchMulti } from "@/services/moviedb";
import MediaPaginatorProvider from "@/contexts/MediaPaginatorProvider";

export const metadata = {
  title: "Search Results | WatchItNow!",
};

export default async function SearchPage({ searchParams }) {
  return (
    <>
      <MediaPaginatorProvider
        initialPage={await searchMulti(searchParams?.query)}
      >
        <Section className="relative">
          <Section.Header className="sticky flex items-center justify-between">
            <Section.Title>Search results</Section.Title>
          </Section.Header>
          <Section.Content>
            <SearchMediaFetcher>
              <MediaDisplay />
            </SearchMediaFetcher>
          </Section.Content>
        </Section>
      </MediaPaginatorProvider>
    </>
  );
}
