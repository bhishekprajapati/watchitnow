"use client";

import MediaDisplayCard from "./MediaDisplayCard";
import List from "@/components/List";

import PropTypes from "prop-types";

MediaDisplayList.propTypes = {
  variant: PropTypes.oneOf(["poster", "backdrop"]),
};

export default function MediaDisplayList({
  dataList,
  variant = "poster",
  SlotLastItem,
}) {
  const isPosterVariant = variant === "poster";
  const list = isPosterVariant
    ? "auto-cols-[33%] sm:auto-cols-[8rem] md:auto-cols-[12rem]"
    : "gap-x-6 auto-cols-[90%] sm:auto-cols-[60%] md:auto-cols-[50%] lg:auto-cols-[20rem]";

  return (
    <List className={list} scrollable="horizontal">
      {dataList?.map((data) => (
        <List.Item key={data.id}>
          <MediaDisplayCard data={data} variant={variant} />
        </List.Item>
      ))}
      {SlotLastItem && <List.Item>{SlotLastItem}</List.Item>}
    </List>
  );
}
