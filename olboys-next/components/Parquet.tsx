"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fond de terrain : parquet sombre + lignes de raquette qui se tracent
 * au scroll, comme un terrain qu'on redessine avant le match.
 * Se place dans un parent en position:relative.
 */
export default function Parquet({
  variante = "sombre",
}: {
  variante?: "sombre" | "jaune";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vu, setVu] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVu(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entree]) => {
        if (!entree.isIntersecting) return;
        setVu(true);
        io.unobserve(el);
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`parquet parquet--${variante} ${vu ? "vu" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        {/* L'ordre des formes pilote le décalage du tracé (voir globals.css) */}
        <g className="terrain" fill="none" pathLength={1}>
          <rect x="40" y="30" width="1120" height="540" pathLength={1} />
          <path d="M600 30 V570" pathLength={1} />
          <circle cx="600" cy="300" r="88" pathLength={1} />

          <rect x="40" y="195" width="200" height="210" pathLength={1} />
          <circle cx="240" cy="300" r="68" pathLength={1} />
          <path d="M40 75 L110 75 A 235 235 0 0 1 110 525 L40 525" pathLength={1} />
          <path d="M78 272 V328" pathLength={1} />
          <circle cx="97" cy="300" r="13" pathLength={1} />

          <rect x="960" y="195" width="200" height="210" pathLength={1} />
          <circle cx="960" cy="300" r="68" pathLength={1} />
          <path d="M1160 75 L1090 75 A 235 235 0 0 0 1090 525 L1160 525" pathLength={1} />
          <path d="M1122 272 V328" pathLength={1} />
          <circle cx="1103" cy="300" r="13" pathLength={1} />
        </g>
      </svg>
    </div>
  );
}
