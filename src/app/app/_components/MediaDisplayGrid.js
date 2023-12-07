"use client";

import Section from "@/components/Section";
import Grid from "@/components/Grid";
import ScrollTrigger from "@/components/ScrollTrigger";
import MediaDisplayCard from "./MediaDisplayCard";

import useInfinitePagination from "@/hooks/useInfinitePagination";

import PropTypes from "prop-types";

const renderGridItems = (pages) => {
  const dataList = pages.map((page) => page.data).flat();
  return dataList.map((data) => {
    return (
      <Grid.Item key={data.id}>
        <MediaDisplayCard data={data} />
      </Grid.Item>
    );
  });
};

MediaDisplay.propTypes = {
  heading: PropTypes.string.isRequired,
  initialPage: PropTypes.object.isRequired,
  SlotViewMoreButton: PropTypes.element,
};

async function getTrendingAllToday({ page = 1 }) {
  const res = await fetch(
    `/api/trending?media_type=all&time_window=day&page=${page}`
  );
  return res.json();
}

function MediaDisplay({ heading, initialPage, SlotViewMoreButton }) {
  const pagination = useInfinitePagination({
    initialPage,
    async fetcher({ currPage }) {
      const nextPage = await getTrendingAllToday({
        page: currPage.meta.page + 1,
      });
      return nextPage;
    },
  });

  async function handleOnLoadMore() {
    await pagination.fetchNext();
  }

  return (
    <Section className="relative">
      <Section.Header className="sticky flex items-center justify-between">
        <Section.Title>{heading}</Section.Title>
        {SlotViewMoreButton}
      </Section.Header>
      <Section.Content>
        <Grid key={pagination.pages.length}>
          {renderGridItems(pagination.pages)}
        </Grid>
        <ScrollTrigger trigger={handleOnLoadMore} />
      </Section.Content>
    </Section>
  );
}

export default MediaDisplay;
