"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import { debounce } from "@/utils";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { IconMoodSadFilled } from "@tabler/icons-react";
// const { NEXT_PUBLIC_BASE_IMG_URL } = process.env;

async function fetchSearchResults(query, callback) {
  try {
    const res = await fetch(`/api/search/multi?q=${query}&limit=10`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    await callback(data);
  } catch (err) {
    console.error(err);
  }
}

function SearchResults({ data }) {
  const list = data.map((itemData) => {
    const imageUrl = itemData.posterPath
      ? `https://www.themoviedb.org/t/p/w92${itemData.posterPath}`
      : "/poster-fallback.png";
    return (
      <li key={itemData.id} className="p-4">
        <div className="flex gap-x-4">
          <div className="w-12">
            <div className="relative poster">
              <img
                className="absolute top-0 left-0 w-full object-cover object-center rounded"
                src={imageUrl}
              />
            </div>
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
    <>
      <ul
        className="
          h-full overflow-y-scroll  scrollbar-track-dark-blue scrollbar-thumb-red/75 scrollbar-thin
          [&>:not(:last-child)]:border-b [&>:not(:last-child)]:border-dark-blue
        "
      >
        {list}
      </ul>
    </>
  );
}

function SearchResultEmptyState() {
  return (
    <>
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <IconMoodSadFilled
            className="mb-4 inline-block text-yellow/10"
            width={200}
            height={200}
          />
          <p className="text-heading-sm text-white/50">
            Couldn't find any results!
          </p>
        </div>
      </div>
    </>
  );
}

function SearchForm({ placeholder }) {
  const router = useRouter();

  const inputField = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResultModal, setShowSearchResultModal] = useState(false);

  // debouncing search
  const handleSearch = debounce(250, async (e) => {
    const searchQuery = e.target.value;
    if (!searchQuery) {
      setSearchResults([]);
    }

    await fetchSearchResults(searchQuery, ({ data, _ }) => {
      setSearchResults(data);
    });
  });

  const handleModalVisibility = (e) => {
    const query = e.target.value;
    if (!query) {
      return setShowSearchResultModal(false);
    }

    setShowSearchResultModal(true);
  };

  function handleInput(e) {
    handleModalVisibility(e);
    handleSearch(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    router.push(`/app/search?type=multi&slug=${formData.get("query")}`);
  }

  function handleBlur() {
    setShowSearchResultModal(false);
  }

  function handleFocus(e) {
    if (e.target.value) {
      setShowSearchResultModal(true);
    }
  }

  return (
    <div className="flex-1 group">
      <form
        id="search-form"
        className="overflow-hidden"
        ref={inputField}
        onSubmit={handleSubmit}
        onInput={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
      >
        <input
          id="query"
          name="query"
          className="mb-[.8rem] field-input block w-full [&:focus+span]:translate-x-[0]"
          type="text"
          placeholder={placeholder}
        />

        <span className="-translate-x-[100%] transition-transform border border-greyish-blue/25 block w-full"></span>
      </form>

      <Modal show={true}>
        {searchResults?.length ? (
          <SearchResults data={searchResults} />
        ) : (
          <SearchResultEmptyState />
        )}
      </Modal>
    </div>
  );
}

export default function Search() {
  const path = usePathname();
  return (
    <div className="flex gap-x-6">
      <label htmlFor="search" className="cursor-pointer mt-[0.5rem]">
        <IconSearch className="text-white" stroke={2.5} />
      </label>
      <SearchForm key={path} placeholder="Search for movies and TV series" />
    </div>
  );
}
