import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/services/moviedb";

import MediaSection from "../_components/MediaSection";

export const metadata = {
  title: "Explore Movies | WatchItNow!",
};

export default function Page() {
  return (
    <>
      <MediaSection
        variant="backdrop"
        title="In Threatres"
        fetcher={getNowPlayingMovies}
      />
      <MediaSection title="Top Rated" fetcher={getTopRatedMovies} />
      <MediaSection
        title="Upcoming"
        layout="grid"
        fetcher={getUpcomingMovies}
        infinite
      />
    </>
  );
}
