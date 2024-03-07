"use client";

import Grid from "@/components/ui/Grid";
import List from "@/components/ui/List";
import { Skeleton as MediaCardSkeleton } from "@/components/MediaCard";

export default function MediaDisplaySkeleton({ variant = "list" }) {
  const data = new Array(20).fill(0);
  const isListLayout = variant === "list";
  const Container = isListLayout ? List : Grid;
  const ContainerItem = isListLayout ? List.Item : Grid.Item;

  const listProps = {
    className: "auto-cols-[33%] sm:auto-cols-[8rem] md:auto-cols-[12rem]",
    scrollable: "horizontal",
  };
  const gridProps = {};
  const containerProps = isListLayout ? listProps : gridProps;

  return (
    <Container {...containerProps}>
      {data.map((_, idx) => {
        return (
          <ContainerItem key={idx}>
            <MediaCardSkeleton />
          </ContainerItem>
        );
      })}
    </Container>
  );
}
