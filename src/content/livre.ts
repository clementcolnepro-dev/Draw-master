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
        title: 'Bassin et hanches — femme',
        pages: [
          p('Les repères', 'Trace l’axe central puis trois lignes : la taille, les crêtes iliaques (le haut des os du bassin) et la ligne des hanches, la partie la plus large. Chez la femme, cette dernière dépasse souvent la largeur des épaules.', g('bassin-femme', 0)),
          p('Le squelette', 'Le bassin féminin est large, évasé et plutôt bas. Les têtes des fémurs sont bien écartées : c’est ce qui donne la largeur des hanches.', g('bassin-femme', 1)),
          p('Les volumes', 'Simplifie le bassin en bol large, puis les cuisses en deux cylindres. Ils partent des hanches et convergent vers les genoux, en oblique.', g('bassin-femme', 2)),
          p('Le contour', 'Le contour passe de la taille marquée à la courbe des hanches, puis au haut des cuisses. Le bas-ventre forme un V doux, encadré par les plis de l’aine.', g('bassin-femme', 3)),
          p('Les ombres', 'Ombre les flancs, sous le ventre et l’intérieur des cuisses. Le ventre et le haut des cuisses, tournés vers la lumière, restent clairs.', g('bassin-femme', 4)),
          p('Le rendu final', 'Adoucis toutes les transitions : chez la femme, les formes sont plus arrondies et les muscles moins marqués. Efface la construction.', g('bassin-femme', 5))
        ]
      },
      {
        title: 'Bas-ventre et aine — femme',
        pages: [
          p('Les repères', 'Trace l’axe central, qui se courbe avec la pose, la ligne du nombril et celle des crêtes iliaques. Les deux plis de l’aine descendent en V et se rejoignent au centre, entre les cuisses.', g('basventre-femme', 0)),
          p('Les blocs', 'Le bassin est une boîte inclinée : en appui sur une jambe, le côté de l’appui monte. Les deux épines iliaques, petites bosses osseuses à l’avant, marquent les coins supérieurs de la boîte.', g('basventre-femme', 1)),
          p('Les volumes', 'Le bas-ventre forme un écusson arrondi entre les plis de l’aine, avec un léger renflement sous le nombril. Sur les côtés, la masse des hanches déborde au-dessus des cuisses.', g('basventre-femme', 2)),
          p('Le contour', 'Relie la taille, les hanches, les plis de l’aine et le haut des cuisses par des courbes en S. Les plis de l’aine sont des creux doux, pas des traits durs.', g('basventre-femme', 3)),
          p('Les ombres', 'Ombre le creux des plis de l’aine, les côtés du ventre et l’espace entre les cuisses. Le ventre, tourné vers la lumière, reste la zone la plus claire.', g('basventre-femme', 4)),
          p('Le rendu final', 'Sur une statue de marbre, les reflets sont plus nets et les ombres plus franches que sur la peau. Pour un rendu de peau, adoucis davantage les transitions.', g('basventre-femme', 5))
        ]
      },
      {
        title: 'Fessiers — femme',
        pages: [
          p('Les repères', 'Pars de la ligne d’action de la colonne, puis place la taille, les crêtes iliaques et les plis fessiers. En appui sur une jambe, ces lignes s’inclinent : la hanche monte du côté de l’appui.', g('fessiers-femme', 0)),
          p('Les blocs', 'Pose la cage thoracique en œuf et le bassin en boîte inclinée. Au centre du bassin, le sacrum forme un losange, avec les deux fossettes des reins à ses coins supérieurs.', g('fessiers-femme', 1)),
          p('Les volumes', 'Chaque grand fessier se construit en ovale incliné, accroché sous la crête iliaque. Du côté de l’appui, il est plus haut et plus tendu ; de l’autre, il descend et se relâche.', g('fessiers-femme', 2)),
          p('Le contour', 'Relie taille, hanches, fessiers et cuisses par des courbes en S, sans angle. Les plis fessiers ne sont pas symétriques : celui de la jambe d’appui est plus marqué.', g('fessiers-femme', 3)),
          p('Les ombres', 'Ombre le creux des reins, le sillon central, le dessous des plis fessiers et le côté des hanches opposé à la lumière. Suis la rondeur des volumes avec ton hachurage.', g('fessiers-femme', 4)),
          p('Le rendu final', 'Adoucis les demi-teintes pour rendre la peau, garde un reflet doux sur le haut de chaque fessier et efface la construction.', g('fessiers-femme', 5))
        ]
      },
      {
        title: 'Bassin et hanches — homme',
        pages: [
          p('Les repères', 'Trace l’axe central, la taille, la ligne des crêtes iliaques et celle des plis de l’aine. Chez l’homme, la taille est peu marquée : le torse descend presque droit vers les hanches.', g('bassin-homme', 0)),
          p('Le squelette', 'Le bassin masculin est plus étroit et plus haut que celui de la femme. Les têtes des fémurs sont plus rapprochées, les cuisses descendent presque à la verticale.', g('bassin-homme', 1)),
          p('Les volumes', 'Simplifie le bassin en coin, pointe en bas, et les cuisses en deux cylindres. Cette forme en V annonce déjà les plis de l’aine.', g('bassin-homme', 2)),
          p('Le contour', 'Au-dessus des crêtes iliaques, les muscles obliques forment un bourrelet net sur les flancs. Les plis de l’aine descendent en V vers le centre.', g('bassin-homme', 3)),
          p('Les ombres', 'Les volumes sont plus anguleux que chez la femme : marque les ombres sous les obliques, le long des abdominaux et à l’intérieur des cuisses.', g('bassin-homme', 4)),
          p('Le rendu final', 'Garde des transitions plus franches pour montrer la musculature. Efface la construction et fais ressortir les reliefs avec des lumières nettes.', g('bassin-homme', 5))
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
          p('La construction', 'Trace l’axe central, la ligne de la bouche et ses limites, à peu près sous le centre des pupilles. Encadre la hauteur des deux lèvres : la lèvre du bas est souvent la plus épaisse.', g('bouche-realiste', 0)),
          p('La ligne de contact', 'Dessine la ligne entre les lèvres en premier : c’est le trait le plus sombre de la bouche. Elle ondule légèrement et se creuse au centre, sous l’arc de Cupidon.', g('bouche-realiste', 1)),
          p('Les contours', 'La lèvre du haut forme l’arc de Cupidon et descend vers les coins. Celle du bas est plus pleine ; ne la cerne pas d’un trait épais, son bord se lira avec l’ombre.', g('bouche-realiste', 2)),
          p('Les premières ombres', 'Tournée vers le bas, la lèvre supérieure est plus sombre que l’inférieure. Fonce les commissures et pose l’ombre portée sous la lèvre du bas, sur le menton.', g('bouche-realiste', 3)),
          p('Demi-teintes et texture', 'Modèle le volume des lèvres avec des demi-teintes et de fines stries verticales. Marque le philtrum, le sillon entre le nez et la lèvre, par deux arêtes claires.', g('bouche-realiste', 4)),
          p('Le rendu final', 'Fonce les valeurs, efface la construction et garde des reflets nets sur la lèvre inférieure. Plus les reflets sont petits et contrastés, plus la lèvre paraît brillante.', g('bouche-realiste', 5))
        ]
      },
      {
        title: 'L’oreille',
        pages: [
          p('Le placement', 'L’oreille tient dans un ovale incliné vers l’arrière, entre la ligne des sourcils et celle de la base du nez. Pose ces deux repères avant tout.', g('oreille-realiste', 0)),
          p('Le contour extérieur', 'Le rebord, l’hélix, s’enroule depuis le haut et descend jusqu’au lobe, plus charnu. Cherche d’abord cette grande forme, sans entrer dans les détails.', g('oreille-realiste', 1)),
          p('Anthélix et conque', 'À l’intérieur, une crête en forme de Y, l’anthélix, suit le rebord. Elle entoure la conque, le creux profond qui mène au conduit.', g('oreille-realiste', 2)),
          p('Tragus et épaisseur', 'Devant la conque, le tragus forme un petit rabat ; en face, sous l’anthélix, l’antitragus. Donne de l’épaisseur au rebord : c’est un volume, pas une ligne.', g('oreille-realiste', 3)),
          p('Les ombres', 'La conque est la zone la plus sombre de l’oreille. Ombre aussi le dessous du rebord et l’ombre portée de l’oreille sur la tête.', g('oreille-realiste', 4)),
          p('Le rendu final', 'Adoucis les demi-teintes et garde des lumières nettes sur les crêtes : hélix, anthélix et lobe. Efface la construction.', g('oreille-realiste', 5))
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
          p('La paume', 'Commence par la paume : une boîte un peu trapézoïdale, plus large côté doigts. Trace l’axe du poignet pour donner la direction de toute la main.', g('main-realiste', 0)),
          p('L’arc des jointures', 'Les jointures ne sont pas alignées : elles forment un arc qui monte vers le majeur. Les doigts partent en éventail depuis le poignet, suis ces lignes de direction.', g('main-realiste', 1)),
          p('Les doigts en cylindres', 'Chaque doigt compte trois phalanges, de plus en plus courtes vers le bout : dessine-les en petits cylindres. Le pouce part du bas de la paume, pas du côté des doigts.', g('main-realiste', 2)),
          p('Le contour définitif', 'Passe au contour en suivant les cylindres, puis ajoute les plis aux articulations et les ongles. Le contour ondule : bosses aux jointures, creux entre elles.', g('main-realiste', 3)),
          p('Les premières ombres', 'Ombre le côté opposé à la lumière, l’intérieur des doigts et l’ombre portée sous la main. Les doigts qui se touchent créent de petites zones très sombres.', g('main-realiste', 4)),
          p('Le rendu final', 'Suggère les tendons et les veines par de légères demi-teintes, sans les cerner. Efface la construction et fonce les ombres pour faire ressortir le volume.', g('main-realiste', 5))
        ]
      },
      {
        title: 'La main sous tous les angles',
        pages: [
          p('Le dos de la main', 'Doigts écartés, l’arc des jointures se lit clairement : il monte vers le majeur. Les tendons partent du poignet en éventail vers chaque doigt.', g('main-vues', 0)),
          p('La paume', 'Côté paume, les doigts paraissent plus courts : leurs plis de base sont plus bas que les jointures du dos. La base du pouce et le bord opposé forment deux coussins charnus.', g('main-vues', 1)),
          p('De profil', 'De profil, la main est un coin : épaisse au poignet, fine au bout des doigts. Les doigts se superposent, seul le plus proche est entièrement visible.', g('main-vues', 2)),
          p('Le poing fermé', 'Dans un poing, les premières phalanges forment un bloc plat et les jointures deviennent les points les plus saillants. Le pouce se replie par-dessus, en travers.', g('main-vues', 3)),
          p('Tenir un objet', 'Quand la main tient un objet, dessine d’abord l’objet, puis les points de contact. Le pouce et l’index pincent, les autres doigts suivent en se repliant de plus en plus.', g('main-vues', 4)),
          p('En perspective', 'Vue du dessus en perspective, les doigts proches paraissent plus longs et les éloignés se raccourcissent. Les ellipses des articulations aident à garder les volumes cohérents.', g('main-vues', 5))
        ]
      },
      {
        title: 'Le pied',
        pages: [
          p('Trois repères', 'Place trois cercles légers : le talon, la cheville et la base des orteils. Relie-les à l’axe de la jambe : tu as déjà la direction et la longueur du pied.', g('pied-realiste', 0)),
          p('Le bloc en coin', 'Simplifie le pied en coin : haut au cou-de-pied, fin vers les orteils. En séparant le dessus éclairé du côté dans l’ombre, tu fixes déjà le volume.', g('pied-realiste', 1)),
          p('Le contour', 'Suis la jambe jusqu’au cou-de-pied, descends vers les orteils et reviens par le talon. Les orteils s’alignent en une ligne qui descend du gros orteil au petit.', g('pied-realiste', 2)),
          p('Les détails', 'Ajoute la malléole, les tendons qui partent vers les orteils et les ongles. Pose déjà l’ombre portée au sol : elle ancre le pied.', g('pied-realiste', 3)),
          p('Les ombres', 'Ombre le côté du pied, le dessous de la malléole et l’arrière du talon. Garde le dessus du pied clair, il reçoit la lumière.', g('pied-realiste', 4)),
          p('Le rendu final', 'Fonce les valeurs, adoucis les transitions et efface la construction. Les reflets sur la malléole et les orteils donnent l’impression de peau.', g('pied-realiste', 5))
        ]
      },
      {
        title: 'Le pied sous tous les angles',
        pages: [
          p('Profil intérieur', 'Côté intérieur, la voûte plantaire se soulève : le pied ne touche le sol qu’au talon et à l’avant. La malléole intérieure est haute et bien marquée.', g('pied-vues', 0)),
          p('Profil extérieur', 'Côté extérieur, le pied repose presque à plat sur toute sa longueur. La malléole extérieure est plus basse et plus en arrière que l’intérieure.', g('pied-vues', 1)),
          p('De face', 'De face, le pied se raccourcit fortement en perspective : les orteils passent devant le cou-de-pied. Les orteils forment une ligne qui descend du gros orteil au petit.', g('pied-vues', 2)),
          p('De dos', 'De dos, le talon est un bloc arrondi et le tendon d’Achille le relie au mollet. Les deux malléoles dépassent de chaque côté, à des hauteurs différentes.', g('pied-vues', 3)),
          p('Trois quarts', 'De trois quarts, on voit à la fois le dessus du pied et un côté. Garde le bloc en coin en tête : le cou-de-pied monte vers la cheville en pente douce.', g('pied-vues', 4)),
          p('Sur la pointe', 'Sur la pointe, tout le poids passe sur la base des orteils, qui se plient à angle droit. Le talon monte et le cou-de-pied s’aligne avec la jambe.', g('pied-vues', 5))
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
        title: 'Torse — femme',
        pages: [
          p('Les repères', 'Trace l’axe central puis les lignes des épaules, des clavicules, de la poitrine et de la taille. Elles restent parallèles tant que le torse ne se tord pas.', g('torse-femme', 0)),
          p('Les blocs', 'La cage thoracique est un œuf incliné, le cou un cylindre, les épaules des sphères. Sous la poitrine, l’arc costal forme un V inversé qui donne l’orientation de la cage.', g('torse-femme', 1)),
          p('Les volumes', 'Les pectoraux partent du sternum en éventail vers les épaules. La poitrine se pose dessus en deux gouttes, attachées vers l’aisselle et légèrement orientées vers l’extérieur, en suivant la courbe de la cage.', g('torse-femme', 2)),
          p('Le contour', 'Passe au contour en courbes : cou, trapèzes, épaules, aisselles, galbe de la poitrine et taille. La base de la poitrine se lit surtout par l’ombre qu’elle porte.', g('torse-femme', 3)),
          p('Les ombres', 'Ombre le dessous de la poitrine, le creux sous les clavicules et les côtés de la cage. Ces ombres suffisent à faire tourner les volumes.', g('torse-femme', 4)),
          p('Le rendu final', 'Adoucis les demi-teintes, garde des lumières sur les clavicules, le haut de la poitrine et le ventre, et efface la construction.', g('torse-femme', 5))
        ]
      },
      {
        title: 'Torse — homme',
        pages: [
          p('L’axe et les épaules', 'Commence par deux lignes seulement : l’axe vertical du torse et la ligne des épaules. Chez l’homme, les épaules sont larges, à peu près deux têtes.', g('torse-homme', 0)),
          p('Les grandes formes', 'Pose un grand ovale pour la cage thoracique, un cylindre pour le cou et un ovale plus petit pour le bassin. Ces trois formes donnent déjà les proportions.', g('torse-homme', 1)),
          p('Épaules et bras', 'Place un cercle à chaque extrémité de la ligne des épaules, puis les bras en tubes simples. Les cercles des épaules débordent largement de la cage.', g('torse-homme', 2)),
          p('La taille', 'Trace la ligne de la taille et relie légèrement les formes entre elles. Chez l’homme, la taille est peu marquée : le torse descend presque droit.', g('torse-homme', 3)),
          p('Les repères', 'Ajoute les clavicules, le sternum en trait vertical, l’arc costal en V inversé et le nombril. Ces repères osseux guideront les muscles.', g('torse-homme', 4)),
          p('Le premier contour', 'Relie toutes les formes par un contour léger : cou, trapèzes, épaules, flancs. Tu obtiens la silhouette du torse, sans aucun muscle.', g('torse-homme', 5)),
          p('Les blocs', 'Durcis la construction : cylindre du cou, sphères des épaules, plaque de la cage avec le sternum et l’arc costal. Pense en volumes, pas en lignes.', g('torse-homme', 6)),
          p('Les masses musculaires', 'Pose les pectoraux en deux plaques carrées, les deltoïdes en gouttes sur les épaules et les abdominaux en petits blocs. Les obliques remplissent les flancs.', g('torse-homme', 7)),
          p('Le contour définitif', 'Passe au contour en suivant les muscles : il est plus anguleux que chez la femme, avec des cassures nettes aux épaules et sous les pectoraux.', g('torse-homme', 8)),
          p('Les ombres', 'Ombre en hachures sous les pectoraux, entre les abdominaux, sous les clavicules et sur les côtés de la cage. Les hachures suivent la forme de chaque muscle.', g('torse-homme', 9)),
          p('Le rendu final', 'Garde des transitions franches pour montrer la musculature, efface la construction et pose des lumières nettes sur le haut des pectoraux et des épaules.', g('torse-homme', 10))
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
