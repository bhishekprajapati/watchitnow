import {
  getMovieRecommendation,
  getTvRecommendation,
} from "@/services/moviedb";
import MediaSection from "./MediaSection";

export default function MediaRecommendation({ mediaType, mediaId }) {
  const recommender =
    mediaType === "movie" ? getMovieRecommendation : getTvRecommendation;

  return (
    <MediaSection
      title="You might like"
      layout="grid"
      fetcher={async (params = { page: 1 }) => {
        "use server";
        return await recommender({ id: mediaId, page: params.page });
      }}
      infinite
    />
  );
}
