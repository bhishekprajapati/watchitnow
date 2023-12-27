import MediaSection from "../_components/MediaSection";
import { searchMulti } from "@/services/moviedb";

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

  async function fetcher(params = { page: 1 }) {
    "use server";
    return await searchMulti({ query, page: params.page });
  }

  return (
    <>
      <MediaSection title="Search results" fetcher={fetcher} infinite />
    </>
  );
}
