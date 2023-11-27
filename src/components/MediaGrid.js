import Grid from "./Grid";
import GridItem from "./GridItem";
import MediaCard, { MediaCardLoadingSkeleton } from "./MediaCard";

import Link from "next/link";
import { Suspense } from "react";

export function MediaGridLoadingSkeleton() {
  const cards = new Array(12).fill(
    <GridItem>
      <MediaCardLoadingSkeleton />
    </GridItem>
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
      <GridItem key={data.id}>
        <Link href={`/app/${data.type}/${data.id}`}>
          <MediaCard data={data} />
        </Link>
      </GridItem>
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
