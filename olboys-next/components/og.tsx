import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Carte de partage : le mur de tifo O·L·B, comme sur le héros du site.
   Servie sur Instagram, WhatsApp, Facebook, iMessage… */

const O = [".#####.", "##...##", "##...##", "##...##", "##...##", "##...##", "##...##", "##...##", ".#####."];
const L = ["##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "#######"];
const B = ["#####..", "##..##.", "##..##.", "#####..", "#####..", "##..##.", "##..##.", "##..##.", "#####.."];

const NUIT = "#0C0A0A";
const NUIT_3 = "#211819";
const GRENAT = "#7A1226";
const JAUNE = "#FFD22E";
const OR_C = "#FFE9A8";
const OS = "#F5F1E8";

const MARGE_X = 3;
const MARGE_Y = 3;
const COTE = 36;
const ECART = 5;

export const taille = { width: 1200, height: 630 };
export const typeContenu = "image/png";

const anton = readFile(join(process.cwd(), "components", "Anton-Regular.ttf"));

/** Couleur de chaque carton. Déterministe : la carte ne bouge pas d'un build à l'autre. */
function mur(): string[][] {
  const mot: string[] = [];
  for (let r = 0; r < 9; r++) mot.push(O[r] + "." + L[r] + "." + B[r]);

  const cols = mot[0].length + MARGE_X * 2;
  const lignes = mot.length + MARGE_Y * 2;

  const grille: string[][] = [];
  for (let y = 0; y < lignes; y++) {
    const rangee: string[] = [];
    for (let x = 0; x < cols; x++) {
      const dansLeMot =
        y >= MARGE_Y &&
        y < MARGE_Y + mot.length &&
        x >= MARGE_X &&
        x < MARGE_X + mot[0].length &&
        mot[y - MARGE_Y][x - MARGE_X] === "#";

      if (dansLeMot) {
        // Quelques cartons en or : le scintillement, figé sur l'image.
        rangee.push((x * 5 + y * 3) % 11 === 0 ? OR_C : JAUNE);
      } else {
        rangee.push((x * 7 + y * 13) % 9 === 0 ? NUIT_3 : GRENAT);
      }
    }
    grille.push(rangee);
  }
  return grille;
}

export async function carteOG({ eti, lignes }: { eti: string; lignes: string[] }) {
  const grille = mur();

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: NUIT, position: "relative" }}>
        {/* le mur */}
        <div style={{ position: "absolute", top: 4, left: 6, display: "flex", flexDirection: "column" }}>
          {grille.map((rangee, y) => (
            <div key={y} style={{ display: "flex" }}>
              {rangee.map((couleur, x) => (
                <div
                  key={x}
                  style={{ width: COTE, height: COTE, background: couleur, marginRight: ECART, marginBottom: ECART }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* voile, pour que le texte tienne */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(100deg, rgba(12,10,10,.97) 34%, rgba(12,10,10,.80) 56%, rgba(12,10,10,.30) 100%)",
          }}
        />

        {/* le texte */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 76,
            height: "100%",
            width: 720,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 26 }}>
            <div style={{ width: 34, height: 5, background: JAUNE, marginRight: 14 }} />
            <div style={{ fontSize: 21, color: JAUNE, letterSpacing: 3, textTransform: "uppercase" }}>{eti}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {lignes.map((ligne, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "Anton",
                  fontSize: 88,
                  lineHeight: 0.94,
                  textTransform: "uppercase",
                  color: i === lignes.length - 1 ? JAUNE : OS,
                }}
              >
                {ligne}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: 34 }}>
            <div style={{ fontSize: 22, color: "#B6ADA6", letterSpacing: 3, textTransform: "uppercase" }}>
              Bloc 101 · CO&apos;Met · Orléans
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...taille,
      fonts: [{ name: "Anton", data: await anton, style: "normal", weight: 400 }],
    }
  );
}
