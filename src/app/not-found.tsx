import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-8 w-screen h-screen flex items-center justify-center">
      <div className="p-12 bg-gradient-to-t  from-semi-dark-blue/5 to-semi-dark-blue/50 rounded-xl border-2 border-semi-dark-blue text-center">
        <img className="mb-4 inline-block" src="/not-found.png" />
        <h1 className="text-heading-lg font-normal">Page Not Found</h1>
        <p className="mb-12 text-heading-sm font-normal text-white/50">
          Sorry, the page you’re looking for can’t be found
        </p>

        <Link
          href="/app"
          className="text-heading-md bg-greyish-blue text-white hover:text-white transition-all duration-200 py-[.8em] px-[1.5em] rounded-full shadow-xl hover:shadow-2xl"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
