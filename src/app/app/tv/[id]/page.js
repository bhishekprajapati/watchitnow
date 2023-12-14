import MediaHero from "../../_components/MediaHero";
import MediaCast from "../../_components/MediaCast";
import MediaRelatedVideos from "../../_components/MediaRelatedVideos";

import { moviedb } from "@/services/db";

async function TvTrailers({ id }) {
  const res = await moviedb.tvVideos({ id, language: "en" });

  return <MediaRelatedVideos dataList={res.results} />;
}

export default async function TvPage({ params: { id: tvId } }) {
  const mediaProps = {
    mediaType: "tv",
    mediaId: tvId,
  };

  return (
    <>
      <MediaHero {...mediaProps} />
      <MediaCast {...mediaProps} />
      <TvTrailers id={tvId} />
    </>
  );
}
