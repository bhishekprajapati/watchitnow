import classNames from "classnames";
const { NEXT_PUBLIC_BASE_IMG_URL } = process.env;

export default function MediaPoster({ path, className = "" }) {
  const classes = classNames("relative w-full poster", className);
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
    </div>
  );
}
