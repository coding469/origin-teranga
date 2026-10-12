import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import EventBar from "@/components/EventBar";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Origin Teranga | Festival culturel africain",
  description:
    "Origin Teranga est un festival culturel africain qui rassemble les générations, les talents et les histoires, entre Dakar et Paris.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased">
        <EventBar />
        {children}
      </body>
    </html>
  );
}
