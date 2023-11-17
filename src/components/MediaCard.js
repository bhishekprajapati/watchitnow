import { IconMovie, IconDeviceTv, IconPhoto } from "@tabler/icons-react";

export function MediaCardLoadingSkeleton() {
  return (
    <article className="bg-semi-dark-blue/75 shadow-md shadow-semi-dark-blue rounded-xl">
      <div className="w-full h-[12rem] p-8 flex items-center justify-center">
        <IconPhoto
          className="w-full h-full text-dark-blue animate-pulse"
          stroke={2}
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex gap-x-2 rounded-md animate-pulse overflow-hidden">
          <span className="h-4 bg-dark-blue flex-1"></span>
          <span className="h-4 bg-dark-blue flex-1"></span>
          <span className="h-4 bg-dark-blue flex-1"></span>
        </div>
        <div className="h-4 bg-dark-blue rounded-md animate-pulse"></div>
      </div>
    </article>
  );
}

/**
 * Supported Image sizes:
 * 1. Poster sizes: "w92", "w154", "w185", "w342", "w500", "w780", "original"
 * 2. Backdrop sizes: "w300", "w780", "w1280", "original"
 */

export default function MediaCard({ data }) {
  const { title, year, lang, posterPath } = data;
  const isMovie = data.type === "movie";

  return (
    <article>
      <picture className="relative group w-full h-[12rem]">
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
          className="w-full h-full rounded-2xl object-cover object-center"
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
