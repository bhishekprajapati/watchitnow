"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IconHome,
  IconMovie,
  IconDeviceTv,
  IconBookmark,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();

  return (
    <nav className="px-4 py-[1.12rem] bg-semi-dark-blue md:rounded-2xl lg:h-full lg:px-8 lg:py-9 flex lg:flex-col justify-between">
      <Link className="w-6 h-[1.125rem] md:w-8 md:h-[1.6rem]" href="/">
        <Image width={24} height={24} src="/logo.svg" alt="site-logo" />
      </Link>

      <ul className="flex gap-x-5 md:gap-x-6 lg:block lg:gap-x-0 lg:[&>:not(:last-child)]:mb-8">
        <li>
          <Link href="/app/home">
            <IconHome
              className={`nav-link ${pathName === "/app/home" ? "active" : ""}`}
              fill="true"
            />
          </Link>
        </li>

        <li>
          <Link href="/app/movies">
            <IconMovie
              className={`nav-link fill-none ${
                pathName === "/app/movies" ? "active" : ""
              }`}
            />
          </Link>
        </li>

        <li>
          <Link href="/app/tv-series">
            <IconDeviceTv
              className={`nav-link fill-none ${
                pathName === "/app/tv-series" ? "active" : ""
              }`}
              fill="true"
            />
          </Link>
        </li>

        <li>
          <Link href="/app/bookmarks">
            <IconBookmark
              className={`nav-link ${
                pathName === "/app/bookmarks" ? "active" : ""
              }`}
              fill="true"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
