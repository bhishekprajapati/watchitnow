import MediaGrid from "@/components/MediaGrid";
import { search } from "@/services/tmdb";

function NoContent({ query }) {
  return (
    <div className="p-8 text-center border-4 border-dashed border-semi-dark-blue border-opacity-90 rounded-xl">
      <img className="mb-8 inline-block" src="/not-found.png" />
      <p className="mb-2 text-heading-md text-white ">
        Oops! It seems we couldn't find any results for{" "}
        <span className="text-red">'{query}'</span>.
      </p>

      <p className="text-heading-md text-white ">
        Consider refining your search or try another term!
      </p>
    </div>
  );
}

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
        fallback={<NoContent query={searchParams.slug} />}
      />
    </>
  );
}
