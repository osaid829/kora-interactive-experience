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
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0D0C0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
  description: siteConfig.brand.positioning,
  metadataBase: new URL("https://kora-sanctuary.vercel.app"),
  openGraph: {
    title: siteConfig.brand.name,
    description: siteConfig.brand.positioning,
    siteName: siteConfig.brand.name,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cormorant.variable} ${plusJakarta.variable} bg-background text-foreground antialiased selection:bg-accent selection:text-background`}
      >
        {children}
      </body>
    </html>
  );
}
