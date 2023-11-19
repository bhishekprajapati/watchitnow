import { notFound } from "next/navigation";
import MediaPoster from "@/components/MediaPoster";
import Badge from "./Badge";
import { findMovie, findTvSeries } from "@/services/tmdb";
import { IconStarFilled } from "@tabler/icons-react";
const { NEXT_PUBLIC_BASE_IMG_URL } = process.env;

function formatGenres(genres) {
  let formatted = "";
  genres.forEach(
    (genre, idx) => (formatted += `${idx ? ", " : ""}${genre.name}`)
  );
  return formatted;
}

function BackdropImage({ path }) {
  return (
    <>
      <picture className="w-full h-full hidden md:block">
        <source
          srcSet={`${NEXT_PUBLIC_BASE_IMG_URL}/original${path}`}
          media="(min-width: 1800px)"
        />
        <source
          srcSet={`${NEXT_PUBLIC_BASE_IMG_URL}/w1280${path}`}
          media="(min-width: 1260px)"
        />
        <source
          srcSet={`${NEXT_PUBLIC_BASE_IMG_URL}/w780${path}`}
          media="(min-width: 768px)"
        />
        <img
          className="w-full h-full rounded-2xl object-cover object-center"
          src={`${NEXT_PUBLIC_BASE_IMG_URL}/w300${path}`}
        />
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-tl from-dark-blue/10 to-dark-blue"></div>
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-bl from-dark-blue/10 to-dark-blue"></div>
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-r from-dark-blue to-dark-blue/5"></div>
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-r from-dark-blue to-dark-blue/5"></div>
      </picture>
    </>
  );
}

function PosterImage({ path }) {
  return (
    <>
      <MediaPoster className="shadow-2xl shadow-dark-blue" path={path} />
    </>
  );
}

function Header(props) {
  return (
    <>
      <h1 className="relative text-heading-lg font-semibold mb-1">
        {props.title}
      </h1>
      <h2 className="text-heading-sm font-medium mb-8">{props.tagline}</h2>
    </>
  );
}

function MovieBadges(props) {
  return (
    <>
      <span>
        <IconStarFilled className="text-[#DBA506]" />
        {}
      </span>
      <Badge tooltip="Year">{props.releaseYear}</Badge>
      <Badge tooltip="Runtime">{props.runtime}</Badge>
    </>
  );
}

function Overview(props) {
  return (
    <p className="text-heading-sm text-[1.4rem] font-light text-white/75">
      {props.overview}
    </p>
  );
}

function Genres(props) {
  return (
    <div>
      <span className="text-heading-sm text-white text-[1.2rem] mr-4">
        Genres:
      </span>
      <span className="text-heading-sm font-light text-[1.2rem] text-white/75">
        {formatGenres(props.genres)}
      </span>
    </div>
  );
}

export default async function MediaHero({ type = "movie", mediaId }) {
  const dataProvider = type === "movie" ? findMovie : findTvSeries;
  const { status, data } = await dataProvider(mediaId);

  if (status === 404) {
    return notFound();
  }

  if (status !== 200) {
    return <></>;
  }

  return (
    <>
      <section className="relative w-full md:h-[80vh]">
        <BackdropImage path={data.backdropPath} />

        <div className="z-10 pt-12 absolute top-0 right-0 bottom-0 left-0 md:flex md:gap-x-[4%]">
          <div className="md:flex-[2] text-center md:text-left ">
            <div className="w-full sm:w-[50%] md:w-full inline-block">
              <PosterImage path={data.posterPath} />
            </div>
          </div>

          <div className="md:flex-[8] md:pr-[4%]">
            <Header {...data} />
            <div className="mb-2 flex gap-x-2">
              <MovieBadges {...data} />
            </div>
            <Overview {...data} />

            <Genres {...data} />
          </div>
        </div>
      </section>
    </>
  );
}
