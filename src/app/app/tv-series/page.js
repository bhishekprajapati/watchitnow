import MediaSection from "../_components/MediaSection";

import {
  getAiringTodayTv,
  getOnTheAirTv,
  getTopRatedTv,
} from "@/services/moviedb";

export const metadata = {
  title: "Explore TV Series",
};

export default function Page() {
  return (
    <>
      <MediaSection
        variant="backdrop"
        title="Airing Today"
        fetcher={async () => (await getAiringTodayTv()).data}
      />

      <MediaSection
        title="On The Air"
        fetcher={async () => (await getOnTheAirTv()).data}
      />

      <MediaSection
        title="Top Rated"
        fetcher={async () => (await getTopRatedTv()).data}
      />
    </>
  );
}
