import Reveal from "./Reveal";

export default function Boutique() {
  return (
    <section className="sec sec--bord" id="boutique">
      <div className="env">
        <Reveal className="boutique">
          <div className="boutique-txt">
            <p className="eti">Boutique</p>
            <h3 style={{ marginTop: 20 }}>Tee-shirt 2026-2027</h3>
            <p>
              Un tee-shirt est commandable directement au moment de ton adhésion. Si tu en veux d&apos;autres — pour
              la famille, pour un ami que tu veux convertir — la boutique en ligne reste ouverte.
            </p>
            <a
              className="btn btn--grenat"
              href="https://www.helloasso.com/associations/olboys-supporters-de-l-orleans-loiret-basket/boutiques/boutique-site-olboys-2026-2027"
              target="_blank"
              rel="noopener"
            >
              <span>Voir la boutique</span>
              <span className="fl">→</span>
            </a>
          </div>
          <div className="boutique-visu" aria-hidden="true">
            <svg viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M84 24 L54 40 L30 74 L60 96 L70 84 V196 H170 V84 L180 96 L210 74 L186 40 L156 24 C 150 44, 90 44, 84 24 Z"
                fill="#FFD22E"
                stroke="#0C0A0A"
                strokeWidth={5}
                strokeLinejoin="round"
              />
              <circle cx="120" cy="126" r="34" fill="none" stroke="#7A1226" strokeWidth={5} />
              <path
                d="M120 92 V160 M86 126 H154 M94 102 C 112 114, 112 138, 94 150 M146 102 C 128 114, 128 138, 146 150"
                fill="none"
                stroke="#7A1226"
                strokeWidth={4}
              />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
