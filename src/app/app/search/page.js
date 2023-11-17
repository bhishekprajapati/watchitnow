import MediaGrid from "@/components/MediaGrid";
import { search } from "@/services/tmdb";
import ZeroSearchResults from "@/components/empty-states/ZeroSearchResults";

export default async function SearchPage({ searchParams }) {
  async function provideSearchResults() {
    const { data } = await search(searchParams);
    return data;
  }

  return (
    <>
      <h1 className="mb-6 text-heading-lg font-medium">Search Results</h1>
      <MediaGrid
        dataProvider={provideSearchResults}
        fallback={<ZeroSearchResults query={searchParams.slug} />}
      />
    </>
  );
}
