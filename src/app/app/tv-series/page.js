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
        fetcher={getAiringTodayTv}
      />
      <MediaSection title="On The Air" fetcher={getOnTheAirTv} />
      <MediaSection title="Top Rated" layout="grid" fetcher={getTopRatedTv} />
    </>
  );
}
