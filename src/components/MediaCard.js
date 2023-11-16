import MediaCardImageAndHoverCard from "./MediaCardImageAndHoverCard";

import { IconDeviceTv } from "@tabler/icons-react";
import { IconMovie } from "@tabler/icons-react";

/**
 * Supported Image sizes:
 * 1. Poster sizes: "w92", "w154", "w185", "w342", "w500", "w780", "original"
 * 2. Backdrop sizes: "w300", "w780", "w1280", "original"
 */

export default function MediaCard({ data }) {
  const { title, year, lang } = data;
  const isMovie = data.type === "movie";

  return (
    <article>
      <MediaCardImageAndHoverCard data={data} />
      <div>
        <div className="flex items-center gap-x-[0.38rem]">
          <span className="text-[0.6875rem] md:text-[0.81rem] text-white text-opacity-75 font-light">
            {year}
          </span>
          <span className="w-[0.125rem] h-[0.125rem] bg-white bg-opacity-75 rounded-full"></span>
          <span className="text-[0.6875rem] md:text-[0.81rem] text-white text-opacity-75 font-light">
            {isMovie ? (
              <IconMovie className="w-[0.625rem] h-[0.625rem] lg:w-[0.75rem] lg:h-[0.75rem]" />
            ) : (
              <IconDeviceTv />
            )}
          </span>
          <span className="text-[0.6875rem] md:text-[0.81rem] text-white text-opacity-75 font-light">
            {isMovie ? "Movie" : "TV Series"}
          </span>
          <span className="w-[0.125rem] h-[0.125rem] bg-white bg-opacity-75 rounded-full"></span>

          <span className="text-[0.6875rem] md:text-[0.81rem] text-white text-opacity-75 font-light">
            {lang?.toUpperCase() || ""}
          </span>
        </div>
        <h2 className="text-[0.875rem] md:text-[1.125rem] text-white font-medium line-clamp-1">
          {title}
        </h2>
      </div>
    </article>
  );
}
