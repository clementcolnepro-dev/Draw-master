import type { Module } from './types';
import { T, Note, Dot } from './shapes';

const eyeTop = 'M85 108 C110 62 200 58 238 96';
const eyeBot = 'M85 108 C120 132 200 130 238 96';
const eyeShape = `${eyeTop} C200 130 120 132 85 108 Z`;
const egg = 'M150 30 C240 30 236 150 228 180 C215 245 185 270 150 270 C115 270 85 245 72 180 C64 150 60 30 150 30 Z';

export const portrait: Module = {
  id: 'portrait',
  letter: 'B',
  discipline: 'portrait',
  title: 'Portrait réaliste',
  subtitle: 'Construire et rendre un visage',
  description:
    "Du crâne au portrait complet. On construit d’abord la tête comme un volume (méthode Loomis), on place les éléments grâce aux proportions, puis on apprend chaque élément du visage séparément avant de les assembler.",
  planned: [
    'Construire un visage de trois quarts',
    'Positionner les yeux selon l’angle de la tête',
    'Dessiner les sourcils et les paupières',
    'Dessiner les lèvres et leurs textures',
    'Dessiner les oreilles',
    'Comprendre les cheveux',
    'Dessiner les différentes coiffures',
    'Comprendre les expressions faciales',
    'Étudier les ombres du visage',
    'Travailler les textures de peau',
    'Réaliser un portrait complet',
    'Réaliser un portrait photoréaliste'
  ],
  lessons: [
    // ─────────────────────────────────────────────── B1
    {
      id: 'b1-crane',
      module: 'portrait',
      title: 'Les proportions du crâne (méthode Loomis)',
      difficulty: 'Débutant',
      minutes: 40,
      skill: 'Construire une tête à partir d’une sphère et de ses trois tiers',
      objective:
        "Construire la tête comme un volume simple — une sphère coupée sur les côtés, prolongée par la mâchoire — et y placer les grandes lignes de repère.",
      why:
        "Dessiner un visage en commençant par les yeux mène presque toujours à une tête déformée. La méthode d’Andrew Loomis construit d’abord le volume du crâne : les éléments du visage viennent ensuite se poser sur une structure juste, quel que soit l’angle de la tête.",
      theory: [
        "Le crâne humain, vu simplement, est une **sphère** (la boîte crânienne) à laquelle on ajoute une **mâchoire**. Les côtés de la tête sont relativement plats : Loomis les représente en **coupant la sphère** de chaque côté. Ces coupes forment des ellipses (ou des cercles vus de profil).",
        "Le visage se divise en **trois tiers égaux** : de la ligne des cheveux à la ligne des sourcils, des sourcils à la base du nez, de la base du nez au menton. Dans la méthode Loomis, la **ligne des sourcils passe au centre de la sphère**, la ligne des cheveux est en haut de la coupe latérale, la base du nez en bas de cette coupe.",
        "Le troisième tiers (nez → menton) **dépasse sous la sphère** : on prolonge la ligne médiane vers le bas d’une longueur égale à un tiers pour placer le menton.",
        "La **ligne médiane** verticale indique l’orientation de la tête : si elle se courbe sur la sphère, la tête tourne. Elle sert d’axe de symétrie à tous les éléments du visage.",
        "Les **oreilles** se placent sur la coupe latérale, entre la ligne des sourcils et la base du nez. La mâchoire part de sous l’oreille et descend jusqu’au menton."
      ],
      drawing: {
        viewBox: '0 0 300 300',
        layers: [
          <g key="0">
            <circle className="ln" cx="150" cy="120" r="80" />
            <T x={150} y={28} a="middle" s={8}>la boîte crânienne : une sphère</T>
          </g>,
          <g key="1">
            <path className="lt" d="M90 65 A10 55 0 0 1 90 175" />
            <path className="cn" d="M90 65 A10 55 0 0 0 90 175" />
            <path className="lt" d="M210 65 A10 55 0 0 0 210 175" />
            <path className="cn" d="M210 65 A10 55 0 0 1 210 175" />
          </g>,
          <g key="2">
            <line className="gd" x1="150" y1="40" x2="150" y2="240" />
            <line className="gd" x1="70" y1="120" x2="230" y2="120" />
            <T x={234} y={123} s={8}>sourcils</T>
          </g>,
          <g key="3">
            <path className="cn" d="M96 65 H204 M92 175 H208 M125 232 H175" />
            <T x={234} y={68} s={8}>cheveux</T>
            <T x={234} y={178} s={8}>base du nez</T>
            <T x={182} y={236} s={8}>menton</T>
            <path className="gd" d="M262 65 V232 M258 65 H266 M258 120 H266 M258 175 H266 M258 232 H266" />
            <T x={270} y={96} s={8}>⅓</T>
            <T x={270} y={150} s={8}>⅓</T>
            <T x={270} y={206} s={8}>⅓</T>
          </g>,
          <g key="4">
            <path className="ln" d="M92 140 C96 192 122 228 150 233 C178 228 204 192 208 140" />
            <path className="lt" d="M135 232 Q150 236 165 232" />
          </g>,
          <g key="5">
            <ellipse className="lt" cx="121" cy="136" rx="18" ry="9" />
            <ellipse className="lt" cx="179" cy="136" rx="18" ry="9" />
            <path className="lt" d="M142 140 L138 172 L150 177 L162 172 L158 140" />
            <line className="lt" x1="128" y1="194" x2="172" y2="194" />
            <path className="lt" d="M88 122 C78 128 80 168 92 174 M212 122 C222 128 220 168 208 174" />
          </g>,
          <g key="6">
            <path className="ln" d="M116 215 C118 245 116 270 108 292 M184 215 C182 245 184 270 192 292" />
            <path className="lt" d="M108 270 Q80 280 50 290 M192 270 Q220 280 250 290" />
          </g>
        ]
      },
      steps: [
        { title: 'La sphère', text: "Trace un cercle léger, d’un geste d’épaule. C’est la boîte crânienne, sans la mâchoire. Sa taille définit celle de toute la tête." },
        { title: 'Couper les côtés', text: "Trace une ellipse étroite de chaque côté : c’est la « coupe » qui aplatit les tempes. Vue de face, la coupe est très fine ; elle s’élargira quand la tête tournera." },
        { title: 'Axes : médiane et sourcils', text: "Trace la ligne médiane verticale (axe de symétrie) et prolonge-la sous le cercle. La ligne horizontale qui passe par le centre du cercle est la ligne des sourcils." },
        { title: 'Les trois tiers', text: "Le haut de la coupe latérale donne la ligne des cheveux, le bas donne la base du nez. Reporte la distance sourcils → nez sous le cercle : tu obtiens le menton. Les trois tiers doivent être égaux." },
        { title: 'La mâchoire', text: "Depuis le bas des coupes latérales, trace la mâchoire qui descend vers le menton. Le menton est une petite surface plate, pas une pointe." },
        { title: 'Placer les repères du visage', text: "Orbites juste sous la ligne des sourcils, nez entre sourcils et base du nez, bouche à un tiers sous le nez, oreilles sur les côtés entre la ligne des sourcils et la base du nez." },
        { title: 'Le cou', text: "Le cou part de derrière la mâchoire, pas du menton. Il est presque aussi large que la mâchoire. Ajoute la ligne des trapèzes qui descend vers les épaules." }
      ],
      tips: {
        errors: [
          'Un menton trop court : le dernier tiers doit être égal aux deux autres.',
          'Placer les yeux trop haut : ils sont au milieu de la hauteur totale de la tête, pas au tiers supérieur.',
          'Un cou qui part du menton : il part de sous les oreilles.',
          'Oublier la coupe latérale : la tête ressemble à un ballon.'
        ],
        tricks: [
          'Entraîne-toi d’abord sur des photos : trace la sphère et les tiers par-dessus un visage avec l’outil « Visualiseur de références ».',
          'Dessine des dizaines de petites têtes Loomis (5 cm) : la vitesse vient avec la répétition.',
          'Garde tous les traits de construction très légers.'
        ],
        observe: [
          'Sur un visage réel, mesure les trois tiers avec ton crayon : ils varient un peu selon les personnes.',
          'Remarque que le haut de la tête dépasse largement la ligne des cheveux.'
        ]
      },
      exercise: {
        title: '20 têtes Loomis',
        duration: '30 minutes',
        material: ['Feuille A4', 'Crayon HB'],
        instructions: [
          'Dessine 10 têtes Loomis de face, d’environ 5 cm de haut, en 1 minute chacune.',
          'Vérifie à chaque fois l’égalité des trois tiers avec ton crayon.',
          'Prends 10 photos de visages de face (magazine, internet) et retrouve sur chacune la sphère et les tiers.',
          'Termine par 5 têtes plus abouties avec les repères des yeux, du nez, de la bouche et des oreilles.'
        ],
        selfCheck: [
          'Mes trois tiers sont égaux à l’œil nu.',
          'Le menton est sur la ligne médiane.',
          'Les oreilles sont entre la ligne des sourcils et la base du nez.'
        ]
      }
    },
    // ─────────────────────────────────────────────── B2
    {
      id: 'b2-face',
      module: 'portrait',
      title: 'Construire un visage de face',
      difficulty: 'Débutant',
      minutes: 45,
      skill: 'Placer yeux, nez, bouche et oreilles avec les proportions classiques',
      objective:
        "Placer avec précision tous les éléments d’un visage vu de face, grâce aux règles de proportions classiques.",
      why:
        "La ressemblance tient d’abord à la position des éléments les uns par rapport aux autres. Ces règles donnent un visage « moyen » juste ; ensuite, tu apprendras à observer comment ton modèle s’en écarte — c’est ce qui fait son caractère.",
      theory: [
        "**Les yeux sont à mi-hauteur de la tête** (du sommet du crâne au menton). C’est la règle la plus importante et la plus souvent ratée : les débutants les placent trop haut, laissant un front minuscule.",
        "**La largeur de la tête au niveau des yeux vaut environ cinq yeux** : un œil, l’espace entre les yeux (égal à un œil), un œil, plus un œil d’espace de chaque côté jusqu’au bord.",
        "**La base du nez** est à mi-chemin entre la ligne des yeux et le menton. **La largeur du nez** (ailes) correspond à l’écart entre les coins intérieurs des yeux.",
        "**La bouche** se place au premier tiers entre la base du nez et le menton. **Les coins de la bouche** tombent à l’aplomb des pupilles (ou du bord intérieur de l’iris).",
        "**Les oreilles** occupent la hauteur entre la ligne des sourcils et la base du nez. Le **cou** est presque aussi large que la mâchoire, et sa base s’évase vers les trapèzes.",
        "Ces règles décrivent un visage idéal : chaque personne s’en écarte un peu. Utilise-les pour construire, puis **observe et corrige** d’après ton modèle."
      ],
      drawing: {
        viewBox: '0 0 300 320',
        layers: [
          <g key="0">
            <path className="ln" d={egg} />
            <line className="gd" x1="150" y1="20" x2="150" y2="285" />
          </g>,
          <g key="1">
            <line className="gd" x1="55" y1="150" x2="245" y2="150" />
            <T x={248} y={153} s={8}>½</T>
            <T x={248} y={34} s={8}>sommet</T>
            <T x={248} y={273} s={8}>menton</T>
          </g>,
          <g key="2">
            {[72, 103.2, 134.4, 165.6, 196.8, 228].map((x) => (
              <line key={x} className="cn" x1={x} y1="140" x2={x} y2="160" />
            ))}
            {[1, 2, 3, 4, 5].map((i) => (
              <T key={i} x={72 + (i - 0.5) * 31.2} y={172} a="middle" s={7}>{String(i)}</T>
            ))}
          </g>,
          <g key="3">
            <path className="cn" d="M85 75 H215 M70 140 H230 M80 205 H220 M100 227 H200" />
            <T x={218} y={72} s={7}>cheveux</T>
            <T x={232} y={136} s={7}>sourcils</T>
            <T x={222} y={209} s={7}>nez</T>
            <T x={202} y={231} s={7}>bouche</T>
          </g>,
          <g key="4">
            <path className="gd" d="M134.4 150 V205 M165.6 150 V205" />
            <path className="gd" d="M118.8 150 V227 M181.2 150 V227" />
          </g>,
          <g key="5">
            <path className="ln" d="M71 145 C54 140 52 200 76 207" />
            <path className="ln" d="M229 145 C246 140 248 200 224 207" />
          </g>,
          <g key="6">
            <path className="ln" d="M103 150 Q118 138 134 150 Q118 158 103 150 Z" />
            <path className="ln" d="M166 150 Q182 138 197 150 Q182 158 166 150 Z" />
            <circle cx="118.8" cy="149" r="5" fill="#2e2a25" />
            <circle cx="181.2" cy="149" r="5" fill="#2e2a25" />
            <path className="ln" d="M100 136 Q118 127 138 134 M162 134 Q182 127 200 136" />
            <path className="ln" d="M139 199 Q135 207 143 208 Q150 212 157 208 Q165 207 161 199" />
            <path className="lt" d="M144 160 L142 192 M156 160 L158 192" opacity=".5" />
            <path className="ln" d="M120 227 Q135 222 150 225 Q165 222 180 227" />
            <path className="lt" d="M124 226 Q140 216 150 220 Q160 216 176 226 M124 229 Q150 242 176 229" />
            <path className="lt" d="M80 85 Q150 55 220 85" />
          </g>,
          <g key="7">
            <path className="ln" d="M110 255 C112 280 110 300 100 318 M190 255 C188 280 190 300 200 318" />
          </g>
        ]
      },
      steps: [
        { title: 'L’œuf et l’axe', text: "Vue de face, la tête a la forme d’un œuf, plus large en haut. Rapport largeur/hauteur : environ 2/3. Trace l’axe vertical de symétrie." },
        { title: 'Ligne des yeux : à mi-hauteur', text: "Mesure la hauteur totale (sommet → menton) et trace l’horizontale exactement au milieu. C’est la ligne des yeux. Oui, elle paraît basse : c’est normal, le crâne est haut." },
        { title: 'Largeur en cinq yeux', text: "Divise la largeur de la tête sur la ligne des yeux en cinq parts égales. Les yeux occupent les cases 2 et 4. L’espace entre les deux yeux mesure un œil." },
        { title: 'Lignes du nez, de la bouche, des cheveux', text: "Base du nez : à mi-chemin entre les yeux et le menton. Bouche : au premier tiers sous le nez. Sourcils : juste au-dessus des yeux. Cheveux : au tiers supérieur du visage." },
        { title: 'Aplombs', text: "Les ailes du nez sont à l’aplomb des coins intérieurs des yeux. Les coins de la bouche sont à l’aplomb des pupilles. Trace ces verticales légères." },
        { title: 'Les oreilles', text: "Elles se placent de chaque côté, entre la ligne des sourcils et la base du nez. Vues de face, on voit surtout leur bord : elles sont étroites." },
        { title: 'Dessiner les éléments', text: "Sur ces repères, dessine simplement les yeux en amande, les sourcils, la base du nez, la bouche et la ligne des cheveux. Ne détaille pas encore : on vérifie d’abord le placement." },
        { title: 'Le cou', text: "Le cou part de sous les oreilles, presque aussi large que la mâchoire. Il s’évase légèrement vers le bas." }
      ],
      tips: {
        errors: [
          'Yeux trop hauts et front trop petit.',
          'Yeux trop rapprochés ou trop écartés : vérifie la règle des cinq yeux.',
          'Bouche trop large : ses coins ne dépassent pas les pupilles.',
          'Oreilles trop basses ou trop petites.'
        ],
        tricks: [
          'Utilise l’outil « Grille de proportions du visage » de l’app pour réviser ces règles.',
          'Retourne ton dessin à l’envers : les asymétries sautent aux yeux.',
          'L’outil « Symétrie » permet de voir à quel point un vrai visage est asymétrique.'
        ],
        observe: [
          'Sur un portrait photo de face, vérifie chaque règle : laquelle ton modèle respecte-t-il, laquelle non ?',
          'Compare la largeur du nez avec l’espace entre les yeux.'
        ]
      },
      exercise: {
        title: 'Trois visages de face',
        duration: '45 minutes',
        material: ['Papier', 'Crayons HB et 2B', 'Trois photos de visages de face'],
        instructions: [
          'Dessine un visage « idéal » en suivant toutes les règles de la leçon (15 min).',
          'Pour chaque photo, construis l’œuf, puis mesure où se trouvent réellement les yeux, le nez et la bouche.',
          'Note à côté de chaque dessin en quoi ce visage s’écarte des proportions standard (yeux plus écartés, menton plus long…).',
          'Photographie tes dessins et ajoute-les dans « Mes dessins », liés à cette leçon.'
        ],
        selfCheck: [
          'Mes yeux sont à mi-hauteur de la tête.',
          'L’espace entre les yeux vaut un œil.',
          'J’ai identifié au moins une particularité de proportion pour chaque modèle.'
        ]
      }
    },
    // ─────────────────────────────────────────────── B3
    {
      id: 'b3-profil',
      module: 'portrait',
      title: 'Construire un visage de profil',
      difficulty: 'Intermédiaire',
      minutes: 45,
      skill: 'Construire une tête de profil et tracer la ligne du visage',
      objective:
        "Construire une tête vue de profil avec la méthode Loomis et dessiner la ligne caractéristique front-nez-lèvres-menton.",
      why:
        "Le profil révèle la profondeur de la tête, que la vue de face cache : la tête est presque aussi profonde que haute. C’est aussi l’angle où la ligne du visage exprime le plus le caractère d’une personne.",
      theory: [
        "De profil, la **coupe latérale** de la sphère devient un **cercle entier** : c’est le côté plat de la tête. Ce cercle est légèrement décalé vers l’avant de la sphère.",
        "La tête de profil est **presque aussi profonde que haute** : en comptant l’arrière du crâne, sa silhouette tient presque dans un carré. Les débutants dessinent souvent l’arrière du crâne beaucoup trop petit.",
        "Les **trois tiers** restent identiques : cheveux, sourcils, base du nez, menton. Le **plan du visage** est une ligne presque verticale tangente à l’avant du cercle latéral.",
        "**L’oreille** se trouve juste derrière le centre de la tête, entre la ligne des sourcils et la base du nez, légèrement inclinée vers l’arrière (parallèle à la ligne de la mâchoire).",
        "**L’œil**, de profil, est un triangle couché (un « V » ouvert vers l’avant), placé en retrait derrière l’arête du nez. **La bouche** est en retrait par rapport au nez : la lèvre supérieure avance généralement plus que la lèvre inférieure, et le menton se trouve encore un peu plus en arrière."
      ],
      drawing: {
        viewBox: '0 0 300 300',
        layers: [
          <g key="0">
            <circle className="ln" cx="140" cy="120" r="80" />
          </g>,
          <g key="1">
            <circle className="lt" cx="152" cy="120" r="56" />
            <line className="gd" x1="60" y1="120" x2="236" y2="120" />
            <Dot x={152} y={120} />
          </g>,
          <g key="2">
            <path className="cn" d="M150 64 H236 M150 176 H244 M170 232 H236" />
            <line className="gd" x1="219" y1="64" x2="222" y2="232" />
            <T x={248} y={68} s={8}>cheveux</T>
            <T x={248} y={124} s={8}>sourcils</T>
            <T x={250} y={180} s={8}>nez</T>
            <T x={242} y={236} s={8}>menton</T>
          </g>,
          <g key="3">
            <path className="ln" d="M150 176 L166 222 Q182 236 214 237" />
          </g>,
          <g key="4">
            <path className="ln" transform="translate(12 0)" d="M184 48 C204 68 210 100 210 118 Q204 124 207 130 L232 168 Q234 176 222 177 Q214 177 210 181 Q217 190 214 196 Q206 200 208 204 Q214 209 210 214 Q202 218 206 225 Q212 235 200 238 Q186 241 172 238" />
          </g>,
          <g key="5">
            <ellipse className="ln" cx="142" cy="148" rx="11" ry="26" transform="rotate(14 142 148)" />
            <path className="lt" d="M145 130 Q136 142 142 160" />
            <path className="ln" d="M198 134 L213 131 L211 142 Z" />
            <path className="lt" d="M192 124 Q207 118 220 121" />
            <path className="lt" d="M208 203 L220 204" />
          </g>,
          <g key="6">
            <path className="ln" d="M184 238 Q188 265 194 296 M80 170 Q92 230 96 296" />
          </g>
        ]
      },
      steps: [
        { title: 'La sphère', text: "Trace la sphère crânienne. De profil, elle représente tout le crâne, front et arrière de la tête compris." },
        { title: 'Le cercle latéral et la ligne des sourcils', text: "Trace la coupe latérale : un cercle plus petit, légèrement décalé vers l’avant. Son centre sert de repère pour l’oreille. La ligne horizontale passant par ce centre est la ligne des sourcils." },
        { title: 'Plan du visage et trois tiers', text: "Trace une ligne presque verticale à l’avant du cercle : le plan du visage. Haut du cercle = cheveux, bas du cercle = base du nez, puis reporte un tiers vers le bas pour le menton." },
        { title: 'La mâchoire', text: "Depuis le bas du cercle latéral, juste sous l’oreille, trace la branche de la mâchoire qui descend en oblique, puis tourne pour rejoindre le menton." },
        { title: 'La ligne du profil', text: "Trace d’un trait continu : front, arcade sourcilière, creux à la racine du nez, arête et pointe du nez, base du nez, lèvre supérieure, lèvre inférieure, creux du menton, menton, puis dessous de la mâchoire." },
        { title: 'Oreille, œil, bouche', text: "Oreille juste derrière le centre du cercle, inclinée vers l’arrière. Œil en forme de triangle couché, en retrait derrière l’arête du nez. Coin de la bouche à l’aplomb de l’œil environ." },
        { title: 'Le cou', text: "Le cou est incliné vers l’avant. L’avant part de sous le menton, l’arrière part de la base du crâne, bien plus haut qu’on ne le pense." }
      ],
      tips: {
        errors: [
          'Arrière du crâne trop petit : la tête paraît aplatie.',
          'Œil dessiné en amande comme de face : de profil, c’est un triangle.',
          'Oreille trop en avant, collée à l’œil.',
          'Cou vertical : il est toujours incliné vers l’avant.'
        ],
        tricks: [
          'Mesure : de profil, la distance œil → arrière de l’oreille ≈ distance œil → menton.',
          'Vérifie la silhouette entière (cheveux compris) : elle s’inscrit presque dans un carré.'
        ],
        observe: [
          'Sur des photos de profil, compare l’avancée de la lèvre supérieure, de la lèvre inférieure et du menton.',
          'Observe l’angle de la mâchoire et l’inclinaison de l’oreille : ils sont souvent parallèles.'
        ]
      },
      exercise: {
        title: 'Profils d’après photos',
        duration: '45 minutes',
        material: ['Papier', 'Crayons HB et 2B', 'Photos de profils variés (homme, femme, âges différents)'],
        instructions: [
          'Dessine 5 constructions Loomis de profil sans modèle (3 min chacune).',
          'Choisis 3 photos de profil. Pour chacune, construis la tête puis trace la ligne du profil.',
          'Compare les trois profils : nez droit, busqué, retroussé ; menton avancé ou fuyant.',
          'Finis un des profils avec les valeurs simples (ombre propre de l’œil, du dessous du nez, sous la lèvre inférieure).'
        ],
        selfCheck: [
          'La silhouette de mes têtes tient presque dans un carré.',
          'L’oreille est derrière le centre de la tête.',
          'L’œil de profil est en retrait par rapport à l’arête du nez.'
        ]
      }
    },
    // ─────────────────────────────────────────────── B4
    {
      id: 'b4-oeil',
      module: 'portrait',
      title: 'Dessiner un œil réaliste',
      difficulty: 'Intermédiaire',
      minutes: 60,
      skill: 'Dessiner un œil réaliste en 7 étapes, du globe aux reflets',
      objective:
        "Dessiner un œil réaliste, étape par étape, en comprenant qu’il s’agit d’une sphère enveloppée par les paupières.",
      why:
        "Le regard est le premier endroit où se pose l’œil du spectateur. Un œil juste donne vie à un portrait entier ; un œil faux suffit à le ruiner. C’est aussi l’élément le plus riche en textures : humide, brillant, fibreux.",
      theory: [
        "L’œil est un **globe sphérique** d’environ 2,5 cm, logé dans l’orbite. Ce que tu vois — l’amande — n’est que la partie du globe visible entre les paupières. **Les paupières épousent la sphère** : elles ont une épaisseur et projettent une ombre.",
        "La forme en amande **n’est pas symétrique** : le point le plus haut de la paupière supérieure est **vers l’intérieur** (côté nez), le point le plus bas de la paupière inférieure est **vers l’extérieur**. Le coin extérieur est souvent un peu plus haut que le coin intérieur.",
        "**L’iris** n’est presque jamais entièrement visible : la paupière supérieure en recouvre le haut, et souvent la paupière inférieure le touche ou le recouvre légèrement. Un iris entièrement visible donne un regard effrayé.",
        "Le **blanc de l’œil n’est pas blanc** : étant une sphère, il est ombré vers les coins et sous la paupière supérieure. Le dessiner blanc pur aplatit l’œil.",
        "Les **cils** poussent depuis le bord épais de la paupière, en courbe, groupés en petites touffes. Ils sont plus longs vers l’extérieur. Les cils inférieurs sont courts et clairsemés. Le **reflet** (point lumineux) est l’élément le plus clair du dessin : il se pose sur la cornée, à cheval entre la pupille et l’iris, au même endroit sur les deux yeux."
      ],
      drawing: {
        viewBox: '0 0 320 200',
        layers: [
          <g key="0">
            <circle className="cn" cx="160" cy="100" r="62" />
            <line className="cn" x1="70" y1="109" x2="250" y2="95" />
            <path className="ln" d={eyeTop} />
            <path className="ln" d={eyeBot} />
            <Dot x={85} y={108} /> <Dot x={238} y={96} />
          </g>,
          <g key="1">
            <defs>
              <clipPath id="eyeClipB4">
                <path d={eyeShape} />
              </clipPath>
            </defs>
            <g clipPath="url(#eyeClipB4)">
              <circle className="ln" cx="158" cy="98" r="30" />
            </g>
          </g>,
          <g key="2">
            <circle cx="158" cy="98" r="12" fill="#25211d" />
          </g>,
          <g key="3">
            <path className="ln" d="M92 98 C112 42 205 38 246 86" />
            <path className="lt" d="M92 112 C126 138 200 134 236 101" />
            <path className="lt" d="M85 108 Q92 99 99 107 Q92 114 85 108" />
          </g>,
          <g key="4">
            <g clipPath="url(#eyeClipB4)">
              <path d="M80 60 C110 62 200 58 245 96 L245 104 C200 76 120 76 80 112 Z" fill="#4b453e" opacity=".45" />
              <path d="M80 90 L112 90 L105 130 L80 130 Z" fill="#998f82" opacity=".35" />
              <path d="M210 70 L245 70 L245 130 L205 130 Z" fill="#998f82" opacity=".4" />
              <circle cx="158" cy="98" r="30" fill="none" stroke="#2e2a25" strokeWidth="5" opacity=".55" />
              <circle cx="158" cy="98" r="24" fill="url(#hatchLight)" />
            </g>
            <path d="M92 98 C112 42 205 38 246 86 C205 52 115 54 96 92 Z" fill="url(#hatchLight)" />
          </g>,
          <g key="5">
            {[
              [100, 90, 92, 72], [110, 80, 104, 60], [122, 73, 118, 52], [136, 68, 136, 46], [150, 66, 154, 43],
              [164, 66, 172, 42], [178, 68, 190, 44], [192, 72, 207, 50], [205, 77, 222, 57], [217, 84, 236, 66], [227, 90, 248, 76]
            ].map(([x1, y1, x2, y2], i) => (
              <path key={i} className="lt" d={`M${x1} ${y1} Q${(x1 + x2) / 2 + 4} ${(y1 + y2) / 2 + 2} ${x2} ${y2}`} />
            ))}
            {[[130, 124, 127, 135], [160, 127, 159, 139], [190, 121, 194, 133], [215, 110, 222, 120]].map(([x1, y1, x2, y2], i) => (
              <line key={i} className="lt" x1={x1} y1={y1} x2={x2} y2={y2} />
            ))}
          </g>,
          <g key="6">
            <g clipPath="url(#eyeClipB4)">
              {Array.from({ length: 18 }, (_, i) => {
                const a = (i / 18) * Math.PI * 2;
                return <line key={i} x1={158 + Math.cos(a) * 13} y1={98 + Math.sin(a) * 13} x2={158 + Math.cos(a) * 28} y2={98 + Math.sin(a) * 28} stroke="#2e2a25" strokeWidth=".7" opacity=".5" />;
              })}
            </g>
            <circle cx="168" cy="89" r="5.5" fill="#fffdf8" />
            <path d="M110 117 Q160 132 215 108" stroke="#fffdf8" strokeWidth="1.5" fill="none" />
          </g>
        ],
        annotations: (
          <g>
            <Note x={92} y={98} tx={20} ty={40}>pli de la paupière</Note>
            <Note x={168} y={89} tx={262} ty={30}>reflet</Note>
            <Note x={86} y={108} tx={15} ty={150}>caroncule</Note>
            <Note x={150} y={124} tx={150} ty={180} a="middle">bord épais de la paupière</Note>
            <Note x={225} y={100} tx={265} ty={150}>blanc ombré</Note>
          </g>
        )
      },
      steps: [
        { title: 'La forme générale', text: "Trace légèrement le cercle du globe, puis l’axe qui relie le coin intérieur et le coin extérieur (légèrement incliné vers le haut). Dessine l’amande : le haut de la paupière supérieure culmine côté nez, le bas de la paupière inférieure côté extérieur." },
        { title: 'Positionner l’iris', text: "Trace un cercle parfait pour l’iris (environ un tiers à la moitié de la largeur de l’œil). La paupière supérieure en recouvre le haut ; le bas touche à peine la paupière inférieure. Ne dessine que la partie visible." },
        { title: 'La pupille', text: "Au centre exact de l’iris, une pupille ronde et très sombre. Sa taille varie avec la lumière, mais elle reste toujours centrée dans l’iris." },
        { title: 'Construire les paupières', text: "Trace le pli de la paupière supérieure, qui suit la courbe du globe. Ajoute l’épaisseur de la paupière inférieure (une seconde ligne parallèle sous l’amande) et la caroncule, la petite masse rose au coin intérieur." },
        { title: 'Les ombres', text: "La paupière supérieure projette une ombre sur le haut du globe et de l’iris. Ombre le blanc de l’œil vers les coins : c’est une sphère. Fonce le contour de l’iris (anneau limbique) et ombre doucement le pli de la paupière." },
        { title: 'Les cils', text: "Les cils partent du bord de la paupière, pas de la ligne de l’amande. Trace-les d’un geste rapide, de la racine vers la pointe (trait effilé), en courbes, par petits groupes. Plus longs vers l’extérieur, ils suivent la rotation de la paupière. En bas : quelques cils courts, espacés." },
        { title: 'Reflets et textures', text: "Réserve ou gomme le reflet sur la cornée, à cheval sur la pupille et l’iris. Trace les fibres de l’iris en rayons depuis la pupille, en alternant clair et sombre. Ajoute la ligne humide claire sur le bord de la paupière inférieure." }
      ],
      tips: {
        errors: [
          'Un iris entièrement visible, entouré de blanc : regard effrayé.',
          'Le blanc de l’œil laissé blanc pur : l’œil devient plat.',
          'Des cils plantés sur la ligne de l’amande comme des pics, tous parallèles.',
          'Une amande symétrique comme un ballon de rugby.',
          'Des reflets placés à des endroits différents sur les deux yeux.'
        ],
        tricks: [
          'Réserve le reflet dès le début (ne l’assombris jamais) ou utilise une gomme stylo.',
          'Pour les cils, tourne la feuille pour toujours tracer de la racine vers la pointe.',
          'Dessine toujours les deux yeux en même temps, étape par étape, pour qu’ils restent cohérents.'
        ],
        observe: [
          'Regarde ton œil dans un miroir : où est le point le plus haut de ta paupière supérieure ?',
          'Observe combien de blanc est visible au-dessus et au-dessous de l’iris.'
        ]
      },
      exercise: {
        title: 'L’œil en 7 étapes',
        duration: '60 minutes',
        material: ['Papier à dessin lisse', 'Crayons HB, 2B, 4B (+6B pour la pupille)', 'Gomme mie de pain et gomme stylo', 'Estompe', 'Une photo d’œil en gros plan'],
        instructions: [
          'Reproduis la démonstration de la leçon, en suivant chaque étape dans l’ordre (20 min).',
          'Puis dessine l’œil de ta photo en gros plan (10 cm de large) en suivant les mêmes 7 étapes.',
          'Pour l’étape 5, compare les valeurs avec l’outil « Guide des valeurs de gris ».',
          'Termine en dessinant tes deux yeux dans un miroir, plus petits, en travaillant les deux en parallèle.'
        ],
        selfCheck: [
          'Le haut de l’iris est caché par la paupière.',
          'Le blanc de mon œil a au moins deux valeurs de gris.',
          'Mes cils sont courbes et effilés, avec des longueurs variées.',
          'Le reflet est la zone la plus claire du dessin.'
        ]
      }
    },
    // ─────────────────────────────────────────────── B5
    {
      id: 'b5-nez',
      module: 'portrait',
      title: 'Construire le nez',
      difficulty: 'Intermédiaire',
      minutes: 50,
      skill: 'Construire le nez en plans et en boules, puis le modeler par les valeurs',
      objective:
        "Construire le nez vu de face comme un volume en plans, puis le dessiner sans contour, uniquement par les ombres.",
      why:
        "Le nez est difficile car vu de face, il n’a presque pas de contour : il n’existe que par ses ombres. Le comprendre comme un volume en plans est la clé pour le rendre crédible.",
      theory: [
        "Le nez se simplifie en **un coin (prisme)** : un **plan de face** étroit (l’arête), deux **plans latéraux** qui descendent vers les joues, et un **plan de dessous** (la base, avec les narines).",
        "Sur ce volume, on ajoute **trois boules** : la **pointe** (le lobe), et les deux **ailes** de chaque côté. Les narines se placent sous ces boules, entre la pointe et les ailes.",
        "La largeur des ailes correspond environ à l’écart entre les coins intérieurs des yeux. La partie haute du nez est osseuse (arête nette), la partie basse est cartilagineuse (formes arrondies).",
        "Vu de face, **évite de tracer le contour de l’arête**. On suggère le nez par la valeur des plans latéraux (le côté à l’ombre), l’ombre du dessous et l’ombre portée sur la lèvre supérieure.",
        "Les **narines** ne sont jamais des trous noirs uniformes : elles sont plus sombres à l’intérieur et s’éclaircissent vers le bord. Leur forme est celle d’une virgule ou d’un haricot."
      ],
      drawing: {
        viewBox: '0 0 300 250',
        layers: [
          <g key="0">
            <path className="lt" d="M143 30 L157 30 L168 165 L185 196 L115 196 L132 165 Z" />
            <path className="cn" d="M143 30 L132 165 M157 30 L168 165 M132 165 L168 165" />
            <T x={190} y={100} s={8}>plan latéral</T>
            <T x={150} y={22} a="middle" s={8}>arête (plan de face)</T>
          </g>,
          <g key="1">
            <circle className="cn" cx="150" cy="178" r="22" />
            <circle className="cn" cx="118" cy="192" r="14" />
            <circle className="cn" cx="182" cy="192" r="14" />
          </g>,
          <g key="2">
            <path d="M127 201 Q135 193 143 202 Q135 208 127 201 Z" fill="#25211d" />
            <path d="M173 201 Q165 193 157 202 Q165 208 173 201 Z" fill="#25211d" />
          </g>,
          <g key="3">
            <path className="ln" d="M120 178 C101 184 101 205 120 206 Q130 208 137 204" />
            <path className="ln" d="M180 178 C199 184 199 205 180 206 Q170 208 163 204" />
            <path className="lt" d="M137 204 Q150 213 163 204" />
            <path className="lt" d="M140 60 Q136 120 132 160" opacity=".55" />
          </g>,
          <g key="4">
            <path d="M143 30 L132 165 L120 178 C108 182 104 192 108 200 L115 196 L132 165 Z" fill="url(#hatch)" />
            <path d="M143 30 L132 160 Q125 172 112 182 L105 150 Q120 90 140 30 Z" fill="url(#hatchLight)" />
            <path d="M128 202 Q150 216 172 202 Q160 210 150 211 Q140 210 128 202 Z" fill="#4b453e" opacity=".6" />
            <path d="M118 214 Q150 232 182 214 Q150 224 118 214 Z" fill="#4b453e" opacity=".45" />
            <path d="M157 30 L168 165 L180 178 L185 170 L162 30 Z" fill="url(#hatchLight)" opacity=".6" />
          </g>,
          <g key="5">
            <ellipse cx="153" cy="172" rx="7" ry="5" fill="#fffdf8" />
            <path d="M151 60 L153 140" stroke="#fffdf8" strokeWidth="3" strokeLinecap="round" opacity=".9" />
          </g>
        ]
      },
      steps: [
        { title: 'Le coin en plans', text: "Trace le nez comme un volume en coin : une arête étroite (plan de face) qui s’élargit vers le bas, deux plans latéraux, et un plan de dessous trapézoïdal. C’est la structure qui portera les ombres." },
        { title: 'Les trois boules', text: "Place une boule pour la pointe du nez, au bas de l’arête, et deux boules plus petites pour les ailes, de part et d’autre, un peu plus haut et plus en arrière." },
        { title: 'Les narines', text: "Sous la pointe, entre la boule centrale et chaque aile, place les narines en forme de virgule. Elles sont inclinées vers l’intérieur et le haut." },
        { title: 'Le contour utile', text: "Dessine le contour des ailes (la courbe qui les sépare de la joue) et le bas de la pointe (la columelle). N’appuie pas sur l’arête : à peine une indication du côté de l’ombre." },
        { title: 'Les ombres', text: "Lumière venant de la droite : ombre le plan latéral gauche, du sourcil jusqu’à l’aile. Le dessous du nez est sombre. Ajoute l’ombre portée du nez sur la lèvre supérieure. Les plans éclairés restent presque blancs." },
        { title: 'Les lumières', text: "Gomme un reflet sur la pointe (la peau y est souvent grasse et brillante) et une lumière fine le long de l’arête. Ces lumières suffisent à faire « sortir » le nez du visage." }
      ],
      tips: {
        errors: [
          'Tracer deux lignes parallèles pour l’arête : le nez ressemble à un tube.',
          'Des narines noires et rondes comme des trous.',
          'Un nez trop large ou des ailes trop basses.',
          'Oublier l’ombre portée sous le nez : il ne ressort pas.'
        ],
        tricks: [
          'Pense « plans » avant « traits » : demande-toi quelle surface est tournée vers la lumière.',
          'Les ombres du nez sont souvent plus douces que tu ne crois : utilise l’estompe.',
          'Photographie ton propre nez avec une lampe sur le côté, puis passe la photo en noir et blanc.'
        ],
        observe: [
          'Où se trouve la zone la plus sombre de la narine ?',
          'Le reflet sur la pointe du nez : net ou diffus ?'
        ]
      },
      exercise: {
        title: 'Nez en plans et en valeurs',
        duration: '50 minutes',
        material: ['Papier', 'Crayons HB, 2B, 4B', 'Estompe et gomme', 'Photos de nez de face et de trois quarts'],
        instructions: [
          'Dessine 6 nez « en plans » (le coin + les trois boules) sous différents angles (3 min chacun).',
          'Choisis une photo de nez de face, éclairé latéralement.',
          'Construis le coin et les boules très légèrement, puis rends-le uniquement par les valeurs, sans contour sur l’arête.',
          'Gomme ensuite les constructions et compare avec la photo à 2 m de distance.'
        ],
        selfCheck: [
          'Mon nez se lit sans contour sur l’arête.',
          'Les narines ont un dégradé, pas un aplat noir.',
          'L’ombre portée sous le nez est présente.'
        ]
      }
    },
    // ─────────────────────────────────────────────── B6
    {
      id: 'b6-bouche',
      module: 'portrait',
      title: 'Construire la bouche',
      difficulty: 'Intermédiaire',
      minutes: 50,
      skill: 'Construire la bouche et rendre le volume des lèvres',
      objective:
        "Construire une bouche de face, comprendre la forme de chaque lèvre et les rendre en volume avec leurs ombres.",
      why:
        "La bouche est l’élément le plus mobile et le plus expressif du visage avec les yeux. Elle s’enroule autour du cylindre des dents : la dessiner plate est l’erreur la plus fréquente.",
      theory: [
        "La bouche repose sur un **cylindre** : l’arcade dentaire. Vue de face, elle s’incurve donc légèrement ; de trois quarts, la moitié éloignée se raccourcit nettement.",
        "**La ligne de la bouche** (la fente entre les lèvres) est la ligne la plus sombre et la plus importante. Elle n’est pas droite : elle ondule, descend légèrement au centre sous le tubercule et remonte puis redescend vers les coins.",
        "**La lèvre supérieure** a la forme d’un « M » étiré : l’**arc de Cupidon** au centre, prolongé vers le haut par les deux crêtes du **philtrum**. Elle est généralement plus fine et, étant orientée vers le bas, **plus sombre**.",
        "**La lèvre inférieure** est plus pleine et orientée vers le haut : elle reçoit la lumière, donc elle est **plus claire**. Elle projette une **ombre sous elle**, sur le haut du menton.",
        "Les **coins de la bouche** (commissures) sont de petites zones sombres qui s’enfoncent dans la joue. Les lèvres ont une **texture** de fines rides verticales qui suivent leur volume, et un **reflet** souvent marqué sur la lèvre inférieure."
      ],
      drawing: {
        viewBox: '0 0 300 210',
        layers: [
          <g key="0">
            <line className="gd" x1="150" y1="40" x2="150" y2="185" />
            <line className="gd" x1="65" y1="110" x2="235" y2="110" />
            <path className="cn" d="M85 75 V150 M215 75 V150 M95 82 H205 M95 146 H205" />
          </g>,
          <g key="1">
            <path className="ln" d="M85 110 Q110 104 135 108 Q150 114 165 108 Q190 104 215 110" />
          </g>,
          <g key="2">
            <path className="ln" d="M85 110 Q110 92 135 84 Q143 82 150 89 Q157 82 165 84 Q190 92 215 110" />
            <path className="lt" d="M138 84 L141 56 M162 84 L159 56" />
          </g>,
          <g key="3">
            <path className="ln" d="M92 113 Q115 142 150 146 Q185 142 208 113" />
          </g>,
          <g key="4">
            <path className="lt" d="M80 104 Q85 111 82 118 M220 104 Q215 111 218 118" />
            <path className="lt" d="M124 168 Q150 160 176 168" />
          </g>,
          <g key="5">
            <path d="M85 110 Q110 92 135 84 Q143 82 150 89 Q157 82 165 84 Q190 92 215 110 Q190 104 165 108 Q150 114 135 108 Q110 104 85 110 Z" fill="url(#lipShade)" />
            <path d="M108 147 Q150 163 192 147 Q150 156 108 147 Z" fill="#4b453e" opacity=".55" />
            <path d="M92 113 Q115 142 150 146 Q185 142 208 113 Q185 132 150 134 Q115 132 92 113 Z" fill="url(#hatchLight)" />
            <path d="M85 110 Q110 104 135 108 Q150 114 165 108 Q190 104 215 110" stroke="#25211d" strokeWidth="3" fill="none" />
          </g>,
          <g key="6">
            {[110, 122, 134, 146, 158, 170, 182, 194].map((x, i) => (
              <path key={i} className="lt" d={`M${x} ${116 + Math.abs(x - 150) * 0.05} Q${x + (x - 150) * 0.05} 128 ${x} ${140 - Math.abs(x - 150) * 0.2}`} opacity=".55" />
            ))}
            <ellipse cx="160" cy="128" rx="16" ry="5" fill="#fffdf8" opacity=".9" />
          </g>
        ]
      },
      steps: [
        { title: 'Les limites', text: "Trace l’axe vertical et la ligne de la bouche. Délimite la largeur (les coins, à l’aplomb des pupilles) et la hauteur des deux lèvres. La lèvre inférieure est en général un peu plus haute que la supérieure." },
        { title: 'La ligne de la bouche', text: "Trace la fente entre les lèvres : elle descend légèrement au centre, remonte, puis redescend vers les coins. C’est la ligne la plus sombre de la bouche ; trace-la avec soin, d’un trait souple." },
        { title: 'La lèvre supérieure', text: "Dessine l’arc de Cupidon au centre (forme de M aplati), puis les bords de la lèvre qui descendent vers les coins. Remonte légèrement les deux crêtes du philtrum vers le nez." },
        { title: 'La lèvre inférieure', text: "Trace une courbe plus pleine, plus arrondie. Le contour du bas est souvent à peine visible : on le suggérera surtout par l’ombre qu’il projette." },
        { title: 'Coins et menton', text: "Ajoute les commissures, petites virgules qui s’enfoncent dans la joue, et le creux au-dessus du menton (sillon mentonnier)." },
        { title: 'Les ombres', text: "Lumière venant du haut : la lèvre supérieure, tournée vers le bas, est plus sombre. La lèvre inférieure est claire, ombrée seulement vers le bas. Fonce la ligne de la bouche et ajoute l’ombre portée sous la lèvre inférieure." },
        { title: 'Texture et reflet', text: "Trace quelques plis verticaux très légers qui suivent la courbure des lèvres, plus marqués au centre. Gomme un reflet sur la lèvre inférieure. Évite de cerner les lèvres d’un contour sombre." }
      ],
      tips: {
        errors: [
          'Cerner les lèvres d’un contour noir comme un coloriage.',
          'Une ligne de bouche droite : la bouche paraît figée.',
          'Une lèvre supérieure plus claire que l’inférieure (sous une lumière venant du haut).',
          'Trop de plis verticaux, trop marqués.'
        ],
        tricks: [
          'Commence toujours par la ligne de la bouche : tout le reste s’organise autour.',
          'Le contour de la lèvre inférieure peut disparaître complètement : l’ombre portée suffit.',
          'Pour la bouche de trois quarts, pense au cylindre : la moitié éloignée est plus courte.'
        ],
        observe: [
          'Dans un miroir, avec une lampe au-dessus, compare la valeur de tes deux lèvres.',
          'Observe la forme de ta ligne de bouche quand tu souris légèrement.'
        ]
      },
      exercise: {
        title: 'Bouches d’après nature',
        duration: '50 minutes',
        material: ['Papier', 'Crayons HB, 2B, 4B', 'Estompe, gomme', 'Miroir et photos de bouches'],
        instructions: [
          'Reproduis la démonstration de la leçon étape par étape.',
          'Dessine 4 bouches différentes d’après photos (fines, pleines, souriantes, de trois quarts), en commençant toujours par la ligne de la bouche.',
          'Dessine ta propre bouche dans un miroir, éclairée par une lampe placée au-dessus.',
          'Ajoute ton meilleur dessin dans « Mes dessins ».'
        ],
        selfCheck: [
          'Ma lèvre supérieure est plus sombre que l’inférieure.',
          'Il n’y a pas de contour noir autour de mes lèvres.',
          'L’ombre portée sous la lèvre inférieure est visible.'
        ]
      }
    }
  ]
};
