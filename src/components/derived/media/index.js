import { Grid } from "@/components/primitives";
const { Container: GridContainer, Item: GridItem } = Grid;

import Info from "./Info";
import Loading from "./Loading";
import Poster from "./Poster";
import Title from "./Title";
import Link from "next/link";

function Card({
  as: Element = "article",
  className,
  data,
  posterHref,
  ...props
}) {
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
}

function List({ dataList }) {
  return (
    <GridContainer>
      {dataList.map((data) => {
        const props = {
          data,
          posterHref: `/app/${data.type}/${data.id}`,
        };

        return (
          <GridItem key={data.id}>
            <Card {...props} />
          </GridItem>
        );
      })}
    </GridContainer>
  );
}

export const Media = {
  List,
  Loading,
  Card,
};
