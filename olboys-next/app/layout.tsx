import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://olboys-next.vercel.app";

const DESCRIPTION =
  "OLBOYS, groupe de supporters de l'Orléans Loiret Basket depuis 2024. Bloc 101 à CO'Met, tifos, déplacements. Adhésion saison 2026-2027 ouverte.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "OLBOYS — Supporters de l'Orléans Loiret Basket",
    template: "%s · OLBOYS",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "OLBOYS",
    title: "OLBOYS — Supporters de l'Orléans Loiret Basket",
    description: DESCRIPTION,
    url: SITE,
  },
  twitter: {
    card: "summary_large_image",
    title: "OLBOYS — Supporters de l'Orléans Loiret Basket",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        <Nav />
        <main id="haut">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
