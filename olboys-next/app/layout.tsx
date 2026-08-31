import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OLBOYS — Supporters de l'Orléans Loiret Basket",
  description:
    "OLBOYS, groupe de supporters de l'Orléans Loiret Basket depuis 2024. Bloc 101 à CO'Met, tifos, déplacements. Adhésion saison 2026-2027 ouverte.",
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
        {children}
      </body>
    </html>
  );
}
