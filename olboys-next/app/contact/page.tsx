import type { Metadata } from "next";
import EntetePage from "@/components/EntetePage";
import Contact from "@/components/Contact";
import Final from "@/components/Final";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter les OLBOYS, supporters de l'Orléans Loiret Basket : Facebook, Instagram et TikTok. Une question sur l'adhésion, une idée de tifo ?",
};

export default function LeContact() {
  return (
    <>
      <EntetePage
        eti="Contact"
        titre={
          <>
            Écris-nous,
            <br />
            on répond.
          </>
        }
        texte="Une question sur l'adhésion, une proposition, une idée de tifo ? Le plus simple reste un message sur nos réseaux."
      />
      <Contact />
      <Final />
    </>
  );
}
