import LazyImage from "./LazyImage";

import { IconMovie, IconDeviceTv } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

const IMG_BASE_URL = "https://image.tmdb.org/t/p";

function MediaCard({ as: Element = "article", children, className, ...props }) {
  return (
    <Element className={twMerge("select-none", className)} {...props}>
      {children}
    </Element>
  );
}

MediaCard.Still = ({ className, path, ...props }) => {
  return (
    <div className="aspect-[22/33] relative overflow-hidden rounded-xl">
      {!path && (
        <img
          className="w-full h-full object-cover object-center"
          src="/no-poster.png"
          decoding="async"
          loading="lazy"
        />
      )}

      {path && (
        <LazyImage
          alt="poster"
          src={`${IMG_BASE_URL}/original${path}`}
          blurSrc={`${IMG_BASE_URL}/w92${path}`}
          decoding="async"
        />
      )}
    </div>
  );
};

MediaCard.Poster = ({ className, path, ...props }) => {
  return (
    <div className="aspect-[22/33] relative overflow-hidden rounded-xl">
      {!path && (
        <img
          className="w-full h-full object-cover object-center"
          src="/no-poster.png"
          decoding="async"
          loading="lazy"
        />
      )}

      {path && (
        <LazyImage
          alt="poster"
          src={`${IMG_BASE_URL}/w300${path}`}
          blurSrc={`${IMG_BASE_URL}/w92${path}`}
          decoding="async"
        />
      )}
    </div>
  );
};

MediaCard.Backdrop = ({ className, path, ...props }) => {
  return (
    <div className="aspect-video relative overflow-hidden rounded-xl">
      {!path && (
        <img
          className="w-full h-full object-cover object-center"
          src="/no-poster.png"
          decoding="async"
          loading="lazy"
        />
      )}

      {path && (
        <LazyImage
          alt="poster"
          src={`${IMG_BASE_URL}/original${path}`}
          blurSrc={`${IMG_BASE_URL}/w92${path}`}
          decoding="async"
        />
      )}
    </div>
  );
};

MediaCard.Meta = ({ as: Element = "div", children, className, ...props }) => {
  const classes = twMerge("flex items-center gap-x-[0.38rem]", className);
  return (
    <Element className={classes} {...props}>
      {children}
    </Element>
  );
};

MediaCard.Year = ({ as: Element = "span", children, className, ...props }) => {
  const classes = twMerge(
    "text-[0.6875rem] md:text-[0.81rem] text-white text-opacity-75 font-light",
    className
  );
  return (
    <Element className={classes} {...props}>
      {children}
    </Element>
  );
};

MediaCard.Type = ({ children, className, type }) => {
  const isMovie = type === "movie";
  const typeName = isMovie ? "Movie" : "TV Series";

  return (
    <>
      <span className="text-[0.6875rem] md:text-[0.81rem] text-white text-opacity-75 font-light">
        {isMovie ? (
          <IconMovie className="w-[0.625rem] h-[0.625rem] lg:w-[0.75rem] lg:h-[0.75rem]" />
        ) : (
          <IconDeviceTv className="w-[0.625rem] h-[0.625rem] lg:w-[0.75rem] lg:h-[0.75rem]" />
        )}
      </span>
      <span className="text-[0.6875rem] md:text-[0.81rem] text-white text-opacity-75 font-light">
        {typeName}
      </span>
    </>
  );
};

MediaCard.Lang = ({ as: Element = "span", children, className, ...props }) => {
  const classes = twMerge(
    "text-[0.6875rem] md:text-[0.81rem] text-white text-opacity-75 font-light",
    className
  );

  return (
    <Element className={classes} {...props}>
      {children}
    </Element>
  );
};

MediaCard.Title = ({ as: Element = "h3", children, className, ...props }) => {
  const classes = twMerge(
    "text-[0.875rem] md:text-[1.125rem] text-white font-medium line-clamp-1",
    className
  );

  return (
    <Element className={classes} {...props}>
      {children}
    </Element>
  );
};

export default MediaCard;
