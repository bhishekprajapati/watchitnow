"use client";

import Chip from "@/components/Chip";
import List from "@/components/List";
import Section from "@/components/Section";
import IconVerified from "@/components/Icons/IconVerified";
import {
  IconBrandYoutubeFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import classNames from "classnames";

const VideoCard = ({ data: video, isActive, onPlay }) => {
  const classes = classNames(
    "select-none h-full relative rounded-md p-4",
    "bg-gradient-to-tr from-dark-blue",
    isActive ? "to-greyish-blue/50" : "to-semi-dark-blue"
  );
  return (
    <article className={classes}>
      <div className="group relative mb-4 aspect-video rounded-md">
        {!isActive && (
          <>
            <img
              className="rounded-md w-full h-full object-cover object-center"
              src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
              loading="lazy"
            />

            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <Button
                variant="shadow"
                color="warning"
                radius="full"
                className="scale-[3] opacity-0 pointer-events-none transition-all duration-75 group-hover:opacity-100 group-hover:scale-[1.5] group-hover:pointer-events-auto rounded-full"
                isIconOnly
                onClick={() => onPlay(video.key)}
              >
                <IconPlayerPlayFilled className="m-2" size={36} />
              </Button>
            </div>
          </>
        )}

        {isActive && (
          <iframe
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1&modestbranding=1&rel=0`}
            className="w-full h-full rounded-md"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div
        className="absolute top-0 right-0 p-8 pointer-events-none"
        style={{ opacity: isActive ? 0 : 1 }}
      >
        <Chip className="bg-black/95 backdrop-blur">
          {video?.type ?? "Unknown"}
        </Chip>
      </div>

      <div className="mb-2 flex items-start justify-between">
        <p className="text-lg line-clamp-2">{video?.name}</p>

        <div className="flex items-start justify-between gap-x-2">
          {video?.site === "YouTube" && (
            <IconBrandYoutubeFilled
              className="text-[#FF0000] inline-block"
              size={22}
            />
          )}

          {video?.official && <IconVerified className="inline-block" />}
        </div>
      </div>
    </article>
  );
};

export default function MediaRelatedVideos({ dataList = [] }) {
  // to keep track of running video
  const [activeKey, setActiveKey] = useState(null);

  function handleOnPlay(key) {
    setActiveKey((prev) => key);
  }

  return (
    <>
      {dataList.length && (
        <List
          className="auto-cols-[100%] sm:auto-cols-[50%] md:auto-cols-[40%] xl:auto-cols-[30%] 2xl:auto-cols-[25%] gap-x-8"
          scrollable="horizontal"
        >
          {dataList.map((video) => (
            <List.Item key={video.key}>
              <VideoCard
                data={video}
                isActive={activeKey === video.key}
                onPlay={handleOnPlay}
              />
            </List.Item>
          ))}
        </List>
      )}
    </>
  );
}
