import Blason from "./Blason";

const SOMBRE = "#2A0A11";

/* Silhouette du tee : épaules, manches, corps, ourlet. */
const CORPS =
  "M84 26 L54 42 L28 76 L60 99 L70 87 V198 H170 V87 L180 99 L212 76 L186 42 L156 26 C 150 47, 90 47, 84 26 Z";

function Tee({ id, dos = false }: { id: string; dos?: boolean }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-tissu`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={dos ? "#F2C623" : "#FFDC55"} />
          <stop offset="52%" stopColor={dos ? "#E5B415" : "#F7C518"} />
          <stop offset="100%" stopColor={dos ? "#C79A0C" : "#DCA70F"} />
        </linearGradient>
        {/* Ombre douce sous les manches et le long du flanc */}
        <linearGradient id={`${id}-ombre`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(120,80,0,.28)" />
          <stop offset="18%" stopColor="rgba(120,80,0,0)" />
          <stop offset="82%" stopColor="rgba(120,80,0,0)" />
          <stop offset="100%" stopColor="rgba(120,80,0,.3)" />
        </linearGradient>
      </defs>

      <path d={CORPS} fill={`url(#${id}-tissu)`} stroke={SOMBRE} strokeWidth="3.4" strokeLinejoin="round" />
      <path d={CORPS} fill={`url(#${id}-ombre)`} />

      <g fill="none" stroke={SOMBRE} strokeWidth="2.4" strokeLinecap="round" opacity=".75">
        {/* côte du col */}
        <path d={dos ? "M84 26 C 92 40, 148 40, 156 26" : "M84 26 C 92 45, 148 45, 156 26"} />
        {/* coutures d'emmanchure */}
        <path d="M70 87 C 76 74, 80 60, 84 47" />
        <path d="M170 87 C 164 74, 160 60, 156 47" />
        {/* ourlets de manches */}
        <path d="M60 99 L70 87" />
        <path d="M180 99 L170 87" />
        {/* ourlet du bas */}
        <path d="M70 188 H170" opacity=".5" />
      </g>

      {!dos && (
        <g transform="translate(120 118) scale(.7)">
          <Blason id={`${id}-blason`} />
        </g>
      )}
    </g>
  );
}

/** Le tee-shirt de la saison, recto floqué et verso uni. */
export default function TeeShirt() {
  return (
    <svg viewBox="0 0 410 252" role="img" aria-label="Tee-shirt OLBOYS jaune, blason floqué sur la poitrine, dos uni">
      {/* le verso, en retrait derrière */}
      <g transform="translate(196 16) scale(.86)">
        <Tee id="tee-dos" dos />
      </g>
      {/* le recto, au premier plan et plus grand */}
      <g transform="translate(0 4) scale(1.08)">
        <Tee id="tee-face" />
      </g>
    </svg>
  );
}
