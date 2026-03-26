import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Drinkers - Official Band Website",
  description:
    "Official website of The Drinkers band. Latest tour dates, music, merch, exclusive content, and fan community. Join the ultimate fan experience!",
  keywords: [
    "The Drinkers",
    "Slovenian rock band",
    "rock music",
    "tour dates",
    "concerts",
    "merchandise",
    "music band Slovenia",
    "rock concerts",
    "band merch",
    "VIP membership",
  ].join(", "),
  authors: [{ name: "The Drinkers" }],
  creator: "The Drinkers",
  publisher: "The Drinkers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://thedrinkers.si"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://thedrinkers.si",
    siteName: "The Drinkers",
    locale: "en_US",
    type: "website",
    title: "The Drinkers - Official Band Website",
    description:
      "Official website of The Drinkers band. Latest tour dates, music, merch, exclusive content, and fan community.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Drinkers Band",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Drinkers - Official Band Website",
    description:
      "Official website of The Drinkers band. Latest tour dates, music, merch, exclusive content, and fan community.",
    images: ["/images/twitter-image.jpg"],
    creator: "@thedrinkers",
    site: "@thedrinkers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};
