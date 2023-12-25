import MediaDisplayList from "../_components/MediaDisplayList";
import { getTrendingMedia } from "@/services/moviedb";
import MediaCarousel from "@/components/MediaCarousel";

export const metadata = {
  title: "WatchItNow!",
  description: "Entertainment web app",
};

async function TrendingList() {
  const res = await getTrendingMedia();
  return <MediaDisplayList dataList={res.data} variant="backdrop" />;
}

export default async function Page() {
  return (
    <>
      <MediaCarousel dataList={(await getTrendingMedia()).data} />
    </>
  );
}
