"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const LIEN_ADHESION =
  "https://www.helloasso.com/associations/olboys-supporters-de-l-orleans-loiret-basket/adhesions/adhesion-olboys-saison-2026-2027";

const PAGES = [
  { href: "/adherer", libelle: "Adhérer" },
  { href: "/tribune", libelle: "La tribune" },
  { href: "/boutique", libelle: "Boutique" },
  { href: "/contact", libelle: "Contact" },
];

export default function Nav() {
  const [pose, setPose] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const chemin = usePathname();

  useEffect(() => {
    const onScroll = () => setPose(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Un changement de page referme le menu mobile.
  useEffect(() => setOuvert(false), [chemin]);

  return (
    <header className={`nav ${pose ? "pose" : ""}`}>
      <div className="env">
        <Link className="logo" href="/">
          <span className="rond" aria-hidden="true">
            <Logo />
          </span>
          <b>
            OLBOYS
            <i>Fan club · Depuis 2024</i>
          </b>
        </Link>

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

        <nav className={`nav-liens ${ouvert ? "on" : ""}`} id="nav-liens">
          {PAGES.map((p) => {
            const actif = chemin === p.href;
            return (
              <Link
                key={p.href}
                href={p.href}
                className={actif ? "actif" : ""}
                aria-current={actif ? "page" : undefined}
              >
                {p.libelle}
              </Link>
            );
          })}
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
