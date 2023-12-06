import AspectRatio from "@/components/AspectRatio";
import Dropdown from "@/components/Dropdown";
import MediaHero from "@/components/MediaHero";
import { moviedb } from "@/services/moviedb";

import classNames from "classnames";
import { Button } from "@nextui-org/button";
import { IconFilter } from "@tabler/icons-react";

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
  const gridCss = classNames(
    "md:grid",
    "md:grid-cols-2 md:gap-6",
    "lg:grid-cols-3",
    "xl:grid-cols-4"
  );

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
        <ul className={gridCss}>{videoCardList}</ul>
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
