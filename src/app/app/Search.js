"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

function SearchForm({ placeholder, mediaType }) {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    router.push(`search?type=${mediaType}&slug=${formData.get("query")}`);
  }

  return (
    <form
      id="search-form"
      className="flex-1 overflow-hidden"
      onSubmit={handleSubmit}
    >
      <input
        id="query"
        name="query"
        className="mb-[.8rem] field-input block w-full [&:focus+span]:translate-x-[0]"
        type="text"
        placeholder={placeholder}
      />

      <span className="-translate-x-[100%] transition-transform border border-greyish-blue block w-full"></span>
    </form>
  );
}

export default function Search() {
  const pathname = usePathname();
  let placeholder;
  let mediaType;

  switch (pathname) {
    case "/app/movies":
      placeholder = "Search for movies";
      mediaType = "movie";
      break;

    case "/app/tv-series":
      placeholder = "Search for TV series";
      mediaType = "tv";
      break;

    case "/app/bookmarks":
      placeholder = "Search from bookmarked";
      break;

    default:
      placeholder = "Search for movies and TV series";
      mediaType = "multi";
  }

  return (
    <div className="flex gap-x-6">
      <label htmlFor="search" className="cursor-pointer mt-[0.5rem]">
        <IconSearch className="text-white" stroke={2.5} />
      </label>
      <SearchForm
        key={pathname}
        mediaType={mediaType}
        placeholder={placeholder}
      />
    </div>
  );
}
