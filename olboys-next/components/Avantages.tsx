import Reveal from "./Reveal";

const CARTES = [
  {
    num: "01 · Billetterie",
    titre: "Tu paies moins cher ta place",
    texte: "Tarif préférentiel sur l'abonnement comme sur les billets à l'unité, et un placement réservé.",
    puces: [
      <>60 € de réduction sur l&apos;abonnement <em>(tarif 2025-2026)</em></>,
      "2 € de réduction par match à l'unité",
      "4 rangs réservés en bas du bloc 101",
      "Réservation avant l'ouverture au public sur certains matchs",
    ],
  },
  {
    num: "02 · Déplacements",
    titre: "Tu ne pars jamais seul",
    texte: "Le groupe organise régulièrement les déplacements à l'extérieur.",
    puces: [
      "Bus ou minibus selon les matchs",
      "Regroupement des adhérents quand il n'y en a pas",
      "Accueil négocié avec le club recevant pour installer notre matériel",
    ],
  },
  {
    num: "03 · Événements",
    titre: "Il se passe des choses hors des matchs",
    texte: "La saison ne se résume pas aux quarante minutes de jeu.",
    puces: ["Visite de CO'Met", "Diffusion de matchs en bar", "Réalisation des tifos", "Animations d'avant-match : concours de lancer, accueil musical"],
  },
  {
    num: "04 · Soutien",
    titre: "Ta cotisation fait grandir le groupe",
    texte: "Chaque adhésion finance directement ce qui se voit dans la tribune.",
    puces: [
      "Achat de matériel : bâches, drapeaux, percussions",
      "Droit de soumettre tes idées au groupe",
      "Possibilité de mettre tes compétences au service du collectif",
    ],
  },
  {
    num: "05 · Boutique",
    titre: "Tarif adhérent sur nos produits",
    texte: "Tee-shirts, écharpes et goodies de l'association à prix réduit toute la saison.",
    puces: ["Tee-shirt commandable dès l'adhésion", "Boutique en ligne ouverte pour les commandes supplémentaires"],
  },
  {
    num: "06 · Le reste",
    titre: "Une question ?",
    texte: "Si tu hésites, écris-nous : on répond, et il n'y a pas de mauvaise question quand on veut rejoindre une tribune.",
    puces: ["Réponse par message sur nos réseaux", "Rencontre possible avant un match à CO'Met"],
  },
];

export default function Avantages() {
  return (
    <section className="sec sec--bord" id="avantages">
      <div className="env">
        <div className="tete">
          <div>
            <Reveal as="p" className="eti">
              Avantages
            </Reveal>
            <Reveal as="h2" className="t-xl" delay={80} style={{ marginTop: 20 }}>
              Cinq raisons concrètes.
            </Reveal>
          </div>
          <Reveal as="p" delay={160}>
            Au-delà de l&apos;ambiance, l&apos;adhésion ouvre des droits très concrets sur la billetterie, les
            déplacements et la boutique.
          </Reveal>
        </div>

        <div className="avantages">
          {CARTES.map((c, i) => (
            <Reveal as="article" className="av" delay={(i % 3) * 80} key={c.num}>
              <p className="av-num">{c.num}</p>
              <h3>{c.titre}</h3>
              <p>{c.texte}</p>
              <ul>
                {c.puces.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
