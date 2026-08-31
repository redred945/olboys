# OLBOYS — site (Next.js)

Refonte du site OLBOYS en Next.js 14 (App Router + TypeScript), à partir de la version HTML/CSS statique.

## Ce qui a changé par rapport à la version statique

- **Next.js 14 + TypeScript + App Router** : la page est découpée en composants React réutilisables (`components/`), un par section.
- **Tifo interactif** : la tribune (le mur de cartons) suit désormais le curseur en 3D, comme une caméra de stade, en plus de l'animation de levée d'origine.
- **Carte adhérent** : nouvelle section avec un aperçu de carte de membre qui bascule en 3D et réagit à la lumière au survol (effet holographique).
- **Chiffres animés** : les statistiques (60 €, 2 €, 4, 2024) s'incrémentent quand elles apparaissent à l'écran, au lieu d'être figées.
- **`next/image`** pour la galerie de la tribune (chargement optimisé, lazy-loading natif).
- Le reste du contenu (adhésion, avantages, boutique, réseaux) est identique au site d'origine.

## Lancer le site en local

Il faut [Node.js](https://nodejs.org) 18 ou plus installé.

```bash
npm install
npm run dev
```

Puis ouvre [http://localhost:3000](http://localhost:3000).

## Build de production

```bash
npm run build
npm run start
```

## Structure

```
app/
  layout.tsx       → structure HTML globale, polices, métadonnées
  page.tsx          → assemble toutes les sections de la page
  globals.css       → tout le design (couleurs, typographie, sections)
components/
  Nav.tsx           → navigation + menu mobile
  Hero.tsx          → écran d'accueil + tifo interactif
  Bandeau.tsx       → bandeau défilant
  Adhesion.tsx      → bloc "billet" d'adhésion
  CarteMembre.tsx   → carte adhérent 3D (nouveau)
  Avantages.tsx     → les 6 cartes d'avantages
  Chiffres.tsx      → statistiques animées
  Tribune.tsx       → galerie photo
  Boutique.tsx      → bloc boutique
  Contact.tsx       → réseaux sociaux
  Final.tsx         → appel à l'action final
  Footer.tsx        → pied de page
  Reveal.tsx        → petit composant utilitaire pour les animations d'apparition au scroll
```

## Remarque

Les photos de la galerie pointent vers `https://olboys.fr/images/...` (comme sur le site actuel). Pour utiliser tes propres photos, place-les dans `public/` et remplace les URLs dans `components/Tribune.tsx`.
