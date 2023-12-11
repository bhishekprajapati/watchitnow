import MediaHero from "../../_components/MediaHero";

export default async function MoviePage({ params: { id: movieId } }) {
  return <MediaHero mediaType={"movie"} mediaId={movieId} />;
}
