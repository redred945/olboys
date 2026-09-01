"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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

/* Mosaïque 4 colonnes : deux grandes photos ancrent la grille, les autres
   se glissent autour. Les classes disent l'encombrement de chaque case. */
const FORMATS = ["grande", "", "", "large", "", "", "grande", "large"];

export default function Tribune() {
  const [ouvert, setOuvert] = useState<number | null>(null);
  const fermerRef = useRef<HTMLButtonElement>(null);
  const declencheurRef = useRef<HTMLElement | null>(null);

  const fermer = useCallback(() => setOuvert(null), []);
  const aller = useCallback(
    (pas: number) => setOuvert((i) => (i === null ? i : (i + pas + PHOTOS.length) % PHOTOS.length)),
    []
  );

  const ouvrir = (i: number, e: React.MouseEvent<HTMLElement>) => {
    declencheurRef.current = e.currentTarget;
    setOuvert(i);
  };

  useEffect(() => {
    if (ouvert === null) return;

    const auClavier = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
      else if (e.key === "ArrowRight") aller(1);
      else if (e.key === "ArrowLeft") aller(-1);
    };
    document.addEventListener("keydown", auClavier);

    // On fige le fond et on donne le focus à la fermeture : la visionneuse
    // reste pilotable au clavier.
    const debordement = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    fermerRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", auClavier);
      document.body.style.overflow = debordement;
    };
  }, [ouvert, fermer, aller]);

  // Au retour, le focus revient sur la photo d'où l'on vient.
  useEffect(() => {
    if (ouvert === null) declencheurRef.current?.focus();
  }, [ouvert]);

  const photo = ouvert === null ? null : PHOTOS[ouvert];

  return (
    <section className="sec sec--bord" id="tribune">
      <div className="env">
        <Reveal as="p" className="mono galerie-note">
          Photos prises à CO&apos;Met et en déplacement · Clique pour agrandir
        </Reveal>

        <Reveal delay={80} className="mosaique" as="div">
          {PHOTOS.map((p, i) => (
            <figure className={`mos ${FORMATS[i]}`.trim()} key={p.n}>
              <button type="button" onClick={(e) => ouvrir(i, e)} aria-label={`Agrandir : ${p.alt}`}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 620px) 50vw, (max-width: 1080px) 33vw, 340px"
                  style={{ objectFit: "cover" }}
                  priority={i < 2}
                />
                <span className="mos-n">{p.n}</span>
              </button>
            </figure>
          ))}
        </Reveal>
      </div>

      {photo && (
        <div className="visio" role="dialog" aria-modal="true" aria-label="Photo en grand">
          <button className="visio-fond" type="button" onClick={fermer} aria-label="Fermer" tabIndex={-1} />

          <div className="visio-cadre">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="92vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          <p className="visio-legende mono">
            <b>{photo.n}</b> · {photo.alt}
          </p>

          <button className="visio-btn visio-prec" type="button" onClick={() => aller(-1)} aria-label="Photo précédente">
            ←
          </button>
          <button className="visio-btn visio-suiv" type="button" onClick={() => aller(1)} aria-label="Photo suivante">
            →
          </button>
          <button className="visio-btn visio-fermer" type="button" onClick={fermer} aria-label="Fermer" ref={fermerRef}>
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
