import Reveal from "./Reveal";
import TeeShirt from "./TeeShirt";

const LIEN_BOUTIQUE =
  "https://www.helloasso.com/associations/olboys-supporters-de-l-orleans-loiret-basket/boutiques/boutique-site-olboys-2026-2027";

export default function Boutique() {
  return (
    <section className="sec sec--bord" id="boutique">
      <div className="env">
        <Reveal className="boutique">
          <div className="boutique-txt">
            <p className="eti">Le produit de la saison</p>
            <h3 style={{ marginTop: 20 }}>Tee-shirt 2026-2027</h3>
            <p>
              Jaune OLB, blason floqué sur la poitrine, dos uni. Il est commandable directement au moment de ton
              adhésion. Si tu en veux d&apos;autres — pour la famille, pour un ami que tu veux convertir — la boutique
              en ligne reste ouverte.
            </p>
            <ul className="boutique-liste">
              <li>Compris dans l&apos;adhésion, taille au choix</li>
              <li>Tarif adhérent sur les exemplaires suivants</li>
              <li>À porter en tribune comme dehors</li>
            </ul>
            <a className="btn btn--grenat" href={LIEN_BOUTIQUE} target="_blank" rel="noopener">
              <span>Voir la boutique</span>
              <span className="fl">→</span>
            </a>
          </div>

          <div className="boutique-visu">
            <TeeShirt />
            <p className="mono boutique-faces">Recto floqué · Verso uni</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
