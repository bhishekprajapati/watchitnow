import NavBar from "./NavBar";
import Search from "./Search";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="lg:w-screen lg:h-[100dvh] lg:overflow-hidden md:p-[1.56rem] lg:p-8 lg:py-0 lg:pr-0 lg:flex">
        <header className="lg:py-8">
          <NavBar />
        </header>
        <main className="flex-1">
          <div className="px-5 md:px-0 lg:w-full lg:h-full lg:overflow-y-auto scrollbar-track-dark-blue scrollbar-thumb-red scrollbar-thin">
            <div className="relative z-50 lg:sticky lg:top-0">
              <Search />
            </div>
            <div className="lg:px-9">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}
