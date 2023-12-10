import { IconMovie, IconDeviceTv } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

const POSTER_BASE_PATH = "https://image.tmdb.org/t/p";

function MediaCard({ as: Element = "article", children, className, ...props }) {
  return (
    <Element className={twMerge("select-none", className)} {...props}>
      {children}
    </Element>
  );
}

MediaCard.Poster = ({ className, path, ...props }) => {
  return (
    <div className="aspect-[22/33] overflow-hidden rounded-xl">
      <div className="h-full">
        <picture className={twMerge("h-full", className)} {...props}>
          <source
            srcSet={`${POSTER_BASE_PATH}/original${path}`}
            media="(min-width: 1800px)"
          />
          <source
            srcSet={`${POSTER_BASE_PATH}/w780${path}`}
            media="(min-width: 1260px)"
          />
          <source
            srcSet={`${POSTER_BASE_PATH}/w500${path}`}
            media="(min-width: 768px)"
          />
          <source
            srcSet={`${POSTER_BASE_PATH}/w342${path}`}
            media="(min-width: 425px)"
          />
          <img
            className="w-full h-full object-cover object-center"
            src={`${POSTER_BASE_PATH}/w300${path}`}
            loading="lazy"
          />
        </picture>
      </div>
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
