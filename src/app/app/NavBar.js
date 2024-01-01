"use client";

import Image from "next/image";
import Link from "@/components/Link";
import { IconHome, IconMovie, IconDeviceTv } from "@tabler/icons-react";
import { Avatar } from "@nextui-org/avatar";
import { Spinner } from "@nextui-org/spinner";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

export default function NavBar() {
  const pathName = usePathname();
  const session = useSession();

  return (
    <nav className="px-4 py-[1.12rem] bg-gradient-to-tr md:bg-gradient-to-b from-semi-dark-blue/10 to-semi-dark-blue/50 md:rounded-2xl lg:h-full lg:px-8 lg:py-9 flex lg:flex-col lg:items-center justify-between">
      <Link href="/">
        <Image width={24} height={24} src="/logo.svg" alt="site-logo" />
      </Link>

      <ul className="flex items-center gap-x-5 md:gap-x-6 lg:flex-col lg:gap-y-6">
        <li>
          <Link href="/app/home">
            <IconHome
              className={`nav-link ${pathName === "/app/home" ? "active" : ""}`}
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
          {session.status === "loading" && <Spinner />}

          {session.status === "authenticated" && (
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Avatar
                  showFallback
                  src={session.data.user.image}
                  name={session.data.user.name}
                  size="sm"
                  isBordered
                  color="success"
                />
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                className="!right-0"
                aria-label="Account Actions"
              >
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<IconLogout size={16} />}
                  onClick={() => signOut({})}
                >
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}

          {session.status === "unauthenticated" && (
            <Avatar name="Guest" isBordered />
          )}
        </li>
      </ul>
    </nav>
  );
}
