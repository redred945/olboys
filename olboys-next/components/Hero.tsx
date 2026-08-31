"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const LIEN_ADHESION =
  "https://www.helloasso.com/associations/olboys-supporters-de-l-orleans-loiret-basket/adhesions/adhesion-olboys-saison-2026-2027";

/* Motif ASCII des lettres O · L · B, un carton = un spectateur */
const O = [".#####.", "##...##", "##...##", "##...##", "##...##", "##...##", "##...##", "##...##", ".#####."];
const L = ["##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "#######"];
const B = ["#####..", "##..##.", "##..##.", "#####..", "#####..", "##..##.", "##..##.", "##..##.", "#####.."];

const MARGE_X = 5;
const MARGE_Y = 3;

type Carton = { id: number; classe: string; style: CSSProperties };

function construireTifo(): { cols: number; cartons: Carton[] } {
  const mot: string[] = [];
  for (let r = 0; r < 9; r++) mot.push(O[r] + "." + L[r] + "." + B[r]);

  const cols = mot[0].length + MARGE_X * 2;
  const lignes = mot.length + MARGE_Y * 2;

  const cartons: Carton[] = [];
  let id = 0;
  for (let y = 0; y < lignes; y++) {
    for (let x = 0; x < cols; x++) {
      const dansLeMot =
        y >= MARGE_Y && y < MARGE_Y + mot.length && x >= MARGE_X && x < MARGE_X + mot[0].length && mot[y - MARGE_Y][x - MARGE_X] === "#";
      const absent = !dansLeMot && Math.random() < 0.22;

      // Toute l'animation est portée par le CSS : on ne fait que semer ici
      // le retard de levée et, pour les lettres, la phase du scintillement.
      // Une seule passe de rendu React, quelle que soit la taille du mur.
      const style: Record<string, string> = {
        "--retard": `${Math.round(y * 26 + x * 14 + Math.random() * 180)}ms`,
      };
      if (dansLeMot) {
        // Décalage et durée propres à chaque carton : les lettres scintillent
        // sans jamais retomber sur un motif régulier. Le départ attend que la
        // vague de levée soit passée.
        style["--sc-retard"] = `${Math.round(1400 + Math.random() * 4400)}ms`;
        style["--sc-duree"] = `${Math.round(2600 + Math.random() * 3000)}ms`;
      }

      cartons.push({
        id: id++,
        classe: dansLeMot ? "on" : absent ? "vide" : "",
        style: style as CSSProperties,
      });
    }
  }
  return { cols, cartons };
}

export default function Hero() {
  // Le motif utilise Math.random() : on ne le construit qu'après le montage,
  // côté client, pour ne jamais désaccorder le rendu serveur et l'hydratation.
  const [tifo, setTifo] = useState<{ cols: number; cartons: Carton[] } | null>(null);
  const [leve, setLeve] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);
  const calmeRef = useRef(false);

  useEffect(() => {
    calmeRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTifo(construireTifo());
    const t = window.setTimeout(() => setLeve(true), 250);
    return () => window.clearTimeout(t);
  }, []);

  // Relance : on repose les cartons, puis on les relève à la frame suivante
  // pour que les transitions CSS repartent bien de zéro.
  const rejouer = () => {
    setLeve(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setLeve(true)));
  };

  // Innovation : la tribune suit le curseur, effet caméra de stade
  function surMouvement(e: React.PointerEvent<HTMLElement>) {
    const zone = zoneRef.current;
    if (!zone || calmeRef.current) return;
    const { innerWidth, innerHeight } = window;
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    zone.style.setProperty("--tilt-y", `${x * 8}deg`);
    zone.style.setProperty("--tilt-x", `${-y * 6}deg`);
  }
  function surSortie() {
    const zone = zoneRef.current;
    if (!zone) return;
    zone.style.setProperty("--tilt-y", "0deg");
    zone.style.setProperty("--tilt-x", "0deg");
  }

  return (
    <section className="heros" onPointerMove={surMouvement} onPointerLeave={surSortie}>
      <div className="tifo-zone" ref={zoneRef} aria-hidden="true">
        {tifo && (
          <div
            className={`tifo ${leve ? "leve" : ""}`}
            style={{ gridTemplateColumns: `repeat(${tifo.cols}, 1fr)` }}
          >
            {tifo.cartons.map((c) => (
              <b key={c.id} className={c.classe} style={c.style} />
            ))}
          </div>
        )}
      </div>
      <div className="voile" aria-hidden="true"></div>

      <div className="env">
        <p className="eti">Supporters de l&apos;Orléans Loiret Basket · Orléans · Depuis 2024</p>
        <h1 className="t-xxl">
          La force de CO&apos;Met,
          <br />
          <span className="j">c&apos;est vous.</span>
        </h1>

        <div className="heros-bas">
          <p>
            Plutôt que de chanter seul dans ton coin, viens le faire avec nous. Quatre rangs réservés en bas du bloc
            101, des tifos, des déplacements et une tribune qui ne s&apos;assoit pas.
          </p>
          <div className="heros-actions">
            <a className="btn" href={LIEN_ADHESION} target="_blank" rel="noopener">
              <span>Adhérer pour 2026-2027</span>
              <span className="fl">→</span>
            </a>
            <a className="btn btn--vide" href="#avantages">
              <span>Ce que ça t&apos;apporte</span>
            </a>
          </div>
        </div>
        <button className="rejouer" type="button" onClick={rejouer}>
          Relancer le tifo
        </button>
      </div>
    </section>
  );
}
