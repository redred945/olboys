import { carteOG, taille, typeContenu } from "@/components/og";

export const size = taille;
export const contentType = typeContenu;
export const alt = "OLBOYS — supporters de l'Orléans Loiret Basket";

export default function Image() {
  return carteOG({ eti: "Saison 2026-2027", lignes: ["Les adhésions", "sont ouvertes."] });
}
