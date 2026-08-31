export default function Footer() {
  const annee = new Date().getFullYear();
  return (
    <footer className="pied">
      <div className="env">
        <a className="logo" href="#haut">
          <span className="rond" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="17" fill="none" stroke="#7A1226" strokeWidth={3} />
              <path
                d="M20 3 V37 M3 20 H37 M7 8 C 16 16, 16 24, 7 32 M33 8 C 24 16, 24 24, 33 32"
                fill="none"
                stroke="#7A1226"
                strokeWidth={2.4}
              />
            </svg>
          </span>
          <b>
            OLBOYS
            <i>Association de supporters · Orléans</i>
          </b>
        </a>
        <p className="mono">
          © {annee} OLBOYS · Supporters de l&apos;Orléans Loiret Basket
        </p>
      </div>
    </footer>
  );
}
