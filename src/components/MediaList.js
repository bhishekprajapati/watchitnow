"use client";

import Grid from "./Grid";
import GridItem from "./GridItem";
import Info from "@/components/media-card/Info";
import Poster from "@/components/media-card/Poster";
import Title from "@/components/media-card/Title";
import withOverflowIndicator from "@/hoc/withOverflowIndicator";

import Link from "next/link";
import { forwardRef } from "react";

const MediaCard = ({
  as: Element = "article",
  className,
  data,
  posterHref,
  ...props
}) => {
  const { title, year, lang, type, posterPath } = data;
  const poster = <Poster className="mb-2" path={posterPath} />;

  return (
    <Element className={className} {...props}>
      {posterHref ? <Link href={posterHref}>{poster}</Link> : poster}
      <div className="hidden lg:block">
        <Info type={type} year={year} lang={lang} />
        <Title>{title}</Title>
      </div>
    </Element>
  );
};

const List = forwardRef(
  ({ dataList, onChangeRoot, onChangeLast, ...props }, ref) => {
    return (
      <Grid ref={ref} {...props}>
        {dataList.map((data) => {
          const cardProps = {
            data,
            posterHref: `/app/${data.type}/${data.id}`,
          };

          return (
            <GridItem key={data.id}>
              <MediaCard {...cardProps} />
            </GridItem>
          );
        })}
      </Grid>
    );
  }
);

export default function MediaList({ dataList }) {
  const ListWithOverflowIndicators = withOverflowIndicator(List, {
    dataList,
  });

  return ListWithOverflowIndicators;
}
