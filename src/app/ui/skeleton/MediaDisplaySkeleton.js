"use client";

import Section from "@/components/Section";
import Grid from "@/components/Grid";
import List from "@/components/List";
import MediaCardSkeleton from "./MediaCardSkeleton";

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
    <Section>
      <Section.Header>
        <div className="w-[40%] max-w-[15rem] h-10 animate-shine rounded-md"></div>
      </Section.Header>
      <Section.Content>
        <Container {...containerProps}>
          {data.map((_, idx) => {
            return (
              <ContainerItem key={idx}>
                <MediaCardSkeleton />
              </ContainerItem>
            );
          })}
        </Container>
      </Section.Content>
    </Section>
  );
}
