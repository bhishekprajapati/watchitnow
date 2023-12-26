import { getTrendingMedia } from "@/services/moviedb";
import MediaCarousel from "@/components/MediaCarousel";

export const metadata = {
  title: "WatchItNow!",
  description: "Entertainment web app",
};

export default async function Page() {
  return (
    <>
      <MediaCarousel dataList={(await getTrendingMedia()).data} />
    </>
  );
}
