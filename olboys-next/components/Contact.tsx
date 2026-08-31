import Reveal from "./Reveal";

const RESEAUX = [
  {
    href: "https://www.facebook.com/p/OLBoys-61569357216768/",
    nom: "Facebook",
    handle: "OLBoys",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/olboys45/",
    nom: "Instagram",
    handle: "@olboys45",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@olboys45",
    nom: "TikTok",
    handle: "@olboys45",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 2h-3v13.5a2.5 2.5 0 1 1-2.5-2.5c.2 0 .3 0 .5.1V10a5.5 5.5 0 1 0 5 5.5V9a6.6 6.6 0 0 0 4 1.3V7.3A3.9 3.9 0 0 1 16 4.5V2Z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section className="sec sec--bord" id="contact">
      <div className="env">
        <Reveal className="reseaux">
          {RESEAUX.map((r) => (
            <a className="res" href={r.href} target="_blank" rel="noopener" key={r.nom}>
              {r.svg}
              <b>{r.nom}</b>
              <span>{r.handle}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
