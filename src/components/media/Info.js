import { IconMovie, IconDeviceTv } from "@tabler/icons-react";

export default function Info({ year, type, lang }) {
  const isMovie = type === "movie";

  return (
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
  );
}
