"use client";

import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

async function search({ query }) {
  const res = await fetch(`/api/search/multi?q=${query}&limit=10`);
  return await res.json();
}

function SearchResultsLayout({ children, expand = false }) {
  const classes = classNames(
    "absolute bottom-0 left-0 right-0 translate-y-0 pointer-events-none opacity-0",
    "lg:mx-8 rounded-xl",
    "shadow-2xl shadow-dark-blue",
    "bg-gradient-to-tl from-semi-dark-blue/95 to-[#001F3F]/75 backdrop-blur-3xl",
    "lg:transition-opacity lg:duration-75",
    {
      "!translate-y-full": expand,
      "!pointer-events-auto": expand,
      "!opacity-100": expand,
    }
  );

  return (
    <div tabIndex="-1" className={classes}>
      {children}
    </div>
  );
}

function SearchBar({ className }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query");

  const [results, setResults] = useState(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    (async () => {
      if (query) {
        setIsLoading(true);
        try {
          setResults(await search({ query: query.trim() }));
        } catch (err) {
          setResults({ error: { message: err.message } });
        }
        setShowResults(true);
        setIsLoading(false);
      }
    })();
  }, [query]);

  useEffect(() => {
    if (!query) {
      setResults(null);
      setShowResults(false);
      setIsLoading(false);
    }
  }, [query, results]);

  function handleSubmit(e) {
    console.log("Submitting");

    e.preventDefault();
    router.push(`/app/search?query=${query}`);
  }

  return (
    <div className={twMerge("relative", className)}>
      <div className="relative z-50 lg:px-8 lg:py-6 bg-dark-blue/95 backdrop-blur-3xl shadow-2xl shadow-dark-blue/80">
        <SearchForm
          isLoading={isLoading}
          key={usePathname() + queryParam}
          onInput={(e) => setQuery(e.target.value)}
          onSubmit={handleSubmit}
          debounce
          delay={250}
          defaultValue={queryParam ? queryParam : ""}
        />
      </div>
      <SearchResultsLayout expand={showResults}>
        {showResults && <SearchResults results={results} />}
      </SearchResultsLayout>
    </div>
  );
}

export default function MediaSearchBar() {
  const path = usePathname();
  return <SearchBar key={path} />;
}
