const ITEMS = [
  "Bloc 101",
  "4 rangs réservés",
  "Tifos",
  "Déplacements",
  "Depuis 2024",
  "Orléans Loiret Basket",
  "CO'Met",
];

export default function Bandeau() {
  return (
    <div className="bandeau" aria-hidden="true">
      <div className="piste">
        {[...ITEMS, ...ITEMS].map((texte, i) => (
          <span key={i}>
            {texte} <em>◆</em>
          </span>
        ))}
      </div>
    </div>
  );
}
