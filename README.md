# Draw Master — École de dessin réaliste

Application mobile (PWA) pour apprendre le dessin réaliste, du débutant à l’avancé : portrait, anatomie, vêtements et techniques du réalisme.
Elle fonctionne hors connexion, s’installe sur l’écran d’accueil de l’iPhone et conserve toutes les données sur le téléphone.

## Contenu (v1)

| Module | Discipline | Leçons rédigées |
|---|---|---|
| A. Les fondamentaux | Techniques | 6 (trait, volumes, perspective, lumière, valeurs, mesures) |
| B. Portrait réaliste | Portrait | 6 (crâne Loomis, face, profil, œil, nez, bouche) |
| C. Anatomie et corps humain | Anatomie | 5 (8 têtes, mannequin, cage et bassin, mains, mouvement) |
| D. Vêtements et tissus | Vêtements | 5 (tension, compression, drapés, zigzag, t-shirt) |
| E. Maîtriser le réalisme | Techniques | 3 (ombres portées, matières, mise au carreau) |

Chaque leçon suit la même structure : **A. Objectif · B. Théorie · C. Démonstration** (5 à 8 étapes, chacune illustrée par un SVG original) **· D. Conseils · E. Exercice · F. Validation**.
Les leçons restantes du programme sont listées « en préparation » dans chaque module (non cliquables).

Fonctions : progression (niveaux, % par discipline, déblocage progressif, compétences pratiquées, statistiques, temps d’apprentissage), exercices du jour, espace « Mes dessins » (photos, série, comparaison côte à côte ou par curseur), export / import JSON, et 8 outils (grilles de proportions visage et corps, valeurs de gris, guide lumière interactif, symétrie, visualiseur de références avec grille, minuteur de croquis, glossaire).

## Installer sur iPhone

1. Ouvre l’adresse GitHub Pages dans **Safari** : `https://<utilisateur>.github.io/draw-master/`
2. Bouton **Partager** → **Sur l’écran d’accueil**.
3. Lance l’app une fois connecté : ensuite, elle fonctionne hors connexion.

Pense à exporter une sauvegarde de temps en temps (onglet Progression) : supprimer l’app de l’écran d’accueil efface ses données.

## Développement

```bash
npm install
npm run dev       # serveur local
npm run build     # build de production dans dist/
npm run preview   # tester le build (service worker compris)
```

Pile : React 18, TypeScript, Vite, vite-plugin-pwa (Workbox), IndexedDB (`idb`). Routage par hash (`#/…`) et base relative : le site fonctionne quel que soit le nom du dépôt.

### Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit et publie automatiquement à chaque push sur `main`.
À faire une seule fois : **Settings → Pages → Build and deployment → Source : GitHub Actions**.

### Structure

```
src/content/        cours (un fichier par module) + types, glossaire, échauffements
src/components/     Figure (illustrations par étapes), UI
src/pages/          écrans (accueil, parcours, leçon, exercices, dessins, progression)
src/tools/          outils pédagogiques
src/lib/            stockage IndexedDB, progression, sauvegarde, images
scripts/            icônes, écrans de lancement, rendu des illustrations pour relecture
```

### Ajouter une leçon

Dans le fichier du module (`src/content/<module>.tsx`), ajoute un objet `Lesson` au tableau `lessons` et retire son titre de `planned`.
L’illustration est un dessin découpé en calques : `drawing.layers[i]` est ce qu’on ajoute à l’étape `i` (affiché en sanguine), les calques précédents restent en graphite.
Classes SVG disponibles : `ln` (trait), `lt` (trait fin), `cn` (construction pointillée), `gd` (guide), `lb` (étiquette) ; motifs `url(#hatch)`, `url(#hatchLight)`, `url(#hatchDense)`, `url(#cross)`, dégradés `url(#sphereShade)`, etc. (voir `src/components/Figure.tsx`).

Pour relire toutes les étapes d’une leçon en image : `npx tsx --tsconfig scripts/tsconfig.json scripts/render-figures.tsx /tmp/rendu b4` (nécessite `rsvg-convert`).
