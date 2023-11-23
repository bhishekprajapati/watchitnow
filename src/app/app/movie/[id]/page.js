import { AspectRatio } from "@/components/primitives";
import Dropdown from "@/components/Dropdown";
import MediaHero from "@/components/MediaHero";
import { moviedb } from "@/services/moviedb";
import { IconFilter } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";

const MediaVideoCard = ({ youtubeId }) => {
  return (
    <AspectRatio
      value={16 / 9}
      className="overflow-hidden rounded-lg shadow-xl shadow-black/25"
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  );
};

const MediaRelatedVideos = async ({ movieId, filterPredicate }) => {
  const { results } = await moviedb.movieVideos({
    id: movieId,
    language: "en-US",
  });

  const videos = results.filter((video) => video.official);

  const filterOptions = [
    { name: "All" },
    { name: "Behind the Scenes" },
    { name: "Bloopers" },
    { name: "Clip" },
    { name: "Featurette" },
    { name: "Teaser" },
    { name: "Trailer" },
  ];

  const videoCardList = videos.map((video) => (
    <li key={video.key}>
      <MediaVideoCard youtubeId={video.key} />
    </li>
  ));

  return (
    <>
      <section className="">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-heading-lg font-semibold">
            <span className="bg-yellow text-dark-blue rounded-md px-2 mr-1">
              Official
            </span>{" "}
            Related Videos
          </h2>
          <Dropdown items={filterOptions}>
            <Button
              size="lg"
              endContent={<IconFilter className="text-white" />}
            >
              Filter
            </Button>
          </Dropdown>
        </header>
        <ul className="md:flex md:[&>li]:w-[32%] md:gap-x-[2%] md:[&>:not(:last-child)]:mb-8 md:flex-wrap lg:[&>li]:w-[23.5%] lg:gap-x-[2%]">
          {videoCardList}
        </ul>
      </section>
    </>
  );
};

export default async function MoviePage({ params: { id: movieId } }) {
  return (
    <>
      <div className="mb-16">
        <MediaHero type="movie" mediaId={movieId} />
      </div>

      <MediaRelatedVideos movieId={movieId} />
    </>
  );
}
