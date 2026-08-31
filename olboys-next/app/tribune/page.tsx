import type { Metadata } from "next";
import EntetePage from "@/components/EntetePage";
import Tribune from "@/components/Tribune";
import Chiffres from "@/components/Chiffres";
import Final from "@/components/Final";

export const metadata: Metadata = {
  title: "La tribune",
  description:
    "Le bloc 101 des OLBOYS à CO'Met : photos de tribune, tifos et déplacements du groupe de supporters de l'Orléans Loiret Basket.",
};

export default function LaTribune() {
  return (
    <>
      <EntetePage
        eti="La tribune"
        titre={
          <>
            Ça ressemble
            <br />
            à ça.
          </>
        }
        texte="Quatre rangs en bas du bloc 101, des tifos montés à la main, et des déplacements toute la saison."
      />
      <Tribune />
      <Chiffres />
      <Final />
    </>
  );
}
