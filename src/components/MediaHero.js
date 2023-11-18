import { notFound } from "next/navigation";
import MediaPoster from "@/components/MediaPoster";
import { findMovie, findTvSeries } from "@/services/tmdb";
const { NEXT_PUBLIC_BASE_IMG_URL } = process.env;

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
        <picture className="w-full h-full hidden md:block">
          <source
            srcSet={`${NEXT_PUBLIC_BASE_IMG_URL}/original${data["backdrop_path"]}`}
            media="(min-width: 1800px)"
          />
          <source
            srcSet={`${NEXT_PUBLIC_BASE_IMG_URL}/w1280${data["backdrop_path"]}`}
            media="(min-width: 1260px)"
          />
          <source
            srcSet={`${NEXT_PUBLIC_BASE_IMG_URL}/w780${data["backdrop_path"]}`}
            media="(min-width: 768px)"
          />
          <img
            className="w-full h-full rounded-2xl object-cover object-center"
            src={`${NEXT_PUBLIC_BASE_IMG_URL}/w300${data["backdrop_path"]}`}
          />
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-tl from-dark-blue/10 to-dark-blue"></div>
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-bl from-dark-blue/10 to-dark-blue"></div>
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-r from-dark-blue to-dark-blue/5"></div>
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-r from-dark-blue to-dark-blue/5"></div>
        </picture>

        <div className="z-10 pt-12 absolute top-0 right-0 bottom-0 left-0 md:flex md:gap-x-[4%]">
          <div className="md:flex-[2] text-center md:text-left ">
            <div className="w-full sm:w-[50%] md:w-full inline-block">
              <MediaPoster
                className="shadow-2xl shadow-dark-blue"
                path={data["poster_path"]}
              />
            </div>
          </div>

          <div className="md:flex-[8] md:pr-[4%]">
            <h1 className="text-heading-lg font-semibold">{data.title}</h1>
            <p className="text-heading-sm text-[1.4rem] font-light text-white/75">
              {data.overview}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
