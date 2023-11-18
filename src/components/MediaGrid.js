import { Suspense } from "react";
import MediaCard, { MediaCardLoadingSkeleton } from "./MediaCard";
import Link from "next/link";

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

async function MediaGrid({ dataProvider, fallback = <></> }) {
  const dataList = await dataProvider();

  // when dataList is not array
  if (!Array.isArray(dataList)) {
    throw new Error("Data Provider must return an array!");
  }

  // dataList is empty
  if (!dataList.length) {
    return fallback;
  }

  const mediaList = dataList.map((data) => {
    return (
      <li key={data.id}>
        <Link href={`/app/${data.type}/${data.id}`}>
          <MediaCard data={data} />
        </Link>
      </li>
    );
  });

  return <Grid>{mediaList}</Grid>;
}

export default async function MediaGridWithLoadingState(props) {
  return (
    <Suspense fallback={<MediaGridLoadingSkeleton />}>
      <MediaGrid {...props} />
    </Suspense>
  );
}
