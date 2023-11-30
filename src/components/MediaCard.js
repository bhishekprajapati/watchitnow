import {
  IconPhoto,
  IconMovie,
  IconDeviceTv,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

const POSTER_BASE_PATH = "https://www.themoviedb.org/t/p";

function MediaCard({ as: Element = "article", children, className, ...props }) {
  return (
    <Element className={className} {...props}>
      {children}
    </Element>
  );
}

MediaCard.Poster = ({ className, path, hoverOverlay = true, ...props }) => {
  const HoverOverlay = (
    <div className="hidden lg:block pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-dark-blue/75"></div>
      <span className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-16 h-16 rounded-full shadow-2xl shadow-dark-blue bg-yellow flex items-center justify-center">
        <IconPlayerPlayFilled
          className="text-dark-blue rotate-45 group-hover:rotate-0 transition-transform duration-150 ease-in-out delay-75"
          width={32}
          height={32}
        />
      </span>
    </div>
  );

  return (
    <div className="relative h-full group">
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
      {hoverOverlay && HoverOverlay}
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
          <IconDeviceTv />
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

MediaCard.Period = () => {
  return (
    <span className="w-[0.125rem] h-[0.125rem] bg-white bg-opacity-75 rounded-full"></span>
  );
};

MediaCard.Splash = ({ className, ...props }) => {
  return (
    <div className="bg-semi-dark-blue/75 shadow-md shadow-semi-dark-blue rounded-xl">
      <div className="flex items-center justify-center">
        <IconPhoto
          className="w-full h-full p-5 lg:p-8 text-dark-blue animate-pulse"
          stroke={2}
        />
      </div>
      <div className="hidden lg:block p-4">
        <div className="mb-2 flex gap-x-2 rounded-md animate-pulse overflow-hidden">
          <span className="h-4 bg-dark-blue flex-1"></span>
          <span className="h-4 bg-dark-blue flex-1"></span>
          <span className="h-4 bg-dark-blue flex-1"></span>
        </div>
        <div className="h-4 bg-dark-blue rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default MediaCard;
