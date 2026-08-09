import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ogImage from "@/images/products/stoli.jpg";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "EN.MARK — меблі для дому та HoReCa";
const description = "Столи, крісла та стільці власного виробництва.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.enmark.store"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://www.enmark.store",
    siteName: "EN.MARK",
    locale: "uk_UA",
    type: "website",
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.src],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
