import type { Metadata } from "next";
import EntetePage from "@/components/EntetePage";
import Adhesion from "@/components/Adhesion";
import CarteMembre from "@/components/CarteMembre";
import Avantages from "@/components/Avantages";
import Final from "@/components/Final";

export const metadata: Metadata = {
  title: "Adhérer",
  description:
    "Adhésion OLBOYS saison 2026-2027 : tarif préférentiel sur l'abonnement et les billets, 4 rangs réservés bloc 101, déplacements et boutique à prix adhérent.",
};

export default function Adherer() {
  return (
    <>
      <EntetePage
        eti="Saison 2026-2027"
        titre={
          <>
            Les adhésions
            <br />
            sont ouvertes.
          </>
        }
        texte="Deux minutes sur HelloAsso, un mail de bienvenue, et tu prends ta place dans le bloc 101."
      />
      <Adhesion />
      <CarteMembre />
      <Avantages />
      <Final />
    </>
  );
}
