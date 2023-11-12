import MediaGrid from "@/components/MediaGrid";
import { getTrending } from "@/services/tmdb";

export const metadata = {
  title: "WatchItNow!",
  description: "Entertainment web app",
};

export default async function Page() {
  const trendingByDay = await getTrending();
  const trendingByWeek = await getTrending({ by: "week" });
  return (
    <div>
      <section className="mb-6 md:mb-8 lg:mb-10">
        <header>
          <h2 className="text-heading-sm md:text-heading-md lg:text-heading-lg !font-semibold mb-4 md:mb-6 lg:mb-8">
            Daily Trending
          </h2>
        </header>
        <MediaGrid dataList={trendingByDay.data} />
      </section>
      <section>
        <header>
          <h2 className="text-heading-sm md:text-heading-md lg:text-heading-lg !font-semibold mb-4 md:mb-6 lg:mb-8">
            Weekly Trending
          </h2>
        </header>
        <MediaGrid dataList={trendingByWeek.data} />
      </section>
    </div>
  );
}
