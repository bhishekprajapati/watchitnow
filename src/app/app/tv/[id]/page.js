import MediaHero from "../../_components/MediaHero";
import MediaCast from "../../_components/MediaCast";

export default async function TvPage({ params: { id: tvId } }) {
  const mediaProps = {
    mediaType: "tv",
    mediaId: tvId,
  };

  return (
    <>
      <MediaHero {...mediaProps} />
      <MediaCast {...mediaProps} />
    </>
  );
}
