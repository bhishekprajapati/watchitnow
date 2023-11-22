import "./globals.css";
import { Providers } from "./providers";
import { Outfit } from "next/font/google";
const outfit = Outfit({ style: ["normal"], preload: true, subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
