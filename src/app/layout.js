import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ style: ["normal"], preload: true, subsets: ["latin"] });

export const metadata = {
  title: "WatchItNow!",
  description: "Entertainment web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
