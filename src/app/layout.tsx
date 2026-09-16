import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["Helvetica Neue", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: "#0D0C0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s — ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.positioning,
  keywords: ['Himalayan', 'Sanctuary', 'Craft', 'Atelier', 'KORA', 'Nepal'],
  authors: [{ name: 'Osaid', url: siteConfig.metadataBase }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.metadataBase,
    title: siteConfig.brand.name,
    description: siteConfig.brand.positioning,
    siteName: siteConfig.brand.name,
    images: [
      {
        url: new URL('/opengraph-image', siteConfig.metadataBase).toString(),
        width: 1200,
        height: 630,
        alt: siteConfig.brand.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.brand.name,
    description: siteConfig.brand.positioning,
    images: [new URL('/opengraph-image', siteConfig.metadataBase).toString()],
  },
  alternates: {
    canonical: siteConfig.metadataBase,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://kora-sanctuary.vercel.app'),
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.brand.name,
  description: siteConfig.brand.positioning,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressRegion: "Bagmati",
    postalCode: "44600",
    addressCountry: "NP",
  },
  telephone: siteConfig.owner.whatsappNumber,
  email: siteConfig.owner.email,
  url: siteConfig.metadataBase.toString(),
  sameAs: [
    "https://wa.me/918789627278",
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.owner.name,
  jobTitle: siteConfig.owner.role,
  url: siteConfig.metadataBase.toString(),
  email: siteConfig.owner.email,
  telephone: siteConfig.owner.whatsappNumber,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.owner.location.split(" & ")[0],
    addressCountry: "IN",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.brand.name,
  url: siteConfig.metadataBase.toString(),
  description: siteConfig.brand.positioning,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.metadataBase.toString()}?s={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preload critical CSS */}
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                organizationSchema,
                personSchema,
                websiteSchema,
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${plusJakarta.variable} bg-background text-foreground antialiased selection:bg-accent selection:text-background`}
      >
        {children}
      </body>
    </html>
  );
}
