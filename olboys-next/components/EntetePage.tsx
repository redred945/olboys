import Parquet from "./Parquet";
import Reveal from "./Reveal";

/** Bandeau de titre en haut des pages intérieures, sur fond de terrain. */
export default function EntetePage({
  eti,
  titre,
  texte,
}: {
  eti: string;
  titre: React.ReactNode;
  texte?: React.ReactNode;
}) {
  return (
    <section className="entete">
      <Parquet />
      <div className="env entete-env">
        <Reveal as="p" className="eti">
          {eti}
        </Reveal>
        <Reveal as="h1" className="t-xl entete-titre" delay={80}>
          {titre}
        </Reveal>
        {texte && (
          <Reveal as="p" className="entete-txt" delay={160}>
            {texte}
          </Reveal>
        )}
      </div>
    </section>
  );
}
