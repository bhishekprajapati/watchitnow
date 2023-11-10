import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="px-4 py-[1.12rem] bg-semi-dark-blue md:rounded-2xl lg:h-full lg:px-8 lg:py-9">
      <Link className="w-6 h-[1.125rem] md:w-8 md:h-[1.6rem]" href="/">
        <Image width={24} height={24} src="/logo.svg" alt="site-logo" />
      </Link>
    </nav>
  );
}
