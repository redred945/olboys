/* Le blason OLBOYS, redessiné en vectoriel d'après le flocage du tee-shirt :
   ballon dégradé jaune-or vers grenat, coutures, le mot en travers et les
   deux textes en arc. Net à toutes les tailles, contrairement à une photo. */
export default function Blason({ id = "blason" }: { id?: string }) {
  const SOMBRE = "#2A0A11";
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-ballon`} x1="0" y1="-52" x2="0" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="26%" stopColor="#F7C21B" />
          <stop offset="45%" stopColor="#E4841A" />
          <stop offset="55%" stopColor="#C51F3E" />
          <stop offset="100%" stopColor="#8E1230" />
        </linearGradient>
        <linearGradient id={`${id}-mot`} x1="0" y1="-14" x2="0" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE9A8" />
          <stop offset="52%" stopColor="#FFC61A" />
          <stop offset="100%" stopColor="#E07A12" />
        </linearGradient>
        {/* Les deux chemins qui portent les textes courbes */}
        <path id={`${id}-arc-haut`} d="M -35 -14 A 40 40 0 0 1 35 -14" fill="none" />
        <path id={`${id}-arc-bas`} d="M -33 16 A 40 40 0 0 0 33 16" fill="none" />
        <clipPath id={`${id}-limite`}>
          <circle cx="0" cy="0" r="46" />
        </clipPath>
      </defs>

      <circle cx="0" cy="0" r="52" fill={SOMBRE} />
      <circle cx="0" cy="0" r="46" fill={`url(#${id}-ballon)`} />

      {/* coutures du ballon */}
      <g fill="none" stroke={SOMBRE} strokeWidth="2.6" strokeLinecap="round">
        <path d="M 0 -46 V 46" />
        <path d="M -46 0 H 46" />
        <path d="M -35 -30 C -12 -11, -12 11, -35 30" />
        <path d="M 35 -30 C 12 -11, 12 11, 35 30" />
      </g>

      {/* textes en arc */}
      <g fill={SOMBRE} style={{ fontFamily: "var(--ban), Anton, sans-serif" }}>
        <text fontSize="10.5" letterSpacing="1.9">
          <textPath href={`#${id}-arc-haut`} startOffset="50%" textAnchor="middle">
            DEPUIS 2024
          </textPath>
        </text>
        <text fontSize="10.5" letterSpacing="1.9">
          <textPath href={`#${id}-arc-bas`} startOffset="50%" textAnchor="middle">
            FAN CLUB
          </textPath>
        </text>
      </g>

      {/* le bandeau sombre qui porte le mot, comme sur le flocage */}
      <g clipPath={`url(#${id}-limite)`}>
        <rect x="-50" y="-15" width="100" height="30" fill={SOMBRE} opacity=".92" />
      </g>

      {/* le mot en travers */}
      <text
        x="0"
        y="11"
        textAnchor="middle"
        fontSize="28"
        letterSpacing="0.4"
        fill={`url(#${id}-mot)`}
        stroke={SOMBRE}
        strokeWidth="5"
        paintOrder="stroke"
        strokeLinejoin="round"
        style={{ fontFamily: "var(--ban), Anton, sans-serif" }}
      >
        OLBOYS
      </text>
    </g>
  );
}
