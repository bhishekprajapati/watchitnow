import MediaDisplayCard from "./MediaDisplayCard";

import List from "@/components/List";
import Section from "@/components/Section";

import PropTypes from "prop-types";
import { Suspense } from "react";
import MediaCardSkeleton from "@/app/ui/skeleton/MediaCardSkeleton";

MediaSection.propTypes = {
  variant: PropTypes.oneOf(["poster", "backdrop"]),
  fetcher: PropTypes.func.isRequired,
};

function Container({ variant = "poster", children }) {
  const isPosterVariant = variant === "poster";
  const list = isPosterVariant
    ? "auto-cols-[33%] sm:auto-cols-[8rem] md:auto-cols-[12rem]"
    : "gap-x-6 auto-cols-[90%] sm:auto-cols-[60%] md:auto-cols-[50%] lg:auto-cols-[20rem]";

  return (
    <List className={list} scrollable="horizontal">
      {children}
    </List>
  );
}

function ContainerItem({ className, children, ...props }) {
  return (
    <li className="snap-start" {...props}>
      {children}
    </li>
  );
}

async function MediaCards({ variant = "poster", fetcher }) {
  const dataList = await fetcher();
  const cards = dataList?.map((data) => (
    <ContainerItem key={data.id}>
      <MediaDisplayCard data={data} variant={variant} />
    </ContainerItem>
  ));

  return cards;
}

function ContentFallback({ variant }) {
  const cards = new Array(10).fill(0).map((_, idx) => {
    return (
      <ContainerItem key={idx}>
        <MediaCardSkeleton variant={variant} />
      </ContainerItem>
    );
  });

  return <Container variant={variant}>{cards}</Container>;
}

export default function MediaSection({
  title = "Media Section",
  variant = "poster",
  fetcher,
}) {
  return (
    <Section>
      <Section.Header>
        <Section.Title>{title}</Section.Title>
      </Section.Header>
      <Section.Content>
        <Suspense fallback={<ContentFallback variant={variant} />}>
          <Container variant={variant}>
            <MediaCards variant={variant} fetcher={fetcher} />
          </Container>
        </Suspense>
      </Section.Content>
    </Section>
  );
}
