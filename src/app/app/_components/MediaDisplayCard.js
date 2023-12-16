import MediaCard from "@/components/MediaCard";
import Link from "@/components/Link";

import PropTypes from "prop-types";

MediaDisplayCard.propTypes = {
  variant: PropTypes.oneOf(["poster", "backdrop"]),
};

export default function MediaDisplayCard({ data, variant = "poster" }) {
  const { id, title, type, posterPath, backdropPath } = data;

  return (
    <MediaCard>
      <Link className="block mb-2" href={`/app/${type}/${id}`}>
        {variant === "poster" ? (
          <MediaCard.Poster path={posterPath} />
        ) : (
          <MediaCard.Backdrop
            path={backdropPath}
            className="rounded-md overflow-hidden"
          />
        )}
      </Link>
      <MediaCard.Title>{title}</MediaCard.Title>
    </MediaCard>
  );
}
