import type { Metadata } from "next";

/* Métadonnées d'une page intérieure. Sans ça, Next fait hériter le titre
   et l'URL Open Graph du gabarit : toutes les pages se partageraient sous
   le même nom et pointeraient vers l'accueil. */
export function metaPage({
  titre,
  description,
  chemin,
}: {
  titre: string;
  description: string;
  chemin: string;
}): Metadata {
  const complet = `${titre} · OLBOYS`;
  return {
    title: titre,
    description,
    alternates: { canonical: chemin },
    openGraph: { title: complet, description, url: chemin },
    twitter: { title: complet, description },
  };
}
