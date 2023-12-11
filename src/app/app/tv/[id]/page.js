import MediaHero from "../../_components/MediaHero";

export default async function TvPage({ params: { id: tvId } }) {
  return <MediaHero mediaType={"tv"} mediaId={tvId} />;
}
