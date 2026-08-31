"use client";

import { useRef } from "react";
import Logo from "./Logo";
import Reveal from "./Reveal";

export default function CarteMembre() {
  const carteRef = useRef<HTMLDivElement>(null);

  function surMouvement(e: React.PointerEvent<HTMLDivElement>) {
    const el = carteRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 18}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--sheen-op", "1");
  }

  function surSortie() {
    const el = carteRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--sheen-op", "0");
  }

  return (
    <section className="sec sec--bord">
      <div className="env">
        <div className="carte-etiquette">
          <Reveal as="p" className="eti" style={{ display: "inline-flex" }}>
            Aperçu
          </Reveal>
          <Reveal as="h2" delay={80}>
            Ta carte, façon stade.
          </Reveal>
        </div>

        <div className="carte-scene">
          <Reveal delay={120}>
            <div
              ref={carteRef}
              className="carte"
              onPointerMove={surMouvement}
              onPointerLeave={surSortie}
              role="img"
              aria-label="Aperçu de la carte adhérent OLBOYS, saison 2026-2027, bloc 101"
            >
              <div className="carte-sheen" aria-hidden="true" />
              <div className="carte-haut">
                <span className="rond" aria-hidden="true">
                  <Logo />
                </span>
                <span className="mono">Saison 2026 · 2027</span>
              </div>
              <p className="carte-nom">
                Supporter
                <br />
                OLBoys
              </p>
              <div className="carte-bas">
                <div>
                  <span className="mono">Emplacement</span>
                  <b>Bloc 101</b>
                </div>
                <div>
                  <span className="mono">Membre</span>
                  <b>N° —</b>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <p className="mono carte-note" style={{ textAlign: "center" }}>
          Ta carte définitive t&apos;est envoyée après validation de l&apos;adhésion
        </p>
      </div>
    </section>
  );
}
