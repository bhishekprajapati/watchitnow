import NavBar from "./NavBar";
import SearchBar from "./_components/SearchBar";
import Ambience from "@/components/Ambience";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="2xl:max-w-[2000px] 2xl:mx-auto">
        <Ambience />
        <div className="lg:w-screen xl:w-full lg:h-[100dvh] lg:overflow-hidden md:p-[1.56rem] lg:p-8 lg:py-0 lg:pr-0 lg:flex">
          <header className="lg:py-8">
            <NavBar />
          </header>
          <main className="flex-1 lg:overflow-y-auto scrollbar-track-dark-blue scrollbar-thumb-greyish-blue scrollbar-thin">
            <div className="pt-6 px-5 md:p-0 lg:w-full lg:h-full">
              <div className="relative z-[1000] mb-4 md:mb-4 lg:sticky lg:top-0 lg:left-0 lg:right-0">
                <SearchBar />
              </div>
              {/* main content area */}
              <div className="pb-2 lg:px-8 lg:pb-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
