import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lepatio-cotonou.bj"),
  title: {
    default: "Le Patio de Cotonou | Cuisine béninoise premium à Cotonou",
    template: "%s | Le Patio de Cotonou",
  },
  description:
    "Restaurant premium à Cotonou : cuisine béninoise, ambiance chic et chaleureuse, terrasse, menu signature et réservation facile.",
  applicationName: "Le Patio de Cotonou",
  keywords: [
    "restaurant Cotonou",
    "cuisine béninoise",
    "Le Patio de Cotonou",
    "restaurant premium Bénin",
    "dîner à Cotonou",
    "réservation restaurant Bénin",
  ],
  authors: [{ name: "Le Patio de Cotonou" }],
  creator: "Le Patio de Cotonou",
  publisher: "Le Patio de Cotonou",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Le Patio de Cotonou | Cuisine béninoise premium à Cotonou",
    description:
      "Ambiance premium, plats inspirés du terroir béninois et accueil chaleureux au cœur de Cotonou.",
    url: "https://lepatio-cotonou.bj",
    siteName: "Le Patio de Cotonou",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Patio de Cotonou",
    description:
      "Cuisine béninoise moderne et ambiance premium à Cotonou.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-[#1C1917]">{children}</body>
    </html>
  );
}
