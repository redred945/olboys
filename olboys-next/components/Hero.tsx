"use client";

import { useEffect, useRef, useState } from "react";

const LIEN_ADHESION =
  "https://www.helloasso.com/associations/olboys-supporters-de-l-orleans-loiret-basket/adhesions/adhesion-olboys-saison-2026-2027";

/* Motif ASCII des lettres O · L · B, un carton = un spectateur */
const O = [".#####.", "##...##", "##...##", "##...##", "##...##", "##...##", "##...##", "##...##", ".#####."];
const L = ["##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "#######"];
const B = ["#####..", "##..##.", "##..##.", "#####..", "#####..", "##..##.", "##..##.", "##..##.", "#####.."];

const MARGE_X = 5;
const MARGE_Y = 3;

type Carton = { id: number; classe: string; retard: number };

function construireTifo(): { cols: number; lignes: number; cartons: Carton[] } {
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
      cartons.push({
        id: id++,
        classe: dansLeMot ? "on" : absent ? "vide" : "",
        retard: y * 26 + x * 14 + Math.random() * 180,
      });
    }
  }
  return { cols, lignes, cartons };
}

export default function Hero() {
  // Le motif utilise Math.random() : on ne le construit qu'après le montage,
  // côté client, pour ne jamais désaccorder le rendu serveur et l'hydratation.
  const [tifo, setTifo] = useState<{ cols: number; lignes: number; cartons: Carton[] } | null>(null);
  const [leves, setLeves] = useState<Set<number>>(new Set());
  const [eclats, setEclats] = useState<Set<number>>(new Set());
  const zoneRef = useRef<HTMLDivElement>(null);
  const calmeRef = useRef(false);

  const lancer = (cartons: Carton[]) => {
    if (calmeRef.current) {
      setLeves(new Set(cartons.map((c) => c.id)));
      return;
    }
    setLeves(new Set());
    cartons.forEach((c) => {
      window.setTimeout(() => {
        setLeves((prec) => new Set(prec).add(c.id));
      }, c.retard);
    });
  };

  useEffect(() => {
    calmeRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const construit = construireTifo();
    setTifo(construit);
    const t = window.setTimeout(() => lancer(construit.cartons), 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rejouer = () => {
    if (tifo) lancer(tifo.cartons);
  };

  // Scintillement aléatoire : des cartons s'embrasent par salves, comme des
  // flashs de portables qui parcourent la tribune. Coupé si l'utilisateur
  // demande moins d'animations.
  useEffect(() => {
    if (!tifo || calmeRef.current) return;
    const allumes = tifo.cartons.filter((c) => c.classe !== "vide");
    const lettres = tifo.cartons.filter((c) => c.classe === "on");
    if (!allumes.length) return;

    const salve = () => {
      const nb = 4 + Math.floor(Math.random() * 7);
      const choisis: number[] = [];
      for (let i = 0; i < nb; i++) {
        const bassin = Math.random() < 0.62 && lettres.length ? lettres : allumes;
        const c = bassin[Math.floor(Math.random() * bassin.length)];
        if (c) choisis.push(c.id);
      }
      setEclats((prec) => {
        const s = new Set(prec);
        choisis.forEach((id) => s.add(id));
        return s;
      });
      window.setTimeout(() => {
        setEclats((prec) => {
          const s = new Set(prec);
          choisis.forEach((id) => s.delete(id));
          return s;
        });
      }, 540);
    };

    const boucle = window.setInterval(salve, 230);
    return () => window.clearInterval(boucle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tifo]);

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
          <div className="tifo" style={{ gridTemplateColumns: `repeat(${tifo.cols}, 1fr)` }}>
            {tifo.cartons.map((c) => (
              <b
                key={c.id}
                className={[c.classe, leves.has(c.id) && "lev", eclats.has(c.id) && "eclat"]
                  .filter(Boolean)
                  .join(" ")}
              />
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
