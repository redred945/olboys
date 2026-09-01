import { carteOG, taille, typeContenu } from "@/components/og";

export const size = taille;
export const contentType = typeContenu;
export const alt = "OLBOYS — supporters de l'Orléans Loiret Basket";

export default function Image() {
  return carteOG({ eti: "Supporters de l'Orléans Loiret Basket", lignes: ["La force de CO'Met,", "c'est vous."] });
}
