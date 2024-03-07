import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";
import { Outfit } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const outfit = Outfit({ style: ["normal"], preload: true, subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <NextTopLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
