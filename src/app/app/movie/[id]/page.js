import Section from "@/components/ui/Section";
import MediaCast from "@/components/MediaCast";
import MediaHeroSection from "@/components/MediaHeroSection";
import MediaRelatedVideos from "../../_components/MediaRelatedVideos";

import { moviedb } from "@/services/db";
import { Suspense } from "react";
import MediaVideosSkeleton from "@/components/ui/skeleton/MediaVideosSkeleton";
import MediaRecommendation from "../../_components/MediaRecommendation";

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
      <MediaHeroSection {...mediaProps} />
      <MediaCast {...mediaProps} />

      <Section className="!pr-0">
        <Section.Header>
          <Section.Title>Related Videos</Section.Title>
        </Section.Header>
        <Section.Content>
          <Suspense fallback={<MediaVideosSkeleton />}>
            <MovieTrailers id={movieId} />
          </Suspense>
        </Section.Content>
      </Section>

      <MediaRecommendation {...mediaProps} />
    </>
  );
}
