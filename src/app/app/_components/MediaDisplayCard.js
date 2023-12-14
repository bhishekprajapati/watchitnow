import MediaCard from "@/components/MediaCard";

import Link from "@/components/Link";

export default function MediaDisplayCard({ data }) {
  const { id, title, type, posterPath } = data;

  return (
    <MediaCard>
      <Link className="block mb-2" href={`/app/${type}/${id}`}>
        <MediaCard.Poster path={posterPath} />
      </Link>
      <MediaCard.Title>{title}</MediaCard.Title>
    </MediaCard>
  );
}
