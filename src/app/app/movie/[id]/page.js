import MediaCast from "../../_components/MediaCast";
import MediaHero from "../../_components/MediaHero";
import MediaRelatedVideos from "../../_components/MediaRelatedVideos";

import { moviedb } from "@/services/db";

async function MovieTrailers({ id }) {
  const res = await moviedb.movieVideos({ id, language: "en" });

  return <MediaRelatedVideos dataList={res.results} />;
}

export default async function MoviePage({ params: { id: movieId } }) {
  const mediaProps = {
    mediaType: "movie",
    mediaId: movieId,
  };

  return (
    <>
      <MediaHero {...mediaProps} />
      <MediaCast {...mediaProps} />
      <MovieTrailers id={movieId} />
    </>
  );
}
