import LazyImage from "./ui/LazyImage";
import ButtonPlay from "@/components/ButtonPlay";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import PropTypes from "prop-types";
import { IconMovie, IconDeviceTv, IconPhoto } from "@tabler/icons-react";

const IMG_BASE_URL = "https://image.tmdb.org/t/p";

function Media({ as: Element = "article", children, className, ...props }) {
  return (
    <Element className={twMerge("select-none", className)} {...props}>
      {children}
    </Element>
  );
}

Media.Still = ({ className, path, ...props }) => {
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

Media.Poster = ({ className, path, ...props }) => {
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

Media.Backdrop = ({ className, path, ...props }) => {
  return (
    <div
      className={twMerge(
        "aspect-video relative overflow-hidden rounded-xl",
        className
      )}
      {...props}
    >
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

Media.Meta = ({ as: Element = "div", children, className, ...props }) => {
  const classes = twMerge("flex items-center gap-x-[0.38rem]", className);
  return (
    <Element className={classes} {...props}>
      {children}
    </Element>
  );
};

Media.Year = ({ as: Element = "span", children, className, ...props }) => {
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

Media.Type = ({ children, className, type }) => {
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

Media.Lang = ({ as: Element = "span", children, className, ...props }) => {
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

Media.Title = ({ as: Element = "h3", children, className, ...props }) => {
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

const MediaLink = function ({ children, className, type, id, ...props }) {
  const href = `/app/${type}/${id}`;
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};

const MediaCard = function ({ data, variant = "poster" }) {
  const { id, title, type, posterPath, backdropPath } = data;

  return (
    <Media
      className="relative group"
      data-media-card
      data-title={title}
      data-overview={data.overview.substring(0, 120)}
      data-year={
        data?.year ||
        (type === "movie"
          ? data.releaseYear
          : data?.airDates?.first.split("-").at(0))
      }
    >
      <MediaLink className="block mb-2" type={type} id={id}>
        {variant === "poster" ? (
          <Media.Poster path={posterPath} />
        ) : (
          <Media.Backdrop
            path={backdropPath}
            className="rounded-md overflow-hidden"
          />
        )}
        <div className="pointer-events-none absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <ButtonPlay />
        </div>
      </MediaLink>
      <Media.Title className="[@media(hover:hover)]:hidden">
        {title}
      </Media.Title>
    </Media>
  );
};

MediaCard.propTypes = {
  variant: PropTypes.oneOf(["poster", "backdrop"]),
};

const Skeleton = ({ variant = "poster" }) => {
  const isPosterVariant = variant === "poster";

  return (
    <div>
      <div className="bg-semi-dark-blue/75 shadow-2xl shadow-semi-dark-blue rounded-xl animate-shine">
        <div
          className={classNames(
            "flex items-center justify-center",
            isPosterVariant ? "aspect-[22/33]" : "aspect-video"
          )}
        >
          <IconPhoto
            className="w-full h-full p-5 lg:p-8 text-dark-blue "
            stroke={1.5}
          />
        </div>
      </div>
      <div className="hidden lg:block py-4">
        <div className="h-4 bg-semi-dark-blue rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export { Media, MediaCard, MediaLink, Skeleton };
