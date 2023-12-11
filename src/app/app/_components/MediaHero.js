import { findMedia, getImdbRating } from "@/services/moviedb";
import MediaCard from "@/components/MediaCard";
import Section from "@/components/Section";
import Tooltip from "@/components/Tooltip";
import Chip from "@/components/Chip";

import { Suspense } from "react";

async function ImdbRatingChip({ id }) {
  try {
    const rating = await getImdbRating(id);

    return (
      <span className="inline-flex items-center gap-2">
        <img
          width={40}
          height={20}
          className="inline-block"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/320px-IMDB_Logo_2016.svg.png"
          alt="Imdb Brand Logo Icon"
          loading="lazy"
        />
        <span className="mr-8 text-heading-sm text-[1.2rem] font-semibold text-yellow">
          {rating}
        </span>
      </span>
    );
  } catch (err) {
    return <></>;
  }
}

async function MediaHero({ mediaType, mediaId }) {
  const isMovie = mediaType === "movie";
  const { data } = await findMedia({ type: mediaType, id: mediaId });

  return (
    <Section>
      <Section.Content className="relative rounded-lg overflow-hidden">
        <MediaCard.Backdrop
          className="pointer-events-none absolute inset-0 block w-full h-full animate-backdrop"
          path={data.backdropPath}
        />

        <div className="pointer-events-none absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-tl from-dark-blue/10 to-dark-blue"></div>
        <div className="pointer-events-none absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-bl from-dark-blue/10 to-dark-blue"></div>
        <div className="pointer-events-none absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-r from-dark-blue to-dark-blue/5"></div>
        <div className="pointer-events-none absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-r from-dark-blue to-dark-blue/5"></div>

        <div className="relative z-50 min-h-[60dvh] lg:flex lg:items-start lg:gap-x-[10%]">
          <div className="lg:flex-1 p-4">
            <div className="mb-2">
              <h1 className="text-heading-sm !text-yellow md:text-heading-lg !font-semibold">
                {data.title}
              </h1>
              <h2 className="text-xl md:text-2xl">{data.tagline}</h2>
            </div>
            <div className="mb-4 md:flex md:gap-2">
              <div className="mb-2">
                <Suspense
                  fallback=<span className="w-20 h-7 mr-8 rounded-lg bg-semi-dark-blue animate-pulse"></span>
                >
                  <ImdbRatingChip id={data.imdbId} />
                </Suspense>
              </div>
              <div className="mb-4 flex items-start gap-2">
                {isMovie && (
                  <Tooltip text="Year">
                    <Chip>
                      {data.releaseDate
                        ?.split("-")
                        .filter((segment) => segment.length === 4)}
                    </Chip>
                  </Tooltip>
                )}
                {isMovie && (
                  <Tooltip text="Runtime">
                    <Chip>{data.runtime}</Chip>
                  </Tooltip>
                )}
                <Tooltip text="Status" className="bg-yellow text-black">
                  <Chip>{data.status}</Chip>
                </Tooltip>
              </div>
            </div>
            <div>
              <p className="mb-6 md:text-lg lg:text-xl !text-white/65">
                {data.overview}
              </p>
              <div>
                {data.genres?.map((genre) => {
                  return (
                    <Chip
                      key={genre?.id}
                      className="mb-2 mr-2 bg-gradient-to-tl from-[rgb(41,49,136)] to-[rgb(111,17,211)]"
                    >
                      {genre?.name}
                    </Chip>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:flex-auto hidden lg:block max-w-[15%] lg:self-center lg:mr-[3%]">
            <MediaCard.Poster path={data.posterPath} />
          </div>
        </div>
      </Section.Content>
    </Section>
  );
}

export default MediaHero;
