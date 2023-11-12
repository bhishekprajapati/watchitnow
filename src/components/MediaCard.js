import { IconDeviceTv } from "@tabler/icons-react";
import { IconMovie } from "@tabler/icons-react";

/**
 * Supported Image sizes:
 * 1. Poster sizes: "w92", "w154", "w185", "w342", "w500", "w780", "original"
 * 2. Backdrop sizes: "w300", "w780", "w1280", "original"
 */

export default function MediaCard({ data }) {
  const { title, year, posterPath, lang } = data;
  const isMovie = data.type === "movie";

  return (
    <article>
      <picture className="w-full h-[12rem] overflow-hidden rounded-2xl">
        <source
          srcSet={`https://www.themoviedb.org/t/p/original${posterPath}`}
          media="(min-width: 1800px)"
        />
        <source
          srcSet={`https://www.themoviedb.org/t/p/w780${posterPath}`}
          media="(min-width: 1260px)"
        />
        <source
          srcSet={`https://www.themoviedb.org/t/p/w500${posterPath}`}
          media="(min-width: 768px)"
        />
        <source
          srcSet={`https://www.themoviedb.org/t/p/w342${posterPath}`}
          media="(min-width: 425px)"
        />
        <img
          className="w-full h-full object-cover object-center"
          src={`https://www.themoviedb.org/t/p/w154${posterPath}`}
        />
      </picture>
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
            {lang.toUpperCase()}
          </span>
        </div>
        <h2 className="text-[0.875rem] md:text-[1.125rem] text-white font-medium line-clamp-1">
          {title}
        </h2>
      </div>
    </article>
  );
}
