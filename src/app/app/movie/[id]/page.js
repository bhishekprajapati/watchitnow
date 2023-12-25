import Section from "@/components/Section";
import MediaCast from "../../_components/MediaCast";
import MediaHero from "../../_components/MediaHero";
import MediaRelatedVideos from "../../_components/MediaRelatedVideos";

import { moviedb } from "@/services/db";
import { Suspense } from "react";
import MediaVideosSkeleton from "@/app/ui/skeleton/MediaVideosSkeleton";

async function MovieTrailers({ id }) {
  const res = await moviedb.movieVideos({ id, language: "en" });

  return <MediaRelatedVideos dataList={res.results} />;
}

export const metadata = {
  title: "Movie",
};

export default async function MoviePage({ params: { id: movieId } }) {
  const mediaProps = {
    mediaType: "movie",
    mediaId: movieId,
  };

  return (
    <>
      <MediaHero {...mediaProps} />
      <MediaCast {...mediaProps} />

      <Section>
        <Section.Header>
          <Section.Title>Related Videos</Section.Title>
        </Section.Header>
        <Section.Content>
          <Suspense fallback={<MediaVideosSkeleton />}>
            <MovieTrailers id={movieId} />
          </Suspense>
        </Section.Content>
      </Section>
    </>
  );
}
