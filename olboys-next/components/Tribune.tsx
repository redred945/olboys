import Image from "next/image";
import Reveal from "./Reveal";

const PHOTOS = [
  { n: "01", src: "https://olboys.fr/images/1.jpeg", alt: "Les supporters OLBoys en tribune" },
  { n: "02", src: "https://olboys.fr/images/2.jpeg", alt: "Ambiance dans le bloc 101" },
  { n: "03", src: "https://olboys.fr/images/3.jpeg", alt: "Tifo déployé par les OLBoys" },
  { n: "04", src: "https://olboys.fr/images/4.jpeg", alt: "Groupe de supporters à CO'Met" },
  { n: "05", src: "https://olboys.fr/images/5.jpeg", alt: "Déplacement des OLBoys" },
  { n: "06", src: "https://olboys.fr/images/6.jpeg", alt: "Animation d'avant-match" },
  { n: "07", src: "https://olboys.fr/images/7.jpeg", alt: "Les OLBoys en tribune" },
  { n: "08", src: "https://olboys.fr/images/8.jpeg", alt: "Supporters de l'Orléans Loiret Basket" },
];

export default function Tribune() {
  return (
    <section className="sec sec--bord" id="tribune">
      <div className="env">
        <Reveal as="p" className="mono galerie-note">
          Photos prises à CO&apos;Met et en déplacement · Fais glisser pour parcourir
        </Reveal>

        <Reveal delay={80} className="galerie" as="div">
          {PHOTOS.map((p, i) => (
            <figure data-n={p.n} key={p.n}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 600px) 80vw, 420px"
                style={{ objectFit: "cover" }}
                priority={i < 2}
              />
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
