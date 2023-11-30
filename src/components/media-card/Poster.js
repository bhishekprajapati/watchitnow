import AspectRatio from "@/components/AspectRatio";

import PropTypes from "prop-types";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

const POSTER_BASE_PATH = "https://www.themoviedb.org/t/p";

const Poster = ({ path, className }) => {
  return (
    <>
      <picture className={className}>
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
    </>
  );
};

const PosterOverlay = () => {
  return (
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
};

MediaPoster.propTypes = {
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default function MediaPoster({ path, enableOverlay = true }) {
  return (
    <AspectRatio value={22 / 33} className="overflow-hidden rounded-xl">
      <div className="relative h-full group">
        <Poster path={path} className="h-full" />
        {enableOverlay && <PosterOverlay />}
      </div>
    </AspectRatio>
  );
}
