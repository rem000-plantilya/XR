import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { structuredData } from "@/lib/structured-data";
import "./globals.css";

const title = `${site.name} | Table, Chair, Videoke & Tent Rentals`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "XR Rentals",
    "table rental",
    "chair rental",
    "monoblock chair rental",
    "kids chair rental",
    "videoke rental",
    "smart videoke rental",
    "tent rental",
    "party rentals Philippines",
    "table and chair rental Tanza Cavite",
    "videoke rental Tanza",
    "tent rental Cavite",
    "party rentals Cavite",
    "event rentals",
    "rent tables and chairs near me",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  category: "Event rentals",
  other: { "geo.region": "PH-CAV", "geo.placename": `${site.address.locality}, ${site.address.region}` },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfbf7" },
    { media: "(prefers-color-scheme: dark)", color: "#141a26" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-screen bg-base-100 text-base-content antialiased">{children}</body>
    </html>
  );
}
