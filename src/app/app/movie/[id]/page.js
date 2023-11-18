import MediaHero from "@/components/MediaHero";

export default async function MoviePage({ params: { id: movieId } }) {
  return (
    <>
      <MediaHero type="movie" mediaId={movieId} />
    </>
  );
}
