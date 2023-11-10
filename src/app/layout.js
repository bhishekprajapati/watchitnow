import "./globals.css";
import { Outfit } from "next/font/google";
const outfit = Outfit({ style: ["normal"], preload: true, subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
