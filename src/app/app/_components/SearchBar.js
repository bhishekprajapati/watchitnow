"use client";

import LazyImage from "@/components/LazyImage";
import NoResults from "@/components/states/NoResults";
import SearchError from "@/components/states/SearchError";
import SearchProvider, { SearchContext } from "@/contexts/SearchProvider";
import { debounce } from "@/utils";

import Link from "next/link";
import classNames from "classnames";
import { useContext } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
import { IconSearch } from "@tabler/icons-react";
import { IconSend } from "@tabler/icons-react";
import { useRef } from "react";

function Search({ children }) {
  return (
    <SearchProvider>
      <div className="relative">{children}</div>
    </SearchProvider>
  );
}

function SearchField() {
  const SEARCH_DEBOUNCE_DELAY = 250;

  const ctx = useContext(SearchContext);
  const submitLinkRef = useRef(null);

  const formClasses = classNames(
    "relative flex items-center bg-semi-dark-blue rounded-xl",
    { "!rounded-b-none": ctx.isSearchStateVisible }
  );

  const inputClasses = classNames(
    "block w-full",
    "px-5 py-3",
    "order-2",
    "text-sm placeholder:text-sm md:text-lg md:placeholder:text-lg field-input",
    "[&:focus+span]:translate-x-[0]",
    ctx.error ? "[&:focus~label]:text-red" : "[&:focus~label]:text-white"
  );

  async function handleInput(e) {
    // clean up & normalize query
    const query = e.target.value
      .split(" ")
      .map((word) => word.trim())
      .filter((word) => !!word)
      .join(" ");

    ctx.setQuery(query);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (ctx.query) {
      submitLinkRef.current.click();
    }
  }

  return (
    <form id="search-form" className={formClasses} onSubmit={handleSubmit}>
      <input
        ref={ctx.searchInputRef}
        type="text"
        name="query"
        id="query"
        placeholder="Search for movies and TV series"
        className={inputClasses}
        onInput={debounce(SEARCH_DEBOUNCE_DELAY, handleInput)}
      />
      <label
        htmlFor="query"
        className="ml-5 order-1 text-white/25 transition-colors duration-500 cursor-pointer"
      >
        {ctx.isFetching ? (
          <Spinner size="sm" color="warning" className="w-4 h-4" />
        ) : (
          <IconSearch stroke={2} size={16} />
        )}
      </label>

      <div className="order-3 mr-2">
        {ctx.meta && (
          <span className="px-[1em] py-[.5em] rounded-lg text-xs text-yellow bg-dark-blue whitespace-nowrap">
            {ctx.meta.totalResults} Results
          </span>
        )}
      </div>
      <Link
        href={`/app/search?query=${ctx.query}`}
        className="order-4 px-[1em] py-[.5em] text-xs rounded-lg mr-2 group bg-greyish-blue hover:bg-yellow transition-colors"
        ref={submitLinkRef}
      >
        <IconSend
          size={16}
          className="text-white group-hover:text-dark-blue transition-colors"
        />
      </Link>
    </form>
  );
}

function SearchState({}) {
  const { data, error, searchStateRef, isSearchStateVisible } =
    useContext(SearchContext);

  const hasData = Array.isArray(data) && !!data.length;

  const classes = classNames(
    "absolute bottom-[0] left-0 right-0 translate-y-0 pointer-events-none opacity-0",
    "rounded-b-xl",
    "shadow-2xl shadow-black",
    "bg-semi-dark-blue",
    isSearchStateVisible
      ? "!translate-y-full !pointer-events-auto !opacity-100"
      : ""
  );

  return (
    <div tabIndex="-1" className={classes} ref={searchStateRef}>
      {isSearchStateVisible && (
        <>
          {error && <SearchError />}
          {!error && hasData && <SearchResults />}
          {!error && !hasData && <NoResults />}
        </>
      )}
    </div>
  );
}

function SearchResults() {
  const { data } = useContext(SearchContext);
  const list = data?.map((media) => {
    return (
      <Link
        key={media.type + media.id}
        href={`/app/${media.type}/${media.id}`}
        className="block"
      >
        <li className="snap-start p-4 hover:bg-dark-blue transition-colors duration-250">
          <div className="flex items-start gap-x-4">
            <div className="w-12 aspect-[22/33] rounded-md overflow-hidden">
              {media.posterPath && (
                <LazyImage
                  alt="poster"
                  src={`https://image.tmdb.org/t/p/w300${media.posterPath}`}
                  blurSrc={`https://image.tmdb.org/t/p/w92${media.posterPath}`}
                  decoding="async"
                />
              )}
              {!media.posterPath && (
                <img
                  alt="poster not available"
                  src="/no-poster.png"
                  decoding="async"
                  loading="lazy"
                />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-heading-sm font-light line-clamp-1">
                {media.title}
              </h2>
              <span className="px-[.6em] py-[0.2em] mr-[1em] text-xs text-white rounded bg-greyish-blue capitalize">
                {media.year}
              </span>
              <span className="px-[.6em] py-[0.2em] mr-[1em] text-xs rounded bg-yellow text-dark-blue capitalize">
                {media.type}
              </span>
              <span className="px-[.6em] py-[0.2em] text-xs rounded bg-white text-dark-blue uppercase">
                {media.lang}
              </span>
            </div>
          </div>
        </li>
      </Link>
    );
  });

  return (
    <div className="overflow-hidden rounded-b-lg">
      <ul className="snap-y snap-mandatory max-h-60 overflow-y-auto">{list}</ul>
    </div>
  );
}

export default function SearchBar() {
  const path = usePathname();
  const queryParam = useSearchParams().get("query");

  return (
    <Search key={path + queryParam}>
      <SearchField />
      <SearchState />
    </Search>
  );
}
