import Reveal from "./Reveal";

const LIEN_ADHESION =
  "https://www.helloasso.com/associations/olboys-supporters-de-l-orleans-loiret-basket/adhesions/adhesion-olboys-saison-2026-2027";

export default function Adhesion() {
  return (
    <section className="sec" id="adhesion">
      <div className="env">
        <div className="tete">
          <div>
            <Reveal as="p" className="eti">
              Saison 2026-2027
            </Reveal>
            <Reveal as="h2" className="t-xl" delay={80} style={{ marginTop: 20 }}>
              Les adhésions sont ouvertes.
            </Reveal>
          </div>
          <Reveal as="p" delay={160}>
            L&apos;adhésion se fait en ligne sur HelloAsso, en deux minutes. Tu reçois ensuite un mail de bienvenue
            avec tous les renseignements pratiques.
          </Reveal>
        </div>

        <Reveal className="billet" delay={80}>
          <div className="billet-corps">
            <h3>Rejoins le groupe</h3>
            <p>
              Adhérer, c&apos;est t&apos;impliquer dans ta passion. Tu te retrouves aux côtés d&apos;autres
              supporters actifs, tu participes aux décisions de la tribune, et tes idées peuvent devenir le prochain
              tifo.
            </p>
            <a className="btn" href={LIEN_ADHESION} target="_blank" rel="noopener">
              <span>Adhérer sur HelloAsso</span>
              <span className="fl">→</span>
            </a>
          </div>
          <div className="billet-souche">
            <div>
              <span className="mono">Saison</span>
              <b>
                2026
                <br />
                2027
              </b>
            </div>
            <div>
              <span className="mono">Emplacement</span>
              <b>Bloc 101</b>
            </div>
            <div>
              <span className="mono">Tee-shirt</span>
              <b>
                Au choix
                <br />à l&apos;adhésion
              </b>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
