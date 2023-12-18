import Section from "@/components/Section";
import MediaDisplay from "../_components/MediaDisplay";
import { SearchMediaFetcher } from "../_components/MediaFetchers";

import { searchMulti } from "@/services/moviedb";
import MediaPaginatorProvider from "@/contexts/MediaPaginatorProvider";

export const metadata = {
  title: "Search Results | WatchItNow!",
};

function QueryMissingError() {
  return (
    <h2 className="p-6 sm:py-16 text-red text-center bg-gradient-to-t from-semi-dark-blue/5 to-semi-dark-blue/50 rounded-xl border-2 border-semi-dark-blue">
      Forgot to add query!
    </h2>
  );
}

export default async function SearchPage({ searchParams: { query } }) {
  if (!query) {
    return <QueryMissingError />;
  }

  const initialPage = await searchMulti({ query, page: 1 });

  return (
    <>
      <MediaPaginatorProvider key={query} initialPage={initialPage}>
        <Section className="relative">
          <Section.Header className="mb-8 md:flex md:items-center md:justify-between">
            <Section.Title className="mb-4">Search results</Section.Title>
            <h3 className="text-sm md:text-md lg:text-lg">
              Total results {initialPage.meta.totalResults}
            </h3>
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
