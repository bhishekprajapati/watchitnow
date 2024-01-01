import { getTrendingMedia } from "@/services/moviedb";
import MediaCarousel from "@/components/MediaCarousel";
import MediaSection from "../_components/MediaSection";

export const metadata = {
  title: "WatchItNow!",
  description: "Entertainment web app",
};

export default async function Page() {
  return (
    <>
      <MediaCarousel dataList={(await getTrendingMedia()).data} />

      <MediaSection title="Popular" fetcher={getTrendingMedia} infinite />
    </>
  );
}
