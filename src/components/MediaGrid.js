import { Grid } from "./primitives";
import MediaCard, { MediaCardLoadingSkeleton } from "./MediaCard";

import Link from "next/link";
import { Suspense } from "react";

export function MediaGridLoadingSkeleton() {
  const cards = new Array(12).fill(
    <Grid.Item>
      <MediaCardLoadingSkeleton />
    </Grid.Item>
  );

  return <Grid.Container>{cards}</Grid.Container>;
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
      <Grid.Item key={data.id}>
        <Link href={`/app/${data.type}/${data.id}`}>
          <MediaCard data={data} />
        </Link>
      </Grid.Item>
    );
  });

  return <Grid.Container>{mediaList}</Grid.Container>;
}

export default async function MediaGridWithLoadingState(props) {
  return (
    <Suspense fallback={<MediaGridLoadingSkeleton />}>
      <MediaGrid {...props} />
    </Suspense>
  );
}
