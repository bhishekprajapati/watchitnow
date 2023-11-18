import MediaHero from "@/components/MediaHero";

export default async function TvPage({ params: { id: tvSeriesId } }) {
  return (
    <>
      <MediaHero type="tv" mediaId={tvSeriesId} />
    </>
  );
}
