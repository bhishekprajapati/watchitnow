import MediaCard, { MediaCardLoadingSkeleton } from "./MediaCard";

import Link from "next/link";
import { Suspense } from "react";
import classNames from "classnames";

function Grid({ children }) {
  const gridCss = classNames(
    "grid grid-cols-2 gap-4",
    "sm:grid-cols-3 sm:gap-6",
    "md:grid-cols-4",
    "lg:grid-cols-5",
    "xl:grid-cols-6",
    "2xl:grid-cols-7"
  );

  return <ul className={gridCss}>{children}</ul>;
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
