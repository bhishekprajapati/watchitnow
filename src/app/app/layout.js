"use client";

import NavBar from "./NavBar";
import MediaHoverCard from "./_components/MediaHoverCard";
import SearchBar from "./_components/SearchBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="2xl:max-w-[2000px] 2xl:mx-auto">
      <img
        className="fixed z-0 top-[60%] left-[50%] opacity-20 lg:opacity-40 animate-breathe pointer-events-none"
        src="/bg-blue-layer.svg"
        loading="lazy"
      />
      <img
        className="fixed z-0 top-[50%] lg:top-[25%] right-[0] md:right-[-40%] opacity-20 lg:opacity-40 animate-breathe pointer-events-none"
        src="/bg-pink-layer.svg"
        loading="lazy"
      />

      <div className="lg:w-screen xl:w-full lg:h-[100dvh] lg:overflow-hidden md:p-[1.56rem] lg:p-8 lg:py-0 lg:pr-0 lg:flex">
        <header className="lg:py-8">
          <NavBar />
        </header>
        <main className="flex-1 lg:overflow-y-auto scrollbar-track-dark-blue scrollbar-thumb-greyish-blue scrollbar-thin">
          <div className="pt-6 lg:w-full lg:h-full">
            <div className="px-5 md:p-0 relative z-[1000] mb-4 md:mb-4 lg:px-8 lg:py-6 lg:sticky lg:top-0 lg:left-0 lg:right-0 bg-dark-blue/95 backdrop-blur-xl shadow-2xl shadow-dark-blue">
              <SearchBar />
            </div>
            {/* main content area */}
            <div className="pb-2">
              <MediaHoverCard />
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
