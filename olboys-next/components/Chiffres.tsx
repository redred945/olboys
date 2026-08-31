"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { tag: "Abonnement", valeur: 60, suffixe: "€", label: "Économisés sur l'abonnement" },
  { tag: "À l'unité", valeur: 2, suffixe: "€", label: "De moins par match à l'unité" },
  { tag: "Bloc 101", valeur: 4, suffixe: "", label: "Rangs réservés en bas de bloc" },
  { tag: "Depuis", valeur: 2024, suffixe: "", label: "Année de création du groupe" },
];

function Case({
  tag,
  valeur,
  suffixe,
  label,
}: {
  tag: string;
  valeur: number;
  suffixe: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [affiche, setAffiche] = useState(0);
  const [buzzer, setBuzzer] = useState(false);

  // Les segments éteints du panneau : autant de « 8 » que de chiffres.
  const largeur = String(valeur).length;
  const eteints = "8".repeat(largeur);
  const allumes = String(affiche).padStart(largeur, "0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAffiche(valeur);
      return;
    }

    let brefBuzzer = 0;
    const io = new IntersectionObserver(
      ([entree]) => {
        if (!entree.isIntersecting) return;
        io.unobserve(el);

        const duree = 1100;
        const depart = performance.now();
        function tick(maintenant: number) {
          const t = Math.min(1, (maintenant - depart) / duree);
          const ease = 1 - Math.pow(1 - t, 3);
          setAffiche(Math.round(valeur * ease));
          if (t < 1) {
            requestAnimationFrame(tick);
          } else {
            // Buzzer de fin de période quand le compteur se fige.
            setBuzzer(true);
            brefBuzzer = window.setTimeout(() => setBuzzer(false), 850);
          }
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(brefBuzzer);
    };
  }, [valeur]);

  return (
    <div className={`ch ${buzzer ? "ch--buzz" : ""}`} ref={ref}>
      <span className="ch-tag">{tag}</span>
      <b className="ch-val">
        <span className="ch-eteint" aria-hidden="true">
          {eteints}
        </span>
        <span className="ch-allume">{allumes}</span>
        {suffixe && <em>{suffixe}</em>}
      </b>
      <span className="ch-label">{label}</span>
    </div>
  );
}

export default function Chiffres() {
  return (
    <section className="sec tableau-sec">
      <div className="env">
        <div className="tableau">
          <div className="tableau-barre">
            <span className="tableau-id">
              OLBOYS <i aria-hidden="true">◆</i> CO&apos;MET
            </span>
            <span className="tableau-etat">
              <i className="led" aria-hidden="true" />
              Saison 26-27
            </span>
          </div>
          <div className="chiffres">
            {STATS.map((s) => (
              <Case key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
