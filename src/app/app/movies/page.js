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
        fetcher={async () => (await getNowPlayingMovies()).data}
      />

      <MediaSection
        title="Top Rated"
        fetcher={async () => (await getTopRatedMovies()).data}
      />

      <MediaSection
        title="Upcoming"
        fetcher={async () => (await getUpcomingMovies()).data}
      />
    </>
  );
}
