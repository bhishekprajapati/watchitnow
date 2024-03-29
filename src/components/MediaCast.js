import List from "@/components/ui/List";
import Section from "@/components/ui/Section";
import LazyImage from "@/components/ui/LazyImage";
import { getMovieCast, getTvCast } from "@/services/moviedb";
import { IconExclamationMark } from "@tabler/icons-react";
import { IconUserOff } from "@tabler/icons-react";

const IMG_BASE_URL = "https://image.tmdb.org/t/p";

function PersonCard({ className, path, ...props }) {
  return (
    <LazyImage
      className={className}
      src={`${IMG_BASE_URL}/w185${path}`}
      blurSrc={`${IMG_BASE_URL}/w45${path}`}
      decoding="async"
    />
  );
}

async function MediaCast({ mediaType, mediaId }) {
  const fetcher = mediaType === "movie" ? getMovieCast : getTvCast;
  const { data: persons } = await fetcher(mediaId);

  return (
    <Section className="!pr-0">
      <Section.Header>
        <Section.Title>Top Cast</Section.Title>
      </Section.Header>
      <Section.Content>
        {!!!persons.length && (
          <div className="p-4 py-16 flex flex-col items-center justify-center rounded-xl bg-gradient-to-t from-semi-dark-blue/5 to-semi-dark-blue/50 border-2 border-semi-dark-blue">
            <IconExclamationMark
              className="mb-4 text-yellow/80 border border-yellow/80 rounded-full"
              scale={2}
            />
            <span className="text-lg text-yellow/80">No Information</span>
          </div>
        )}
        {!!persons.length && (
          <List
            className="gap-x-4 auto-cols-[33%] sm:auto-cols-[8rem] md:auto-cols-[12rem]"
            scrollable="horizontal"
          >
            {persons?.map((person) => {
              return (
                <li className="snap-start" key={person.id}>
                  <div className="mb-4 aspect-square rounded-full overflow-hidden">
                    {person?.profile_path ? (
                      <PersonCard path={person.profile_path} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-greyish-blue/50">
                        <IconUserOff className="text-semi-dark-blue lg:scale-[2]" />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold line-clamp-1">{person.name}</h3>
                    <span className="line-clamp-1 text-white/25">
                      {person.character}
                    </span>
                  </div>
                </li>
              );
            })}
          </List>
        )}
      </Section.Content>
    </Section>
  );
}

export default MediaCast;
