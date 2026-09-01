"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const LIEN_ADHESION =
  "https://www.helloasso.com/associations/olboys-supporters-de-l-orleans-loiret-basket/adhesions/adhesion-olboys-saison-2026-2027";

/* Trois motifs dessinés sur la même grille de 23 × 9, pour que le mur
   puisse basculer de l'un à l'autre carton par carton, comme un vrai tifo. */
const O = [".#####.", "##...##", "##...##", "##...##", "##...##", "##...##", "##...##", "##...##", ".#####."];
const L = ["##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "#######"];
const B = ["#####..", "##..##.", "##..##.", "#####..", "#####..", "##..##.", "##..##.", "##..##.", "#####.."];
const UN = ["..###..", ".####..", "..###..", "..###..", "..###..", "..###..", "..###..", "..###..", ".#####."];
/* Le panneau, l'arceau et le filet. Une sphère à neuf cartons de haut ne
   se lit pas ; un panier, si. */
const PANIER = [
  ".....#############.....",
  ".....#...........#.....",
  ".....#..#######..#.....",
  ".....#..#.....#..#.....",
  ".....#..#######..#.....",
  ".....#############.....",
  ".........#####.........",
  "..........###..........",
  "...........#...........",
];

const cote = (g: string[], d: string[], t: string[]) => g.map((_, r) => `${g[r]}.${d[r]}.${t[r]}`);
const MOTIFS = [
  cote(O, L, B), // O·L·B
  cote(UN, O, UN), // 101 — le zéro reprend le O
  PANIER, // le panier
];

const MARGE_X = 4;
const MARGE_Y = 2;

type Carton = { id: number; classe: string; style: CSSProperties };

function construireTifo(): { cols: number; cartons: Carton[] } {
  const larg = MOTIFS[0][0].length;
  const haut = MOTIFS[0].length;
  const cols = larg + MARGE_X * 2;
  const lignes = haut + MARGE_Y * 2;

  const cartons: Carton[] = [];
  let id = 0;
  for (let y = 0; y < lignes; y++) {
    for (let x = 0; x < cols; x++) {
      const mx = x - MARGE_X;
      const my = y - MARGE_Y;
      const dedans = my >= 0 && my < haut && mx >= 0 && mx < larg;
      const motifs = MOTIFS.map((m) => dedans && m[my][mx] === "#");
      const jamais = !motifs.some(Boolean);
      const absent = jamais && Math.random() < 0.22;

      const classes: string[] = [];
      motifs.forEach((oui, i) => oui && classes.push(`m${i}`));
      if (absent) classes.push("vide");

      // Tout est semé ici en variables CSS : un seul rendu React, le
      // navigateur se charge du reste.
      const style: Record<string, string> = {
        "--retard": `${Math.round(y * 26 + x * 14 + Math.random() * 180)}ms`,
        // Les rangs du fond s'assombrissent : profondeur de tribune.
        "--prof": (0.58 + 0.42 * (y / (lignes - 1))).toFixed(3),
      };
      if (!jamais) {
        style["--sc-retard"] = `${Math.round(1400 + Math.random() * 4400)}ms`;
        style["--sc-duree"] = `${Math.round(2600 + Math.random() * 3000)}ms`;
      }

      cartons.push({ id: id++, classe: classes.join(" "), style: style as CSSProperties });
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
  const murRef = useRef<HTMLDivElement>(null);
  const calmeRef = useRef(false);

  useEffect(() => {
    calmeRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTifo(construireTifo());
    const t = window.setTimeout(() => setLeve(true), 250);
    return () => window.clearTimeout(t);
  }, []);

  // Bascule de motif : on écrit l'attribut directement sur le mur. Passer par
  // un état React ferait reconcilier les 400 cartons à chaque changement.
  useEffect(() => {
    if (!tifo || calmeRef.current) return;
    let n = 0;
    const boucle = window.setInterval(() => {
      n = (n + 1) % MOTIFS.length;
      if (murRef.current) murRef.current.dataset.motif = String(n);
    }, 6800);
    return () => window.clearInterval(boucle);
  }, [tifo]);

  // Relance : on repose les cartons, puis on les relève à la frame suivante
  // pour que les transitions CSS repartent de zéro.
  const rejouer = () => {
    setLeve(false);
    if (murRef.current) murRef.current.dataset.motif = "0";
    requestAnimationFrame(() => requestAnimationFrame(() => setLeve(true)));
  };

  // Inclinaison du mur + poursuite qui suit le curseur, le tout groupé dans
  // une frame pour ne pas lire la géométrie à chaque mouvement de souris.
  const enAttente = useRef<{ x: number; y: number } | null>(null);
  const frame = useRef(0);

  function surMouvement(e: React.PointerEvent<HTMLElement>) {
    if (calmeRef.current) return;
    enAttente.current = { x: e.clientX, y: e.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const zone = zoneRef.current;
      const p = enAttente.current;
      if (!zone || !p) return;
      const { innerWidth, innerHeight } = window;
      zone.style.setProperty("--tilt-y", `${(p.x / innerWidth - 0.5) * 8}deg`);
      zone.style.setProperty("--tilt-x", `${-(p.y / innerHeight - 0.5) * 6}deg`);
      const r = zone.getBoundingClientRect();
      zone.style.setProperty("--dx", `${Math.round(p.x - (r.left + r.width / 2))}px`);
      zone.style.setProperty("--dy", `${Math.round(p.y - (r.top + r.height / 2))}px`);
    });
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
          <>
            <div
              className={`tifo ${leve ? "leve" : ""}`}
              ref={murRef}
              data-motif="0"
              style={{ gridTemplateColumns: `repeat(${tifo.cols}, 1fr)` }}
            >
              {tifo.cartons.map((c) => (
                <b key={c.id} className={c.classe} style={c.style} />
              ))}
            </div>
            <div className="poursuite" />
            <div className="ola" />
          </>
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
