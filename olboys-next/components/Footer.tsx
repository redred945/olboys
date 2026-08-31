import Link from "next/link";
import Logo from "./Logo";

const PAGES = [
  { href: "/adherer", libelle: "Adhérer" },
  { href: "/tribune", libelle: "La tribune" },
  { href: "/boutique", libelle: "Boutique" },
  { href: "/contact", libelle: "Contact" },
];

export default function Footer() {
  const annee = new Date().getFullYear();
  return (
    <footer className="pied">
      <div className="env">
        <Link className="logo" href="/">
          <span className="rond" aria-hidden="true">
            <Logo />
          </span>
          <b>
            OLBOYS
            <i>Association de supporters · Orléans</i>
          </b>
        </Link>

        <nav className="pied-liens">
          {PAGES.map((p) => (
            <Link key={p.href} href={p.href}>
              {p.libelle}
            </Link>
          ))}
        </nav>

        <p className="mono">© {annee} OLBOYS · Supporters de l&apos;Orléans Loiret Basket</p>
      </div>
    </footer>
  );
}
