import { Suspense } from "react";
import MediaCard, { MediaCardLoadingSkeleton } from "./MediaCard";

function Grid({ children }) {
  return (
    <ul
      className="
        flex
        [&>li]:mb-4 md:[&>li]:mb-6 xl:[&>li]:mb-8 
        [&>li]:w-[48%] sm:[&>li]:w-[31%] md:[&>li]:w-[23%] lg:[&>li]:w-[18%] xl:[&>li]:w-[15%] 2xl:[&>li]:w-[13%]
        gap-x-[4%] sm:gap-x-[3.5%] md:gap-x-[2.6%] lg:gap-x-[2.5%] xl:gap-x-[2%] 2xl:gap-x-[1.5%]
        flex-wrap
      "
    >
      {children}
    </ul>
  );
}

export function MediaGridLoadingSkeleton() {
  const cards = new Array(12).fill(
    <li>
      <MediaCardLoadingSkeleton />
    </li>
  );

  return <Grid>{cards}</Grid>;
}

async function MediaGrid({ dataProvider }) {
  const dataList = await dataProvider();

  if (!dataList.length) {
    return <h2>Something went wrong!</h2>;
  }

  const mediaList = dataList.map((data) => {
    return (
      <li key={data.id}>
        <MediaCard data={data} />
      </li>
    );
  });

  return <Grid>{mediaList}</Grid>;
}

export default async function MediaGridWithLoadingState({ dataProvider }) {
  return (
    <Suspense fallback={<MediaGridLoadingSkeleton />}>
      <MediaGrid dataProvider={dataProvider} />
    </Suspense>
  );
}
