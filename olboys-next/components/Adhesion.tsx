import Reveal from "./Reveal";

const LIEN_ADHESION =
  "https://www.helloasso.com/associations/olboys-supporters-de-l-orleans-loiret-basket/adhesions/adhesion-olboys-saison-2026-2027";

export default function Adhesion() {
  return (
    <section className="sec" id="adhesion">
      <div className="env">
        <Reveal className="billet">
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
