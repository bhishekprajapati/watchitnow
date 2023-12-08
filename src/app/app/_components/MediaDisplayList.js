"use client";

import MediaDisplayCard from "./MediaDisplayCard";
import List from "@/components/List";

export default function MediaDisplayList({ dataList, SlotLastItem }) {
  return (
    <List
      className="auto-cols-[33%] sm:auto-cols-[8rem] md:auto-cols-[12rem]"
      scrollable="horizontal"
    >
      {dataList?.map((data) => (
        <List.Item key={data.id}>
          <MediaDisplayCard data={data} />
        </List.Item>
      ))}
      {SlotLastItem && <List.Item>{SlotLastItem}</List.Item>}
    </List>
  );
}
