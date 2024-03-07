import List from "@/components/ui/List";
import Grid from "@/components/ui/Grid";
import Section from "@/components/Section";
import MediaCard from "@/components/MediaCard";
import InfiniteScrollMediaDisplay from "./InfiniteScrollMediaDisplay";
import MediaCardSkeleton from "@/app/ui/skeleton/MediaCardSkeleton";

import PropTypes from "prop-types";
import { Suspense } from "react";
import classNames from "classnames";

Container.propTypes = {
  variant: PropTypes.oneOf(["poster", "backdrop"]),
  layout: PropTypes.oneOf(["list", "grid"]),
  children: PropTypes.func.isRequired,
};

/**
 * Media Display container layout abstraction
 */
function Container({ variant = "poster", layout = "list", children }) {
  if (layout !== "list") {
    return <Grid className="mb-8 md:mb-16">{children(Grid.Item)}</Grid>;
  }

  const isPosterVariant = variant === "poster";
  const list = classNames(
    isPosterVariant
      ? "auto-cols-[33%] sm:auto-cols-[8rem] md:auto-cols-[12rem]"
      : "gap-x-6 auto-cols-[90%] sm:auto-cols-[60%] md:auto-cols-[50%] lg:auto-cols-[20rem]"
  );

  const ListItem = ({ children, ...props }) => (
    <li className="snap-start" {...props}>
      {children}
    </li>
  );

  return (
    <List className={list} scrollable="horizontal">
      {children(ListItem)}
    </List>
  );
}

export function CardsDisplay({ dataList, variant, layout }) {
  return (
    <Container variant={variant} layout={layout}>
      {(Wrapper) => {
        return dataList.map((data) => (
          <Wrapper key={data.id}>
            <MediaCard data={data} variant={variant} />
          </Wrapper>
        ));
      }}
    </Container>
  );
}

async function MediaDisplay({
  variant = "poster",
  layout = "list",
  fetcher,
  infinite,
}) {
  const initialPage = await fetcher();

  return infinite ? (
    <InfiniteScrollMediaDisplay
      initialPage={initialPage}
      fetcher={fetcher}
      variant={variant}
      layout={layout}
    />
  ) : (
    <CardsDisplay
      variant={variant}
      layout={layout}
      dataList={initialPage.data}
    />
  );
}

function ContentFallback({ variant, layout }) {
  return (
    <Container variant={variant} layout={layout}>
      {(Wrapper) =>
        new Array(10).fill(0).map((_, idx) => {
          return (
            <Wrapper key={idx}>
              <MediaCardSkeleton variant={variant} />
            </Wrapper>
          );
        })
      }
    </Container>
  );
}

MediaSection.propTypes = {
  variant: PropTypes.oneOf(["poster", "backdrop"]),
  layout: PropTypes.oneOf(["list", "grid"]),
  fetcher: PropTypes.func.isRequired,
  infinite: PropTypes.bool,
};

export default function MediaSection({
  title = "Media Section",
  variant = "poster",
  layout = "list",
  fetcher,
  infinite = false,
}) {
  return (
    <Section className="!p-0">
      <Section.Header className="px-5 lg:px-8">
        <Section.Title>{title}</Section.Title>
      </Section.Header>
      <Section.Content
        className={
          infinite || layout === "grid" ? "px-5 lg:px-8" : "pl-5 lg:pl-8"
        }
      >
        <Suspense
          fallback={<ContentFallback variant={variant} layout={layout} />}
        >
          <MediaDisplay
            variant={variant}
            layout={infinite ? "grid" : layout}
            fetcher={fetcher}
            infinite={infinite}
          />
        </Suspense>
      </Section.Content>
    </Section>
  );
}
