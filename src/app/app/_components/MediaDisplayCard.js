import MediaCard from "@/components/MediaCard";
import Link from "@/components/Link";

import PropTypes from "prop-types";
import MediaLink from "./MediaLink";

MediaDisplayCard.propTypes = {
  variant: PropTypes.oneOf(["poster", "backdrop"]),
};

export default function MediaDisplayCard({ data, variant = "poster" }) {
  const { id, title, type, posterPath, backdropPath } = data;

  return (
    <MediaCard>
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
      <MediaCard.Title>{title}</MediaCard.Title>
    </MediaCard>
  );
}
