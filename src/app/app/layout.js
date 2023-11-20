import NavBar from "./NavBar";
import Search from "./Search";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="lg:w-screen lg:h-screen lg:overflow-hidden md:p-[1.56rem] lg:p-8 lg:py-0 lg:pr-0 lg:flex lg:gap-x-9">
        <header className="lg:py-8">
          <NavBar />
        </header>
        <main className="flex-1">
          <div className="pt-6 px-5 md:px-0 lg:pt-12 lg:pr-12 lg:w-full lg:h-full lg:overflow-y-auto">
            <div className="relative lg:pr-8 mb-4">
              <Search />
            </div>
            <div className="">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}
