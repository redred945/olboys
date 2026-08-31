import Parquet from "./Parquet";
import Reveal from "./Reveal";

const LIEN_ADHESION =
  "https://www.helloasso.com/associations/olboys-supporters-de-l-orleans-loiret-basket/adhesions/adhesion-olboys-saison-2026-2027";

export default function Final() {
  return (
    <section className="final">
      <Parquet variante="jaune" />
      <div className="env">
        <Reveal as="h2">
          Debout,
          <br />
          bloc 101.
        </Reveal>
        <Reveal delay={80}>
          <a className="btn" href={LIEN_ADHESION} target="_blank" rel="noopener">
            <span>Adhérer pour 2026-2027</span>
            <span className="fl">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
