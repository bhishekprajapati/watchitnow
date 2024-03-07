"use client";

import Chip from "@/components/Chip";
import List from "@/components/ui/List";
import IconVerified from "@/components/Icons/IconVerified";
import {
  IconBrandYoutubeFilled,
  IconMoodSadFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import classNames from "classnames";
import LazyImage from "@/components/LazyImage";
import ButtonPlay from "@/components/ButtonPlay";

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
            <LazyImage
              src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
              blurSrc={`https://img.youtube.com/vi/${video.key}/default.jpg`}
              className="rounded-md"
              wrapperProps={{ className: "rounded-md" }}
            />

            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <ButtonPlay size="md" onClick={() => onPlay(video.key)} />
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
      {!!!dataList.length && (
        <div className="p-6 sm:py-16 text-yellow/50 text-center  bg-gradient-to-t from-semi-dark-blue/5 to-semi-dark-blue/50 rounded-xl border-2 border-semi-dark-blue">
          <IconMoodSadFilled className="mb-4 inline-block" size={36} />
          <h2 className="text-lg">No Content here!</h2>
        </div>
      )}
      {!!dataList.length && (
        <List
          className="auto-cols-[90%] sm:auto-cols-[50%] md:auto-cols-[40%] xl:auto-cols-[30%] 2xl:auto-cols-[25%] gap-x-4"
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
