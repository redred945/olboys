import { metaPage } from "@/components/meta";
import EntetePage from "@/components/EntetePage";
import Boutique from "@/components/Boutique";
import Final from "@/components/Final";

export const metadata = metaPage({
  titre: "Boutique",
  description:
    "La boutique OLBOYS : tee-shirt 2026-2027 commandable à l'adhésion, écharpes et goodies de l'association au tarif adhérent.",
  chemin: "/boutique",
});

export default function LaBoutique() {
  return (
    <>
      <EntetePage
        eti="Boutique"
        titre={
          <>
            Porte-le
            <br />
            dehors aussi.
          </>
        }
        texte="Le tee-shirt de la saison est commandable dès l'adhésion. La boutique en ligne reste ouverte pour le reste."
      />
      <Boutique />
      <Final />
    </>
  );
}
