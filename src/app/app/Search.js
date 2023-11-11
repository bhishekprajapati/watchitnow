"use client";

import { usePathname } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

export default function Search() {
  const pathname = usePathname();
  let placeholder;

  switch (pathname) {
    case "/movies":
      placeholder = "Search for movies";
      break;

    case "/tv-series":
      placeholder = "Search for TV series";
      break;

    default:
      placeholder = "Search for movies and TV series";
  }

  return (
    <>
      <div className="flex gap-x-6">
        <label for="search" className="cursor-pointer mt-[0.5rem]">
          <IconSearch className="text-white" stroke={2.5} />
        </label>
        <div className="flex-1 overflow-hidden">
          <input
            id="search"
            className="mb-[.8rem] field-input block w-full [&:focus+span]:translate-x-[0]"
            type="text"
            placeholder={placeholder}
            autoComplete="true"
          />
          <span className="-translate-x-[100%] transition-transform border border-greyish-blue block w-full"></span>
        </div>
      </div>
    </>
  );
}
