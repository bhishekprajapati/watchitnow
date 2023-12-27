import Section from "@/components/Section";
import MediaHero from "../../_components/MediaHero";
import MediaCast from "../../_components/MediaCast";
import MediaRelatedVideos from "../../_components/MediaRelatedVideos";

import { moviedb } from "@/services/db";
import { Suspense } from "react";
import MediaVideosSkeleton from "@/app/ui/skeleton/MediaVideosSkeleton";
import MediaRecommendation from "../../_components/MediaRecommendation";

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
      <MediaHero {...mediaProps} />
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
