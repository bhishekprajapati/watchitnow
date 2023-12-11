import MediaCast from "../../_components/MediaCast";
import MediaHero from "../../_components/MediaHero";

export default async function MoviePage({ params: { id: movieId } }) {
  const mediaProps = {
    mediaType: "movie",
    mediaId: movieId,
  };

  return (
    <>
      <MediaHero {...mediaProps} />
      <MediaCast {...mediaProps} />
    </>
  );
}
