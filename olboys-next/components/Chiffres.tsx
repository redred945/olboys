"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { valeur: 60, prefixe: "", suffixe: " €", label: "Économisés sur l'abonnement" },
  { valeur: 2, prefixe: "", suffixe: " €", label: "De moins par match à l'unité" },
  { valeur: 4, prefixe: "", suffixe: "", label: "Rangs réservés, bloc 101" },
  { valeur: 2024, prefixe: "", suffixe: "", label: "Année de création" },
];

function StatCard({
  valeur,
  prefixe,
  suffixe,
  label,
}: {
  valeur: number;
  prefixe: string;
  suffixe: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [affiche, setAffiche] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduit) {
      setAffiche(valeur);
      return;
    }

    const io = new IntersectionObserver(
      ([entree]) => {
        if (!entree.isIntersecting) return;
        io.unobserve(el);
        const duree = 900;
        const depart = performance.now();
        function tick(maintenant: number) {
          const t = Math.min(1, (maintenant - depart) / duree);
          const ease = 1 - Math.pow(1 - t, 3);
          setAffiche(Math.round(valeur * ease));
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [valeur]);

  return (
    <div className="ch" ref={ref}>
      <b>
        {prefixe}
        {affiche}
        {suffixe}
      </b>
      <span>{label}</span>
    </div>
  );
}

export default function Chiffres() {
  return (
    <section className="sec sec--grenat sec--serree">
      <div className="env" style={{ paddingLeft: 0, paddingRight: 0, maxWidth: "none" }}>
        <div className="chiffres">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
