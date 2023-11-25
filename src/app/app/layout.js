import NavBar from "./NavBar";
import SearchBar from "./_components/SearchBar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="lg:w-screen lg:h-[100dvh] lg:overflow-hidden md:p-[1.56rem] lg:p-8 lg:py-0 lg:pr-0 lg:flex">
        <header className="lg:py-8">
          <NavBar />
        </header>
        <main className="flex-1 lg:overflow-y-auto scrollbar-track-dark-blue scrollbar-thumb-red scrollbar-thin">
          <div className="pt-6 px-5 md:p-0 lg:w-full lg:h-full">
            <div className="relative z-50 mb-4 md:mb-4 lg:sticky lg:top-0 lg:left-0 lg:right-0">
              <SearchBar />
            </div>
            {/* main content area */}
            <div className="lg:px-8">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}
