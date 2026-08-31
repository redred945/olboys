"use client";

import { useEffect, useState } from "react";

const LIEN_ADHESION =
  "https://www.helloasso.com/associations/olboys-supporters-de-l-orleans-loiret-basket/adhesions/adhesion-olboys-saison-2026-2027";

export default function Nav() {
  const [pose, setPose] = useState(false);
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    const onScroll = () => setPose(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${pose ? "pose" : ""}`}>
      <div className="env">
        <a className="logo" href="#haut">
          <span className="rond" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="17" fill="none" stroke="#7A1226" strokeWidth={3} />
              <path
                d="M20 3 V37 M3 20 H37 M7 8 C 16 16, 16 24, 7 32 M33 8 C 24 16, 24 24, 33 32"
                fill="none"
                stroke="#7A1226"
                strokeWidth={2.4}
              />
            </svg>
          </span>
          <b>
            OLBOYS
            <i>Fan club · Depuis 2024</i>
          </b>
        </a>

        <button
          className={`burger ${ouvert ? "on" : ""}`}
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={ouvert}
          aria-controls="nav-liens"
          onClick={() => setOuvert((v) => !v)}
        >
          <i></i>
          <i></i>
          <i></i>
        </button>

        <nav
          className={`nav-liens ${ouvert ? "on" : ""}`}
          id="nav-liens"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOuvert(false);
          }}
        >
          <a href="#adhesion">Adhérer</a>
          <a href="#avantages">Avantages</a>
          <a href="#tribune">La tribune</a>
          <a href="#boutique">Boutique</a>
          <a href="#contact">Contact</a>
          <a className="btn" href={LIEN_ADHESION} target="_blank" rel="noopener">
            <span>Adhésion 26-27</span>
            <span className="fl">→</span>
          </a>
        </nav>

        <a className="btn" href={LIEN_ADHESION} target="_blank" rel="noopener">
          <span>Adhésion 26-27</span>
          <span className="fl">→</span>
        </a>
      </div>
    </header>
  );
}
