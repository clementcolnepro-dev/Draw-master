/**
 * Onglet « Livre » : cours à feuilleter page par page.
 * Chaque page = une étape, un texte court et une illustration.
 * Les illustrations réutilisent les dessins guidés (g = id du guide, step = étape, comptée à partir de 0)
 * ou des schémas Clip Studio Paint (calques, réglages, listes).
 */

export interface BookLayer {
  /** Nom du calque */
  n: string;
  /** Mode de fusion affiché */
  mode?: string;
  /** Opacité en % */
  op?: number;
  /** Écrêté au calque inférieur */
  clip?: boolean;
  /** Dossier de calques */
  folder?: boolean;
  /** Calque rangé dans le dossier au-dessus */
  sub?: boolean;
  /** Calque masqué */
  off?: boolean;
  /** Calque mis en évidence sur la page */
  hi?: boolean;
  /** Couleur de la vignette */
  sw?: string;
  /** Calque vectoriel */
  vec?: boolean;
  /** Masque de calque */
  mask?: boolean;
}

export type BookFig =
  | { g: string; step: number }
  | { layers: BookLayer[] }
  | { rows: [string, string][]; head: string }
  | { list: string[]; on?: number; head: string }
  | { brushes: true }
  | { workspace: true };

export interface BookPage {
  title: string;
  text: string;
  fig: BookFig;
}

export interface BookChapter {
  title: string;
  pages: BookPage[];
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  chapters: BookChapter[];
}

const g = (id: string, step: number): BookFig => ({ g: id, step });
const p = (title: string, text: string, fig: BookFig): BookPage => ({ title, text, fig });

const SKIN = '#e9c4a6';
const HAIR = '#6b4a3a';
const CLOTH = '#5b7a99';
const SHADOW = '#7a6aa0';
const LIGHT = '#f2d27a';
const INK = '#2e2a25';
const SKETCH = '#6f87a6';
const BG = '#d9d1c3';

export const books: Book[] = [
  {
    id: 'proportions',
    title: 'Proportions',
    subtitle: 'Les mesures du corps, du visage et des hanches',
    icon: '⟟',
    chapters: [
      {
        title: 'Le corps entier',
        pages: [
          p('Le canon des huit têtes', 'Le canon des huit têtes est un repère, pas une règle absolue. Sur un adulte dessiné de façon réaliste, la hauteur totale vaut environ huit fois la hauteur de la tête.', g('c1-proportions', 0)),
          p('La tête comme unité', 'Mesure la tête, du sommet du crâne au menton : c’est ton étalon. Reporte-la huit fois le long de l’axe pour poser la grille avant le moindre volume.', g('c1-proportions', 1)),
          p('Épaules et cage thoracique', 'La deuxième tête descend jusque sous la poitrine. Les épaules font environ deux têtes de large chez l’homme, un peu moins chez la femme.', g('c1-proportions', 2)),
          p('Nombril, bassin, entrejambe', 'Le nombril tombe vers la troisième tête et l’entrejambe vers la quatrième : c’est la moitié du corps. Le bassin s’inscrit entre ces deux repères.', g('c1-proportions', 3)),
          p('Les jambes', 'Le genou se place autour de la sixième tête, à mi-chemin entre l’entrejambe et le sol. Les jambes occupent donc à peu près la moitié de la hauteur.', g('c1-proportions', 4)),
          p('Les pieds', 'Le pied mesure environ une tête de long. Vu de face, il paraît bien plus court à cause de la perspective : dessine-le comme un petit triangle posé au sol.', g('c1-proportions', 5)),
          p('Les bras', 'Bras le long du corps, le coude arrive à la taille et le poignet à hauteur de l’entrejambe. Le bout des doigts tombe vers le milieu de la cuisse.', g('c1-proportions', 6)),
          p('La ligne d’action', 'Avant toute mesure, pose une ligne d’action qui traverse la tête, le thorax et le bassin. Elle donne l’équilibre et le mouvement de la pose.', g('c2-mannequin', 0)),
          p('Silhouette masculine', 'Chez l’homme, la cage thoracique domine : épaules plus larges que le bassin, taille peu marquée. La silhouette s’inscrit souvent dans un triangle pointe en bas.', g('corps-homme', 2)),
          p('Silhouette féminine', 'Chez la femme, le bassin est souvent aussi large que les épaules et la taille plus marquée. Ce sont des tendances, pas des règles : observe toujours ton modèle.', g('corps-femme', 2)),
          p('Vérifier la pose entière', 'Recule ou réduis ton dessin pour lire la silhouette globale. Corrige d’abord les grands rapports de longueur et l’équilibre, puis seulement les contours et les détails.', g('corps-femme', 5))
        ]
      },
      {
        title: 'Le visage',
        pages: [
          p('L’œuf et l’axe', 'De face, la tête tient dans un œuf, pointe en bas. Trace l’axe vertical au milieu : il sert à placer chaque élément en miroir.', g('b2-face', 0)),
          p('Les yeux à mi-hauteur', 'La ligne des yeux se trouve à mi-hauteur de la tête, cheveux compris. Les débutants la placent presque toujours trop haut : c’est la première chose à vérifier.', g('b2-face', 1)),
          p('Cinq yeux de large', 'La largeur du visage vaut environ cinq yeux. Il reste donc un œil d’écart entre les deux yeux, et un de chaque côté jusqu’au bord.', g('b2-face', 2)),
          p('Les trois tiers', 'De la racine des cheveux au menton, le visage se découpe en trois parts à peu près égales : le front, le nez, puis la bouche et le menton.', g('b2-face', 3)),
          p('Les aplombs', 'Des verticales parties du coin intérieur des yeux tombent sur les ailes du nez. Celles qui partent du centre des pupilles donnent à peu près les coins de la bouche.', g('b2-face', 4)),
          p('Les oreilles', 'Les oreilles se placent entre la ligne des sourcils et la base du nez. Leur inclinaison suit celle de la tête et leur forme varie beaucoup d’une personne à l’autre.', g('b2-face', 5)),
          p('La tête en volume', 'Pour une tête qui tourne, pars d’une sphère et coupe ses côtés : c’est la méthode Loomis. Les axes suivent la rotation et les proportions restent justes sous tous les angles.', g('b1-crane', 1))
        ]
      },
      {
        title: 'Les hanches et le bassin',
        pages: [
          p('Le bassin en boîte', 'Simplifie le bassin en boîte ou en bol incliné. Son orientation donne celle des hanches et montre sur quelle jambe repose le poids.', g('c2-mannequin', 3)),
          p('Cage et bassin', 'La cage et le bassin sont deux masses rigides reliées par la colonne. Entre les deux, l’abdomen est la seule zone souple : c’est là que le torse se plie et se tord.', g('c3-cage-bassin', 4)),
          p('Épaules contre hanches', 'Quand le poids repose sur une jambe, la ligne des hanches monte de ce côté et celle des épaules descend : elles s’inclinent en sens opposé. C’est le contrapposto.', g('c2-mannequin', 4)),
          p('Relier hanches et cuisses', 'Relie le bassin aux jambes par deux masses arrondies. Observe l’écart entre la taille, le haut des hanches et le haut des cuisses, sans exagérer la symétrie.', g('c3-cage-bassin', 5)),
          p('Exemple dessiné', 'Dans ce croquis, le bassin est posé juste sous la cage thoracique, avec la taille entre les deux. Le pas à pas complet est dans l’onglet Dessiner.', g('corps-femme-croquis', 2))
        ]
      }
    ]
  },
  {
    id: 'visage',
    title: 'Visage',
    subtitle: 'Yeux, nez, bouche, oreilles, cheveux',
    icon: '◉',
    chapters: [
      {
        title: 'La tête de face',
        pages: [
          p('Un cercle pour le crâne', 'Commence par un cercle : c’est la boîte crânienne, sans la mâchoire. Ne cherche pas encore l’ovale du visage.', g('tete-face', 0)),
          p('Couper les côtés', 'Le crâne est plus étroit qu’une boule sur les côtés. Trace une ellipse de chaque côté : leur bord donne les tempes.', g('tete-face', 1)),
          p('L’axe et les trois tiers', 'Trace l’axe vertical, puis trois tiers égaux : cheveux, sourcils, base du nez, menton. Quand la tête tourne, l’axe suit la courbure du visage.', g('tete-face', 3)),
          p('La mâchoire', 'Depuis le bas des ellipses, descends vers le menton par deux lignes qui se resserrent. Mâchoire carrée ou fine : c’est ici que se joue une bonne partie de la ressemblance.', g('tete-face', 4)),
          p('Placer les repères', 'Pose les repères avant de dessiner : orbites, base du nez, ligne de la bouche, oreilles. Un repère juste vaut mieux qu’un œil détaillé mal placé.', g('tete-face', 5))
        ]
      },
      {
        title: 'Les yeux',
        pages: [
          p('La construction', 'Un œil n’est pas une amande plate : c’est une boule enveloppée par les paupières. Trace le cercle du globe, les axes et la forme générale, très légèrement.', g('oeil-realiste', 0)),
          p('Paupières et iris', 'Pose le contour des paupières autour du globe, avec leur épaisseur. Place l’iris : la paupière supérieure en cache toujours un peu le haut, sinon le regard paraît effrayé.', g('oeil-realiste', 1)),
          p('Iris, pupille et pli', 'Dessine la pupille au centre de l’iris et quelques stries qui rayonnent. Ajoute le pli de la paupière supérieure, qui suit la courbe du globe.', g('oeil-realiste', 2)),
          p('Les premières ombres', 'Le blanc de l’œil n’est jamais blanc pur. Ombre ses coins, le dessous de la paupière et le creux de l’orbite : l’œil s’enfonce dans le visage.', g('oeil-realiste', 3)),
          p('Cils et sourcil', 'Les cils partent du rebord en courbes groupées, plus longs vers l’extérieur ; ceux du bas sont plus courts et clairsemés. Le sourcil se dessine poil par poil dans le sens de la pousse.', g('oeil-realiste', 4)),
          p('Le rendu final', 'Fonce les valeurs autour de l’iris et efface la construction. Garde un reflet net sur l’iris, côté lumière : c’est lui qui rend le regard vivant.', g('oeil-realiste', 5))
        ]
      },
      {
        title: 'Le nez',
        pages: [
          p('Un bloc en coin', 'Le nez est un coin à trois faces : l’arête sur le dessus et deux côtés. Dessine ce bloc simple en premier, il donne l’angle et la longueur du nez.', g('nez-realiste', 0)),
          p('Trois cercles', 'Construis la pointe et les deux ailes avec trois cercles. La pointe est en général le plus gros ; l’aile éloignée paraît plus petite et passe en partie derrière.', g('nez-realiste', 1)),
          p('Le contour utile', 'Arrondis le bloc autour des cercles et place la narine : une forme sombre allongée, pas un trou rond. Ne cerne pas tout le nez, seulement les bords qui comptent.', g('nez-realiste', 2)),
          p('Les premières ombres', 'Ombre le dessous du nez, le côté opposé à la lumière et l’ombre portée sur la lèvre. Ces ombres décrivent le volume bien mieux qu’un contour foncé.', g('nez-realiste', 3)),
          p('Les demi-teintes', 'Adoucis les transitions entre lumière et ombre le long de l’arête et autour des ailes. Le nez se fond progressivement dans la joue, sans ligne dure.', g('nez-realiste', 4)),
          p('Le rendu final', 'Fonce les narines et le dessous, efface la construction. Garde de petits reflets nets sur la pointe et l’arête : la peau du nez est souvent brillante.', g('nez-realiste', 5))
        ]
      },
      {
        title: 'La bouche',
        pages: [
          p('Les limites', 'La bouche s’étend à peu près entre les verticales qui tombent du centre des pupilles. Pose ces limites, puis la hauteur des deux lèvres.', g('b6-bouche', 0)),
          p('La ligne de la bouche', 'Commence par la ligne de contact entre les lèvres : c’est le trait le plus sombre de la bouche. Elle ondule légèrement et se creuse au centre.', g('b6-bouche', 1)),
          p('La lèvre supérieure', 'La lèvre du haut forme l’arc de Cupidon au centre et descend vers les coins. Tournée vers le bas, elle est souvent plus sombre que celle du dessous.', g('b6-bouche', 2)),
          p('La lèvre inférieure', 'La lèvre du bas est plus pleine et reçoit la lumière. Ne la cerne pas : son bord inférieur se lit grâce à l’ombre portée sur le menton.', g('b6-bouche', 3)),
          p('Coins et ombres', 'Les commissures sont de petites zones sombres, pas des points. Ombre la lèvre du haut et le creux sous la lèvre du bas, et garde un reflet sur celle-ci.', g('b6-bouche', 5))
        ]
      },
      {
        title: 'L’oreille',
        pages: [
          p('Le placement', 'L’oreille se place entre la ligne des sourcils et la base du nez, en ovale incliné vers l’arrière. De face, on ne la voit que de profil, très étroite.', g('oreille', 0)),
          p('Hélix et anthélix', 'Dessine le rebord extérieur (l’hélix) et le lobe, puis la crête intérieure en forme de Y : l’anthélix. Ces deux courbes suffisent à rendre l’oreille lisible.', g('oreille', 2)),
          p('Conque et tragus', 'Au centre, la conque est le creux qui mène au conduit. Devant elle, le tragus forme un petit rabat ; en face, sous l’anthélix, se trouve l’antitragus.', g('oreille', 3)),
          p('Les ombres', 'La conque est la zone la plus sombre de l’oreille. Ombre aussi l’intérieur du rebord ; les crêtes restent claires.', g('oreille', 5))
        ]
      },
      {
        title: 'Les cheveux',
        pages: [
          p('La masse puis les mèches', 'Commence par la masse générale et la ligne d’implantation, au-dessus du crâne et pas collée à lui. Sépare ensuite de grandes mèches orientées, puis quelques accents.', g('tete-face', 7)),
          p('Ombrer le visage', 'Une fois les cheveux posés, ombre un côté du visage, le dessous du nez, le creux sous la lèvre et le dessous du menton. Ces quatre zones suffisent à donner du volume.', g('tete-face', 9))
        ]
      }
    ]
  },
  {
    id: 'corps',
    title: 'Corps',
    subtitle: 'Mains, pieds, torse, bras et jambes',
    icon: '✋',
    chapters: [
      {
        title: 'La main',
        pages: [
          p('La paume', 'Commence par la paume : une boîte souple, un peu plus haute que large. Observe la direction générale de la main avant de penser aux doigts.', g('c4-mains', 0)),
          p('L’arc des jointures', 'Les jointures des doigts ne sont pas alignées : elles forment un arc. Celle du majeur est la plus haute, celle de l’auriculaire la plus basse.', g('c4-mains', 1)),
          p('La longueur des doigts', 'Le majeur fait presque la longueur de la paume. Les autres doigts s’organisent autour de lui, en éventail.', g('c4-mains', 2)),
          p('Les phalanges', 'Chaque doigt compte trois phalanges, de plus en plus courtes vers le bout. Dessine-les comme de petits cylindres reliés par des articulations.', g('c4-mains', 3)),
          p('Le pouce', 'Le pouce part du bas de la paume, pas du côté des doigts. Sa base charnue occupe une grande partie de la paume.', g('c4-mains', 4)),
          p('Volumes et valeurs', 'Arrondis les blocs, marque les plis aux articulations et ombre le côté opposé à la lumière. Les ongles viennent en tout dernier.', g('c4-mains', 6))
        ]
      },
      {
        title: 'Le pied',
        pages: [
          p('Trois repères', 'Place trois cercles : le talon, la cheville et la base des orteils. Relie-les : tu as déjà la direction du pied.', g('pied', 0)),
          p('Le bloc en coin', 'Simplifie le pied en coin : talon, cou-de-pied et avant-pied. En perspective, il peut paraître beaucoup plus court qu’il ne l’est.', g('pied', 1)),
          p('Le contour', 'Suis la jambe jusqu’au cou-de-pied puis aux orteils, et reviens par la voûte jusqu’au talon. Le bord intérieur est cambré, le bord extérieur repose presque à plat.', g('pied', 2)),
          p('Malléoles et tendon', 'La malléole intérieure est plus haute que l’extérieure. Derrière, le tendon d’Achille relie le mollet au talon en une ligne nette.', g('pied', 3)),
          p('Les ombres', 'Ombre le dessous du pied et l’arrière du talon. Une ombre portée au sol suffit à poser le pied et à lui donner du poids.', g('pied', 5))
        ]
      },
      {
        title: 'Le torse',
        pages: [
          p('L’œuf de la cage', 'La cage thoracique ressemble à un œuf légèrement aplati, incliné selon la pose. Dessine-la comme un bloc simple avant de suggérer les côtes et les muscles.', g('c3-cage-bassin', 0)),
          p('Sternum et clavicules', 'Le sternum marque le milieu de la cage. Les clavicules partent de son sommet vers les épaules et donnent leur largeur et leur inclinaison.', g('c3-cage-bassin', 1)),
          p('L’arc costal', 'Sous la poitrine, le bas de la cage forme un arc en V inversé. Il reste visible sur un torse mince et montre la rotation du buste.', g('c3-cage-bassin', 2)),
          p('Simplifier en boîtes', 'Sépare la cage et le bassin par la zone souple de l’abdomen. L’inclinaison de ces deux boîtes donne la torsion du torse avant tout muscle.', g('c3-cage-bassin', 6))
        ]
      },
      {
        title: 'Bras et jambes',
        pages: [
          p('Les membres en tubes', 'Construis bras et jambes avec des cylindres souples : un pour le haut, un pour le bas. Ils s’affinent vers le coude, le poignet, le genou et la cheville.', g('corps-homme', 3)),
          p('Les articulations', 'Place une sphère à chaque articulation : épaule, coude, poignet, hanche, genou, cheville. Tu évites ainsi les membres en caoutchouc qui plient n’importe où.', g('corps-homme', 4)),
          p('Des contours asymétriques', 'Un membre n’est jamais symétrique. Le mollet bombe plus haut à l’extérieur et plus bas à l’intérieur ; à la cheville, c’est l’inverse.', g('corps-femme', 5)),
          p('Relier les volumes', 'Vérifie les chevauchements : quel membre passe devant, où plie l’articulation, comment les volumes se raccordent. Le contour final découle de cette construction.', g('corps-femme', 6))
        ]
      }
    ]
  },
  {
    id: 'csp-bases',
    title: 'CSP · Bases',
    subtitle: 'Clip Studio Paint : toile, calques, modes de fusion',
    icon: '▤',
    chapters: [
      {
        title: 'Préparer la toile',
        pages: [
          p('L’espace de travail', 'Les outils sont à gauche, la toile au centre, les palettes de couleurs et de calques à droite. Garde seulement les palettes utiles ; le menu Fenêtre réaffiche celles que tu as fermées.', { workspace: true }),
          p('Une nouvelle toile', 'Fichier › Nouveau. Pour l’écran, 150 dpi suffisent ; pour imprimer, choisis 300 à 350 dpi dès le départ, car agrandir ensuite rend l’image floue.', {
            head: 'Nouvelle toile',
            rows: [
              ['Format', 'A4 · 210 × 297 mm'],
              ['Résolution', '350 dpi (impression)'],
              ['Écran seulement', '150 dpi'],
              ['Couleur du papier', 'Blanc']
            ]
          }),
          p('Les raccourcis utiles', 'Quelques raccourcis font gagner un temps énorme. Retourne aussi la vue horizontalement de temps en temps : les erreurs de proportions sautent aux yeux.', {
            head: 'Raccourcis',
            rows: [
              ['Ctrl + Z', 'Annuler'],
              ['Espace (maintenu)', 'Déplacer la toile'],
              ['Alt (maintenu)', 'Pipette'],
              ['P · B · E', 'Stylo · Pinceau · Gomme'],
              ['Ctrl + T', 'Transformer']
            ]
          })
        ]
      },
      {
        title: 'Organiser ses calques',
        pages: [
          p('Le calque de croquis', 'Crée un calque « Croquis » et baisse son opacité autour de 30 %. Active la couleur de calque : le croquis devient bleu et ne se confond plus avec l’encrage.', {
            layers: [{ n: 'Croquis', op: 30, sw: SKETCH, hi: true }, { n: 'Papier', sw: '#ffffff' }]
          }),
          p('L’encrage séparé', 'Encre sur un nouveau calque au-dessus du croquis. Sur un calque vectoriel, la gomme peut effacer un trait jusqu’à son croisement avec un autre : idéal pour nettoyer.', {
            layers: [{ n: 'Encrage', sw: INK, vec: true, hi: true }, { n: 'Croquis', op: 30, sw: SKETCH }, { n: 'Papier', sw: '#ffffff' }]
          }),
          p('Les aplats', 'Pose les couleurs de base sous l’encrage, un calque par grande zone (peau, cheveux, vêtements). Le pot de peinture réglé pour se référer aux autres calques suit l’encrage.', {
            layers: [
              { n: 'Encrage', sw: INK, vec: true },
              { n: 'Cheveux', sw: HAIR, hi: true },
              { n: 'Vêtements', sw: CLOTH, hi: true },
              { n: 'Peau', sw: SKIN, hi: true },
              { n: 'Croquis', op: 30, sw: SKETCH, off: true },
              { n: 'Papier', sw: '#ffffff' }
            ]
          }),
          p('Écrêter au calque inférieur', 'Active « Écrêter au calque inférieur » sur un calque d’ombre : tu ne peins que là où le calque du dessous a des pixels. Plus besoin de surveiller les bords.', {
            layers: [
              { n: 'Ombres peau', mode: 'Produit', clip: true, sw: SHADOW, hi: true },
              { n: 'Peau', sw: SKIN },
              { n: 'Papier', sw: '#ffffff' }
            ]
          }),
          p('Ombres et lumières', 'Crée des calques dédiés aux ombres et aux lumières, au-dessus des aplats. Tu peux ensuite régler leur opacité, leur couleur ou leur mode sans toucher aux couleurs de base.', {
            layers: [
              { n: 'Encrage', sw: INK, vec: true },
              { n: 'Lumières', mode: 'Ajouter (lueur)', clip: true, sw: LIGHT, hi: true },
              { n: 'Ombres', mode: 'Produit', clip: true, sw: SHADOW, hi: true },
              { n: 'Peau', sw: SKIN },
              { n: 'Papier', sw: '#ffffff' }
            ]
          }),
          p('Dossiers et masques', 'Range les calques par élément dans des dossiers nommés. Un masque de calque cache une zone sans effacer les pixels : la correction reste réversible.', {
            layers: [
              { n: 'Personnage', folder: true, hi: true },
              { n: 'Cheveux', sw: HAIR, sub: true },
              { n: 'Vêtements', sw: CLOTH, sub: true, mask: true, hi: true },
              { n: 'Peau', sw: SKIN, sub: true },
              { n: 'Fond', folder: true },
              { n: 'Papier', sw: '#ffffff' }
            ]
          }),
          p('Un fichier bien rangé', 'Du haut vers le bas : effets, lumières, ombres, encrage, aplats, fond. Le croquis reste caché tout en bas, prêt à être réaffiché pour vérifier.', {
            layers: [
              { n: 'Effets', mode: 'Superposition', op: 40, sw: '#e0a060' },
              { n: 'Encrage', sw: INK, vec: true },
              { n: 'Personnage', folder: true },
              { n: 'Lumières', mode: 'Ajouter (lueur)', sw: LIGHT, sub: true, clip: true },
              { n: 'Ombres', mode: 'Produit', sw: SHADOW, sub: true, clip: true },
              { n: 'Aplats', sw: SKIN, sub: true },
              { n: 'Fond', sw: BG },
              { n: 'Croquis', op: 30, sw: SKETCH, off: true }
            ]
          })
        ]
      },
      {
        title: 'Les modes de fusion',
        pages: [
          p('Produit', 'Le mode Produit assombrit toujours. Une teinte violette ou bleutée en Produit donne des ombres plus riches qu’un gris ; baisse l’opacité pour doser.', {
            layers: [{ n: 'Ombres', mode: 'Produit', op: 60, clip: true, sw: SHADOW, hi: true }, { n: 'Peau', sw: SKIN }]
          }),
          p('Ajouter (lueur) et Superposition', 'Ajouter (lueur) éclaircit fortement : garde-le pour les reflets et les sources de lumière. Superposition renforce contraste et couleur ; utilise-la par petites touches.', {
            layers: [
              { n: 'Ambiance', mode: 'Superposition', op: 35, sw: '#e0a060', hi: true },
              { n: 'Reflets', mode: 'Ajouter (lueur)', op: 70, sw: LIGHT, hi: true },
              { n: 'Peau', sw: SKIN }
            ]
          })
        ]
      }
    ]
  },
  {
    id: 'csp-rendus',
    title: 'CSP · Rendus',
    subtitle: 'Lumière, peau, matières, méthode de travail',
    icon: '◐',
    chapters: [
      {
        title: 'La lumière',
        pages: [
          p('Choisir une lumière', 'Avant d’ombrer, décide d’une source principale et de sa direction. Toutes les ombres et les zones éclairées doivent rester cohérentes avec ce choix.', g('a4-lumiere', 1)),
          p('Les grandes ombres', 'Commence par de grandes masses d’ombre, pas par les détails. Elles décrivent les volumes et organisent la lecture de l’image.', g('a4-lumiere', 2)),
          p('Demi-teintes et transitions', 'Les bords d’ombre sont nets, doux ou perdus selon la forme. Garde des bords francs aux zones de contact et adoucis-les quand le volume tourne lentement.', g('a4-lumiere', 3)),
          p('La lumière réfléchie', 'Dans l’ombre, le bord reçoit la lumière renvoyée par le sol. Garde-la plus sombre que toute zone éclairée, sinon le volume s’aplatit.', g('a4-lumiere', 4)),
          p('Ombre portée et contact', 'L’ombre portée est la plus sombre juste au contact de l’objet et s’adoucit en s’éloignant. Ce petit noir de contact suffit à poser un objet.', g('a4-lumiere', 5))
        ]
      },
      {
        title: 'Peau et matières',
        pages: [
          p('Rendre la peau', 'La peau n’est pas d’un beige uniforme. Construis d’abord les valeurs, puis réchauffe les ombres et rosis les zones où la peau est fine : nez, oreilles, joues.', g('tete-face', 9)),
          p('Lire une matière', 'Une matière se reconnaît à ses reflets : doux et étalés pour le mat, petits et nets pour le brillant, très contrastés pour le métal. Le verre laisse voir le fond.', g('e2-matieres', 4)),
          p('Les textures', 'Ajoute la texture après les volumes, avec des marques discrètes qui suivent la forme. Une texture trop contrastée détourne l’attention du sujet.', g('e2-matieres', 1)),
          p('Choisir ses pinceaux', 'Un pinceau opaque pour les grandes formes, un aérographe doux pour les transitions, un pinceau texturé pour les accents. Maîtrise ces trois-là avant d’en collectionner d’autres.', { brushes: true })
        ]
      },
      {
        title: 'La méthode de travail',
        pages: [
          p('Du grand au petit', 'Travaille du plus grand au plus petit. À chaque étape, vérifie que le détail renforce la forme au lieu de la brouiller.', {
            head: 'Ordre de travail',
            list: ['Silhouette', 'Valeurs', 'Couleurs', 'Bords', 'Détails'],
            on: 0
          }),
          p('Vérifier en niveaux de gris', 'Ajoute en haut un calque rempli de gris en mode Couleur : l’image passe en noir et blanc et tu vois si les valeurs fonctionnent. Masque-le pour reprendre.', {
            layers: [
              { n: 'Vérif. valeurs', mode: 'Couleur', sw: '#808080', hi: true },
              { n: 'Encrage', sw: INK, vec: true },
              { n: 'Personnage', folder: true },
              { n: 'Fond', sw: BG }
            ]
          }),
          p('Le rendu complet', 'Enregistre une copie avant les retouches finales : tu pourras toujours revenir en arrière. Puis suis toujours le même ordre.', {
            head: 'Un rendu de A à Z',
            list: ['Croquis', 'Encrage', 'Aplats', 'Ombres (Produit)', 'Lumières (Ajouter)', 'Harmonie (Superposition)', 'Accents et reflets'],
            on: 3
          })
        ]
      }
    ]
  }
];

/** Pages à plat d'un livre, précédées de la couverture-sommaire (index 0). */
export function flatPages(b: Book) {
  const out: { chapter: number; page: BookPage }[] = [];
  b.chapters.forEach((c, ci) => c.pages.forEach((page) => out.push({ chapter: ci, page })));
  return out;
}
