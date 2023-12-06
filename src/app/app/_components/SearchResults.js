import AspectRatio from "@/components/AspectRatio";
import { IconMoodCry } from "@tabler/icons-react";

function SearchError() {
  return (
    <div className="p-6 text-center text-sm text-red">
      Something went wrong while searching! Please try again after some time.
    </div>
  );
}

function NoResults() {
  return (
    <div className="p-6 text-center">
      <IconMoodCry
        className="inline-block mb-4 text-red/50"
        width={36}
        height={36}
      />
      <p className="mb-2 text-sm text-white/75 ">
        Oops! It seems we couldn't find any results for the given search query.
      </p>

      <p className="hidden lg:block text-sm text-white/75 ">
        Consider refining your search or try another term!
      </p>
    </div>
  );
}

export default function SearchResults({ results: { error, data, meta } }) {
  if (error) {
    return <SearchError />;
  }

  if (!data.length) {
    return <NoResults />;
  }

  const list = data.map((itemData) => {
    const imageUrl = itemData.posterPath
      ? `https://www.themoviedb.org/t/p/w92${itemData.posterPath}`
      : "/poster-fallback.png";
    return (
      <li
        key={itemData.id}
        className="p-4 hover:bg-dark-blue transition-colors duration-250"
      >
        <div className="flex gap-x-4">
          <div className="w-12">
            <AspectRatio value={22 / 33}>
              <img
                className="w-full h-full object-cover object-center rounded"
                src={imageUrl}
              />
            </AspectRatio>
          </div>
          <div className="flex-1">
            <h2 className="text-heading-sm font-light">{itemData.title}</h2>
            <p className="text-white/50 line-clamp-1">{itemData.overview}</p>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className="relative">
      <div className="overflow-x-hidden max-h-60 h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-semi-dark-blue">
        <ul>{list}</ul>
      </div>
      <div className="absolute left-[50%] bottom-0 -translate-x-[50%] translate-y-[50%] text-center">
        <span className="bg-[#002] p-2 px-4 rounded-full text-yellow">{`${meta["total_results"]} results found!`}</span>
      </div>
    </div>
  );
}
