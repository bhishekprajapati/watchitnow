import { IconPlayerPlayFilled } from "@tabler/icons-react";
import classNames from "classnames";
const { NEXT_PUBLIC_BASE_IMG_URL } = process.env;

export default function MediaPoster({ path, className = "" }) {
  const classes = classNames(
    "relative w-full poster group overflow-hidden rounded-xl",
    className
  );
  return (
    <div className={classes}>
      <picture className="absolute top-0 left-0 w-full h-full">
        <source
          srcSet={`${NEXT_PUBLIC_BASE_IMG_URL}/original${path}`}
          media="(min-width: 1800px)"
        />
        <source
          srcSet={`${NEXT_PUBLIC_BASE_IMG_URL}/w780${path}`}
          media="(min-width: 1260px)"
        />
        <source
          srcSet={`${NEXT_PUBLIC_BASE_IMG_URL}/w500${path}`}
          media="(min-width: 768px)"
        />
        <source
          srcSet={`${NEXT_PUBLIC_BASE_IMG_URL}/w342${path}`}
          media="(min-width: 425px)"
        />
        <img
          className="w-full h-full rounded-2xl object-cover object-center"
          src={`${NEXT_PUBLIC_BASE_IMG_URL}/w300${path}`}
        />
      </picture>
      <div className="pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute top-0 right-0 bottom-0 left-0  bg-dark-blue/75 "></div>
        <span className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-20 h-20 rounded-full shadow-2xl shadow-dark-blue bg-red flex items-center justify-center">
          <IconPlayerPlayFilled
            className="rotate-45 group-hover:rotate-0 transition-transform duration-150 ease-in-out delay-100"
            width={36}
            height={36}
          />
        </span>
      </div>
    </div>
  );
}
