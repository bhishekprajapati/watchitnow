"use client";

import MediaCard from "@/components/MediaCard";

import PropTypes from "prop-types";
import MediaLink from "./MediaLink";

MediaDisplayCard.propTypes = {
  variant: PropTypes.oneOf(["poster", "backdrop"]),
};

export default function MediaDisplayCard({ data, variant = "poster" }) {
  const { id, title, type, posterPath, backdropPath } = data;
  console.log(data);
  return (
    <MediaCard
      data-media-card
      data-title={title}
      data-overview={data.overview.substring(0, 80)}
      data-year={
        type === "movie"
          ? data.releaseYear
          : data?.airDates?.first.split("-").at(0)
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
      </MediaLink>
      <MediaCard.Title className="[@media(hover:hover)]:hidden">
        {title}
      </MediaCard.Title>
    </MediaCard>
  );
}
