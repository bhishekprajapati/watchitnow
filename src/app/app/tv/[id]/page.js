import Section from "@/components/ui/Section";
import MediaHeroSection from "@/components/MediaHeroSection";
import MediaCast from "../../_components/MediaCast";
import MediaRelatedVideos from "../../_components/MediaRelatedVideos";

import { moviedb } from "@/services/db";
import { Suspense } from "react";
import MediaVideosSkeleton from "@/components/ui/skeleton/MediaVideosSkeleton";
import MediaRecommendation from "../../_components/MediaRecommendation";
import TvSeasons from "../../_components/TvSeasons";
import { getSeasons } from "@/services/moviedb";

async function TvTrailers({ id }) {
  const res = await moviedb.tvVideos({ id, language: "en" });

  return <MediaRelatedVideos dataList={res.results} />;
}

export const metadata = {
  title: "Tv Series",
};

export default async function TvPage({ params: { id: tvId } }) {
  const mediaProps = {
    mediaType: "tv",
    mediaId: tvId,
  };

  return (
    <>
      <MediaHeroSection {...mediaProps} />

      <Section>
        <Section.Header>
          <Section.Title>Seasons</Section.Title>
        </Section.Header>
        <Section.Content>
          <Suspense>
            <TvSeasons seasons={await getSeasons(tvId)} />
          </Suspense>
        </Section.Content>
      </Section>

      <MediaCast {...mediaProps} />

      <Section className="!pr-0">
        <Section.Header>
          <Section.Title>Related Videos</Section.Title>
        </Section.Header>
        <Section.Content>
          <Suspense fallback={<MediaVideosSkeleton />}>
            <TvTrailers id={tvId} />
          </Suspense>
        </Section.Content>
      </Section>

      <MediaRecommendation {...mediaProps} />
    </>
  );
}
