import { getTrendingMedia } from "@/services/moviedb";
import MediaSection from "../_components/MediaSection";

export const metadata = {
  title: "Trending movies and tv series | WatchItNow!",
  description: "Today's trending movies and tv series on WatchItNow!",
};

export default async function page({}) {
  return (
    <>
      <MediaSection
        title="Trending Today"
        fetcher={getTrendingMedia}
        infinite
      />
    </>
  );
}
