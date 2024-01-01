import MediaCard from "@/components/MediaCard";

import PropTypes from "prop-types";
import MediaLink from "./MediaLink";
import ButtonPlay from "@/components/ButtonPlay";

MediaDisplayCard.propTypes = {
  variant: PropTypes.oneOf(["poster", "backdrop"]),
};

export default function MediaDisplayCard({ data, variant = "poster" }) {
  const { id, title, type, posterPath, backdropPath } = data;

  return (
    <MediaCard
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
          <MediaCard.Poster path={posterPath} />
        ) : (
          <MediaCard.Backdrop
            path={backdropPath}
            className="rounded-md overflow-hidden"
          />
        )}
        <div className="pointer-events-none absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <ButtonPlay />
        </div>
      </MediaLink>
      <MediaCard.Title className="[@media(hover:hover)]:hidden">
        {title}
      </MediaCard.Title>
    </MediaCard>
  );
}
