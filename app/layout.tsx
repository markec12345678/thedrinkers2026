import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "The Drinkers",
    "slovenska rock glasba",
    "rock band Slovenia",
    "koncerti Slovenija",
    "glasbena skupina Litija",
    "rock music",
    "concerts",
    "Slovenian rock",
  ],
  authors: [{ name: "The Drinkers" }],
  creator: "The Drinkers",
  publisher: "The Drinkers",
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Slovenian Rock Band`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: ["/og-image.jpg"],
    creator: "@thedrinkers_si",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#dc143c',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sl" className="scroll-smooth">
      <body
        className={`${inter.className} bg-rock-black text-white antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>

        {/* JSON-LD Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MusicGroup',
              name: SITE_CONFIG.name,
              description: SITE_CONFIG.description,
              url: SITE_CONFIG.url,
              sameAs: [
                SITE_CONFIG.social.spotify,
                SITE_CONFIG.social.youtube,
                SITE_CONFIG.social.instagram,
                SITE_CONFIG.social.facebook,
                SITE_CONFIG.social.twitter,
                SITE_CONFIG.social.tiktok,
              ],
              foundingDate: SITE_CONFIG.inception.toString(),
              foundingLocation: SITE_CONFIG.origin,
              genre: SITE_CONFIG.genre,
              logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
              image: `${SITE_CONFIG.url}/og-image.jpg`,
              contactPoint: {
                '@type': 'ContactPoint',
                email: SITE_CONFIG.contact.email,
                telephone: SITE_CONFIG.contact.phone,
                contactType: 'booking',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
