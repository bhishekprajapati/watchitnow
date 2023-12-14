import { getTrendingMedia } from "@/services/moviedb";

import Carousel from "@/components/Carousel";

export const metadata = {
  title: "WatchItNow!",
  description: "Entertainment web app",
};

async function TrendingCarousel() {
  const res = await getTrendingMedia();

  return <Carousel slidesData={res.data} className="mb-8 rounded-lg" />;
}

export default async function Page() {
  return (
    <>
      <div className="mb-8">
        <TrendingCarousel />
      </div>
    </>
  );
}
