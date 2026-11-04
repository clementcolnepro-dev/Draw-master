import type { Module } from './types';
import { Pencil, T, Note, Dot } from './shapes';

const grays = ['#f6f1e7', '#d9d1c3', '#bdb3a4', '#998f82', '#746b60', '#4b453e', '#25211d'];

export const fondamentaux: Module = {
  id: 'fondamentaux',
  letter: 'A',
  discipline: 'techniques',
  title: 'Les fondamentaux',
  subtitle: 'Trait, volumes, lumière, mesures',
  description:
    "Le socle de tout dessin réaliste. Chaque portrait, chaque corps et chaque pli de vêtement que tu dessineras plus tard repose sur ces six compétences : un trait maîtrisé, la vision en volumes, la perspective, la lumière, les valeurs et la mesure.",
  planned: ['Observation et reproduction d’objets du quotidien', 'Perspective à trois points de fuite'],
  lessons: [
    // ─────────────────────────────────────────────── A1
    {
      id: 'a1-trait',
      module: 'fondamentaux',
      title: 'Tenue du crayon et contrôle du trait',
      difficulty: 'Débutant',
      minutes: 25,
      skill: 'Tracer des traits droits, courbes et réguliers avec assurance',
      objective:
        "Apprendre à tenir le crayon de deux façons différentes et à tracer des lignes droites, des courbes, des ellipses et des hachures régulières.",
      why:
        "Un trait hésitant, fait de petits allers-retours, donne un dessin « poilu » et imprécis. Un trait posé, tracé d’un seul geste, rend tout plus propre et plus juste. C’est la base mécanique de tout le reste : sans contrôle du trait, impossible de construire proprement un visage ou un corps.",
      theory: [
        "Il existe **deux grandes prises du crayon**. La **prise d’écriture** (comme un stylo) donne de la précision pour les détails : un œil, une narine, le contour d’une lèvre. La **prise par-dessus** (crayon presque couché, tenu entre le pouce et les doigts, paume au-dessus) donne des traits longs et souples, et permet d’utiliser le flanc de la mine pour les ombres larges.",
        "Le secret d’un trait droit n’est pas le poignet mais **l’articulation qui pilote le geste**. Pour un trait court (2–3 cm), le poignet suffit. Pour un trait moyen, c’est le coude qui bouge. Pour un trait long ou une grande courbe, c’est l’épaule : tout le bras se déplace, le poignet reste bloqué. Un trait long tracé au poignet devient forcément courbe.",
        "La technique du **« fantôme »** : avant de tracer, place la pointe au-dessus du point de départ, fais 2 ou 3 fois le geste dans le vide en visant le point d’arrivée, puis pose la mine et trace d’un seul mouvement, rapidement. La vitesse rend le trait plus droit ; la lenteur le fait trembler.",
        "Enfin, apprends à **moduler la pression**. Un trait de construction doit être très léger (on doit pouvoir le gommer ou le recouvrir). Un trait de contour final peut être plus appuyé. Un trait qui commence fin, s’épaissit puis s’affine est plus vivant qu’un trait uniforme : c’est ce qu’on appelle un trait « effilé »."
      ],
      drawing: {
        viewBox: '0 0 320 310',
        layers: [
          <g key="0">
            <line className="lt" x1="15" y1="78" x2="150" y2="78" />
            <Pencil x={70} y={78} angle={-62} len={80} />
            <T x={20} y={95}>Prise d’écriture</T>
            <T x={20} y={106} s={8}>précision, détails</T>
            <line className="lt" x1="170" y1="78" x2="310" y2="78" />
            <Pencil x={190} y={78} angle={-18} len={110} />
            <T x={175} y={95}>Prise par-dessus</T>
            <T x={175} y={106} s={8}>traits longs, ombres au flanc</T>
          </g>,
          <g key="1">
            <Dot x={25} y={128} /> <Dot x={145} y={128} />
            <Dot x={25} y={146} /> <Dot x={145} y={168} />
            <line className="cn" x1="25" y1="140" x2="145" y2="140" />
            <line className="ln" x1="25" y1="128" x2="145" y2="128" />
            <line className="ln" x1="25" y1="146" x2="145" y2="168" />
            <T x={25} y={185} s={8}>relier deux points d’un seul geste</T>
          </g>,
          <g key="2">
            {Array.from({ length: 10 }, (_, i) => (
              <line key={i} className="lt" x1={180 + i * 12} y1={170} x2={200 + i * 12} y2={125} />
            ))}
            <T x={180} y={185} s={8}>hachures, espacement régulier</T>
          </g>,
          <g key="3">
            <path className="ln" d="M25 245 Q55 200 85 245" />
            <path className="ln" d="M95 205 Q130 255 150 205" />
            <path className="ln" d="M30 260 C60 230 100 290 145 255" />
            <T x={25} y={275} s={8}>courbes en C et en S, du coude</T>
          </g>,
          <g key="4">
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse key={i} className="lt" cx={245} cy={205 + i * 14} rx={50} ry={6 + i * 2.5} />
            ))}
            <line className="cn" x1="245" y1="195" x2="245" y2="275" />
            <T x={190} y={290} s={8}>ellipses de l’épaule, axe centré</T>
          </g>,
          <g key="5">
            <path d="M20 292 Q90 286 160 288 Q90 292 20 292 Z" fill="#2e2a25" opacity=".85" />
            <T x={20} y={304} s={8}>pression : léger → appuyé → léger</T>
          </g>
        ]
      },
      steps: [
        {
          title: 'Choisir sa prise',
          text: "Essaie les deux prises. Prise d’écriture : crayon incliné à environ 60°, main posée. Prise par-dessus : crayon presque à plat, pointe dirigée vers l’avant, la main ne touche pas la feuille. Garde les deux : tu changeras de prise selon ce que tu dessines."
        },
        {
          title: 'Relier deux points',
          text: "Marque deux points à 10 cm d’écart. Fais le « fantôme » (2–3 passages dans le vide), puis trace d’un trait rapide, en regardant le point d’arrivée et non la pointe du crayon. Le bras bouge depuis le coude ou l’épaule, le poignet est bloqué."
        },
        {
          title: 'Hachures parallèles',
          text: "Trace des traits courts, tous dans la même direction, avec le même espacement. Chaque trait part d’une même ligne imaginaire et s’arrête sur une autre. Le geste vient du poignet, en petits mouvements réguliers de va-et-vient… mais un seul sens de tracé."
        },
        {
          title: 'Courbes en C et en S',
          text: "Trace des arcs (forme en C) puis des courbes en S. Pour une courbe fluide, ne t’arrête jamais au milieu : un seul geste continu. Fais pivoter ta feuille pour garder un mouvement naturel de la main plutôt que de forcer le poignet."
        },
        {
          title: 'Ellipses empilées',
          text: "Trace des ellipses autour d’un axe vertical, de plus en plus ouvertes vers le bas. Tourne 2–3 fois sur la même ellipse sans lever le crayon : c’est l’épaule qui travaille. Ces ellipses sont la base de tous les volumes (cylindres, bras, cou, verres…)."
        },
        {
          title: 'Moduler la pression',
          text: "Trace un trait qui commence presque invisible, s’appuie au milieu et s’allège à la fin. C’est le trait effilé. Il donne de la vie aux contours : on appuie dans les zones d’ombre ou de contact, on allège dans la lumière."
        }
      ],
      tips: {
        errors: [
          'Tracer avec de petits traits hachés qui se chevauchent (« trait poilu »).',
          'Regarder la pointe du crayon au lieu du point d’arrivée.',
          'Tracer les grands traits au poignet : ils deviennent courbes.',
          'Appuyer fort dès le départ : les traits de construction ne s’effacent plus.'
        ],
        tricks: [
          'Tourne ta feuille pour toujours tracer dans ta direction la plus naturelle.',
          'Échauffe-toi 5 minutes avec des lignes et des ellipses avant chaque séance.',
          'Un crayon HB ou 2B suffit pour ces exercices ; taille-le long.'
        ],
        observe: [
          'L’espacement de tes hachures est-il constant ?',
          'Tes ellipses sont-elles symétriques de chaque côté de l’axe ?',
          'Tes traits arrivent-ils exactement sur le point visé ?'
        ]
      },
      exercise: {
        title: 'La page des traits',
        duration: '20 minutes',
        material: ['Feuille A4 (papier imprimante suffit)', 'Crayon HB ou 2B', 'Règle (uniquement pour vérifier)'],
        instructions: [
          'Divise ta feuille en 4 zones.',
          'Zone 1 : place 20 paires de points au hasard et relie-les d’un seul trait (technique du fantôme).',
          'Zone 2 : remplis 6 petits carrés de hachures parallèles, chacun dans une direction différente.',
          'Zone 3 : trace 3 colonnes d’ellipses empilées (5 ellipses chacune), de plus en plus ouvertes vers le bas.',
          'Zone 4 : trace 10 traits effilés (léger-appuyé-léger) de 10 cm.',
          'Vérifie tes lignes droites avec la règle : note combien sont vraiment droites.'
        ],
        selfCheck: [
          'Au moins la moitié de mes lignes droites passent par les deux points.',
          'Mes hachures ont un espacement visiblement régulier.',
          'Mes ellipses n’ont pas de pointes aux extrémités (elles restent arrondies).'
        ]
      }
    },
    // ─────────────────────────────────────────────── A2
    {
      id: 'a2-volumes',
      module: 'fondamentaux',
      title: 'Formes géométriques et volumes',
      difficulty: 'Débutant',
      minutes: 30,
      skill: 'Transformer des formes plates en volumes (cube, cylindre, sphère)',
      objective:
        "Passer des formes plates (carré, rectangle, cercle) aux volumes (cube, cylindre, sphère) et comprendre comment la lumière les révèle.",
      why:
        "Tout ce qui existe peut être simplifié en volumes simples : une tête est une sphère, un bras un cylindre, un torse une boîte. Les dessinateurs réalistes ne dessinent pas des contours, ils dessinent des volumes. C’est la compétence qui fait passer un dessin « plat » à un dessin qui a du relief.",
      theory: [
        "Un **contour** ne dit rien du volume : un cercle peut être une assiette ou une boule. Ce qui transforme le cercle en sphère, ce sont les **lignes de contour internes** (qui « enveloppent » la forme) et les **ombres**.",
        "Les trois volumes fondamentaux sont le **cube** (formes à plans nets : crâne vu de près, cage thoracique, bassin, boîtes), le **cylindre** (bras, jambes, cou, doigts) et la **sphère** (crâne, globe oculaire, épaules, genoux). Le **cône** complète la famille (nez, avant-bras qui s’affine).",
        "Pour dessiner un volume, pense « en transparence » : trace aussi les arêtes cachées, en pointillés légers. Tu comprendras ainsi comment la forme existe dans l’espace et pas seulement sur la feuille.",
        "Une **ellipse** est un cercle vu en biais. Plus on regarde un cercle de face, plus l’ellipse est ronde ; plus on le regarde par la tranche, plus elle est fine. Sur un cylindre vertical sous le niveau des yeux, l’ellipse du bas est **plus ouverte** que celle du haut.",
        "La lumière révèle le volume : sur un cube, chaque face a **une seule valeur** (claire, moyenne ou sombre). Sur un cylindre, la valeur change **progressivement** dans un seul sens. Sur une sphère, elle change dans **toutes les directions**."
      ],
      drawing: {
        viewBox: '0 0 320 230',
        layers: [
          <g key="0">
            <rect className="lt" x="30" y="90" width="70" height="70" />
            <rect className="lt" x="135" y="70" width="60" height="100" />
            <circle className="lt" cx="265" cy="125" r="38" />
            <T x={160} y={215} a="middle" s={9}>formes plates → volumes</T>
          </g>,
          <g key="1">
            <path className="ln" d="M30 90 L55 68 L125 68 L100 90 M100 90 L125 68 L125 138 L100 160" />
            <path className="cn" d="M55 68 L55 138 L125 138 M55 138 L30 160" />
            <T x={40} y={192} s={9}>cube</T>
          </g>,
          <g key="2">
            <ellipse className="ln" cx="165" cy="70" rx="30" ry="9" />
            <path className="ln" d="M135 170 A30 9 0 0 0 195 170" />
            <path className="cn" d="M135 170 A30 9 0 0 1 195 170" />
            <T x={150} y={192} s={9}>cylindre</T>
          </g>,
          <g key="3">
            <path className="lt" d="M227 125 A38 11 0 0 0 303 125" />
            <path className="cn" d="M227 125 A38 11 0 0 1 303 125" />
            <path className="lt" d="M265 87 A14 38 0 0 0 265 163" />
            <path className="cn" d="M265 87 A14 38 0 0 1 265 163" />
            <T x={250} y={192} s={9}>sphère</T>
          </g>,
          <g key="4">
            <line x1="12" y1="18" x2="48" y2="44" stroke="#b4532a" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <T x={8} y={14} s={8}>lumière</T>
            <polygon points="100,90 125,68 125,138 100,160" fill="url(#hatch)" />
            <polygon points="30,90 100,90 100,160 30,160" fill="url(#hatchLight)" />
            <rect x="135" y="70" width="60" height="100" fill="url(#cylShade)" opacity=".75" />
            <ellipse className="ln" cx="165" cy="70" rx="30" ry="9" fill="#f6f1e7" />
            <circle cx="265" cy="125" r="38" fill="url(#sphereShade)" opacity=".9" />
            <circle className="lt" cx="265" cy="125" r="38" />
          </g>,
          <g key="5">
            <polygon points="100,160 125,138 160,150 140,172" fill="#2e2a25" opacity=".35" />
            <ellipse cx="205" cy="174" rx="30" ry="7" fill="url(#castShadow)" />
            <ellipse cx="282" cy="166" rx="34" ry="7" fill="url(#castShadow)" />
          </g>
        ]
      },
      steps: [
        { title: 'Les formes plates', text: "Commence par un carré, un rectangle et un cercle. Ce sont des silhouettes : elles n’ont pas encore d’épaisseur. Trace-les légèrement, à main levée." },
        { title: 'Le cube', text: "Depuis trois coins du carré, trace des lignes obliques parallèles, de même longueur, vers l’arrière (en haut à droite). Relie-les. Trace aussi les arêtes cachées en pointillés : tu « vois » la boîte en transparence." },
        { title: 'Le cylindre', text: "Remplace les côtés haut et bas du rectangle par des ellipses. L’ellipse du haut est entière (on voit le dessus). Pour celle du bas, la moitié avant est visible, la moitié arrière est cachée : trace-la en pointillés." },
        { title: 'La sphère', text: "Trace deux ellipses de contour sur le cercle : un « équateur » horizontal et un « méridien » vertical. Les moitiés arrière sont en pointillés. Ces lignes enveloppent la forme : le cercle devient une boule." },
        { title: 'La lumière', text: "Choisis une source de lumière (ici en haut à gauche). Cube : la face de dessus est claire, la face de devant moyenne, la face de droite sombre. Cylindre : dégradé vertical, la zone la plus sombre est à droite mais pas sur le bord (le bord reçoit un peu de lumière réfléchie). Sphère : dégradé circulaire." },
        { title: 'Les ombres portées', text: "Chaque objet projette une ombre sur le sol, du côté opposé à la lumière. Elle est plus sombre et plus nette près de l’objet, plus claire et plus floue en s’éloignant. Elle « ancre » l’objet au sol." }
      ],
      tips: {
        errors: [
          'Des ellipses en forme de citron (pointues aux extrémités) : une ellipse est toujours arrondie.',
          'Des arêtes de cube non parallèles : les obliques doivent toutes avoir le même angle.',
          'Assombrir le bord du cylindre ou de la sphère au maximum : la zone la plus sombre est un peu à l’intérieur.'
        ],
        tricks: [
          'Dessine toujours en transparence au début : les arêtes cachées t’empêchent de tricher.',
          'Pose un vrai mug, une boîte et une orange sur la table, avec une lampe sur le côté : observe.',
          'Pour la sphère, plisse les yeux : tu ne verras plus que 3 ou 4 grandes valeurs.'
        ],
        observe: [
          'Sur un cylindre réel, regarde la différence d’ouverture entre l’ellipse du haut et celle du bas.',
          'Repère où se trouve la zone la plus sombre d’une sphère réelle.'
        ]
      },
      exercise: {
        title: '30 volumes en transparence',
        duration: '30 minutes',
        material: ['Feuille A4', 'Crayon HB et 2B', 'Une lampe orientable'],
        instructions: [
          'Dessine 10 cubes de tailles et d’orientations différentes, en transparence (arêtes cachées en pointillés).',
          'Dessine 10 cylindres : debout, couchés, inclinés. Vérifie que les ellipses sont perpendiculaires à l’axe du cylindre.',
          'Dessine 10 sphères avec leurs lignes d’équateur et de méridien, chacune orientée différemment.',
          'Choisis-en un de chaque et ombre-le avec une lumière venant du haut à gauche, ombre portée comprise.'
        ],
        selfCheck: [
          'Sur mes cubes, les arêtes parallèles restent parallèles.',
          'Mes ellipses de cylindre sont perpendiculaires à l’axe.',
          'Sur mes volumes ombrés, on comprend d’où vient la lumière.'
        ]
      }
    },
    // ─────────────────────────────────────────────── A3
    {
      id: 'a3-perspective',
      module: 'fondamentaux',
      title: 'Perspective élémentaire',
      difficulty: 'Débutant',
      minutes: 35,
      skill: 'Construire une boîte en perspective à deux points de fuite',
      objective:
        "Comprendre la ligne d’horizon et les points de fuite, et construire une boîte correcte en perspective à deux points.",
      why:
        "Le corps humain est un ensemble de volumes vus en perspective : les épaules, le bassin, les pieds, le visage de trois quarts… Sans perspective, un personnage paraît plat ou « tordu ». La boîte est l’outil de base pour placer correctement toutes ces formes.",
      theory: [
        "La **ligne d’horizon** correspond toujours au **niveau de tes yeux**. Si tu regardes un objet posé plus bas que tes yeux, tu vois son dessus. S’il est plus haut, tu vois son dessous.",
        "Les lignes parallèles qui s’éloignent de toi semblent **converger vers un point** situé sur l’horizon : le **point de fuite** (PF). Les rails d’un train en sont l’exemple parfait.",
        "En **perspective à un point**, l’objet est vu de face : ses lignes de profondeur vont vers un seul PF. En **perspective à deux points**, l’objet est vu par un coin : ses deux familles de lignes horizontales partent vers deux PF, l’un à gauche, l’autre à droite. Les verticales restent verticales.",
        "Plus les points de fuite sont **proches** l’un de l’autre, plus la déformation est forte (effet grand angle). Pour un rendu naturel, place-les **loin**, souvent même en dehors de la feuille.",
        "Règle d’or : toutes les lignes parallèles d’une même famille vont vers **le même** point de fuite. Si une arête « rate » son point, la boîte se tord."
      ],
      drawing: {
        viewBox: '0 0 320 220',
        layers: [
          <g key="0">
            <line className="gd" x1="0" y1="70" x2="320" y2="70" />
            <T x={160} y={62} a="middle" s={8}>ligne d’horizon = niveau des yeux</T>
          </g>,
          <g key="1">
            <Dot x={10} y={70} r={4} />
            <Dot x={310} y={70} r={4} />
            <T x={12} y={86} s={9}>PF1</T>
            <T x={308} y={86} a="end" s={9}>PF2</T>
          </g>,
          <g key="2">
            <line className="ln" x1="150" y1="110" x2="150" y2="190" />
            <T x={156} y={200} s={8}>arête la plus proche</T>
          </g>,
          <g key="3">
            <path className="cn" d="M150 110 L10 70 M150 190 L10 70 M150 110 L310 70 M150 190 L310 70" />
          </g>,
          <g key="4">
            <path className="ln" d="M80 90 L80 130 L150 190 L230 130 L230 90 L150 110 L80 90 M150 110 L150 190" />
          </g>,
          <g key="5">
            <path className="cn" d="M80 90 L310 70 M230 90 L10 70" />
            <path className="ln" d="M80 90 L156.7 83.3 L230 90" />
          </g>,
          <g key="6">
            <polygon points="80,90 150,110 150,190 80,130" fill="url(#hatch)" />
            <polygon points="150,110 230,90 230,130 150,190" fill="url(#hatchLight)" />
          </g>
        ]
      },
      steps: [
        { title: 'La ligne d’horizon', text: "Trace une ligne horizontale légère : c’est le niveau de tes yeux. Ici, elle est haute : nous regardons la boîte d’au-dessus, nous verrons donc sa face supérieure." },
        { title: 'Les deux points de fuite', text: "Place un point de fuite à chaque extrémité de l’horizon, le plus loin possible l’un de l’autre. Des points trop rapprochés déforment la boîte." },
        { title: 'L’arête la plus proche', text: "Sous l’horizon, trace une verticale : c’est l’arête de la boîte la plus proche de toi. Sa hauteur détermine la taille de la boîte." },
        { title: 'Les fuyantes', text: "Depuis le haut et le bas de cette arête, trace des lignes légères vers chaque point de fuite. Ce sont les fuyantes : les arêtes horizontales de la boîte seront posées dessus." },
        { title: 'Les arêtes latérales', text: "Choisis la profondeur de chaque face en traçant deux nouvelles verticales, entre les fuyantes. Tu obtiens les deux faces visibles de la boîte." },
        { title: 'Le dessus', text: "Depuis le haut de chaque arête latérale, trace une fuyante vers le point de fuite opposé. Leur croisement donne le coin arrière. La face supérieure est fermée." },
        { title: 'Les valeurs', text: "Lumière venant de la droite : la face droite est moyenne, la face gauche sombre, le dessus clair. Chaque face plane garde une valeur uniforme : c’est ce qui la fait paraître plate et nette." }
      ],
      tips: {
        errors: [
          'Des verticales penchées : en perspective à deux points, elles restent strictement verticales.',
          'Des points de fuite trop proches : la boîte paraît déformée.',
          'Placer l’horizon au hasard : il doit correspondre à ton point de vue réel.'
        ],
        tricks: [
          'Colle deux bouts de ruban adhésif sur la table, hors de la feuille, pour servir de points de fuite lointains.',
          'Commence avec une règle pour comprendre, puis refais à main levée.',
          'Prends en photo un coin de rue et trace par-dessus les fuyantes : tu trouveras l’horizon.'
        ],
        observe: [
          'Toutes tes arêtes d’une même direction convergent-elles bien vers le même point ?',
          'La face du dessus paraît-elle plate et non inclinée ?'
        ]
      },
      exercise: {
        title: 'Le ciel de boîtes',
        duration: '30 minutes',
        material: ['Feuille A4 ou A3 en paysage', 'Crayon HB', 'Règle'],
        instructions: [
          'Trace un horizon au milieu de la feuille et deux points de fuite aux bords.',
          'Dessine 3 boîtes sous l’horizon (on voit le dessus), 3 boîtes au-dessus (on voit le dessous) et 2 boîtes traversées par l’horizon (on ne voit ni dessus ni dessous).',
          'Dessine-les en transparence avec les arêtes cachées.',
          'Recommence une seconde page à main levée, sans règle.'
        ],
        selfCheck: [
          'Les boîtes situées sous l’horizon montrent leur dessus, celles au-dessus leur dessous.',
          'Les arêtes cachées convergent elles aussi vers les bons points de fuite.'
        ]
      }
    },
    // ─────────────────────────────────────────────── A4
    {
      id: 'a4-lumiere',
      module: 'fondamentaux',
      title: 'Lumière et ombre sur une sphère',
      difficulty: 'Débutant',
      minutes: 40,
      skill: 'Identifier et dessiner les 7 zones de lumière sur un volume',
      objective:
        "Connaître les zones de lumière et d’ombre sur un volume et les dessiner dans le bon ordre sur une sphère.",
      why:
        "C’est LA leçon du réalisme. Un visage, un muscle, un pli de tissu suivent exactement les mêmes règles que la sphère. Si tu sais ombrer une sphère, tu sais ombrer une joue, une épaule ou un genou.",
      theory: [
        "Sur tout objet éclairé par une source principale, on retrouve toujours les mêmes zones, de la plus claire à la plus sombre :",
        "**1. Le point lumineux (reflet spéculaire)** : la petite tache la plus claire, là où la lumière rebondit directement vers ton œil. **2. La lumière** : la zone directement face à la source. **3. La demi-teinte** : la zone où la surface commence à tourner et reçoit moins de lumière.",
        "**4. La ligne de terminaison** : la frontière entre lumière et ombre. Elle suit la forme de l’objet (sur une sphère, c’est une courbe). **5. L’ombre propre** : la partie de l’objet qui ne reçoit pas la lumière directe. Sa zone la plus sombre (l’**ombre de cœur**) se trouve juste après la ligne de terminaison.",
        "**6. La lumière réfléchie** : une lumière faible renvoyée par le sol ou l’environnement, qui éclaircit légèrement le bord de l’ombre. Attention : elle reste toujours **plus sombre que la demi-teinte**. **7. L’ombre portée** : l’ombre que l’objet projette sur le sol. Elle est la plus sombre au point de contact (**occlusion**) et s’éclaircit et se floute en s’éloignant.",
        "Règle fondamentale : **toutes les valeurs de l’ombre sont plus sombres que toutes les valeurs de la lumière**. Si ta lumière réfléchie devient aussi claire que ta demi-teinte, ton volume s’aplatit."
      ],
      drawing: {
        viewBox: '0 0 340 240',
        layers: [
          <g key="0">
            <circle className="ln" cx="140" cy="115" r="70" />
            <line className="lt" x1="20" y1="185" x2="300" y2="185" opacity=".5" />
          </g>,
          <g key="1">
            <line x1="25" y1="20" x2="78" y2="62" stroke="#b4532a" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <T x={20} y={14} s={8}>lumière</T>
            <path className="cn" d="M189.5 65.5 Q170 145 90.5 164.5" />
          </g>,
          <g key="2">
            <path d="M189.5 65.5 Q170 145 90.5 164.5 A70 70 0 0 0 189.5 65.5 Z" fill="#746b60" opacity=".55" />
            <path d="M189.5 65.5 Q170 145 90.5 164.5 A70 70 0 0 0 189.5 65.5 Z" fill="url(#hatchDense)" />
            <path d="M189.5 65.5 Q170 145 90.5 164.5 Q200 172 189.5 65.5 Z" fill="#25211d" opacity=".45" />
          </g>,
          <g key="3">
            <circle cx="140" cy="115" r="70" fill="url(#sphereMat)" opacity=".25" />
            <path d="M189.5 65.5 Q128 112 90.5 164.5 Q170 145 189.5 65.5 Z" fill="#998f82" opacity=".45" />
            <path d="M189.5 65.5 Q128 112 90.5 164.5 Q170 145 189.5 65.5 Z" fill="url(#hatchLight)" />
          </g>,
          <g key="4">
            <path d="M206 92 A70 70 0 0 1 117 181 Q192 178 206 92 Z" fill="#bdb3a4" opacity=".7" />
          </g>,
          <g key="5">
            <ellipse cx="190" cy="199" rx="85" ry="13" fill="url(#castShadow)" />
            <ellipse cx="146" cy="187" rx="32" ry="4" fill="#25211d" />
            <circle className="ln" cx="140" cy="115" r="70" />
          </g>,
          <g key="6">
            <ellipse cx="110" cy="82" rx="11" ry="8" fill="#fffdf8" />
          </g>
        ],
        annotations: (
          <g>
            <Note x={110} y={82} tx={222} ty={22}>point lumineux</Note>
            <Note x={112} y={115} tx={232} ty={40}>lumière</Note>
            <Note x={142} y={124} tx={240} ty={60}>demi-teinte</Note>
            <Note x={160} y={128} tx={246} ty={84}>terminaison</Note>
            <Note x={180} y={142} tx={250} ty={108}>ombre propre</Note>
            <Note x={198} y={135} tx={252} ty={132}>lumière réfléchie</Note>
            <Note x={240} y={200} tx={250} ty={225} a="middle">ombre portée</Note>
            <Note x={146} y={188} tx={70} ty={225} a="middle">occlusion</Note>
          </g>
        )
      },
      steps: [
        { title: 'La forme et le sol', text: "Trace un cercle propre et une ligne de sol légère sur laquelle la sphère est posée." },
        { title: 'Lumière et ligne de terminaison', text: "Décide d’où vient la lumière (flèche). La ligne de terminaison est perpendiculaire à cette direction : c’est une courbe qui coupe la sphère en deux, légèrement décalée vers le côté opposé à la lumière." },
        { title: 'L’ombre propre', text: "Remplis toute la zone à l’opposé de la lumière d’une valeur sombre homogène. Renforce juste après la ligne de terminaison : c’est l’ombre de cœur, la partie la plus sombre de la sphère." },
        { title: 'La demi-teinte', text: "Dans la partie éclairée, ajoute une valeur intermédiaire en bande le long de la ligne de terminaison. Le passage lumière → demi-teinte est progressif ; le passage demi-teinte → ombre est plus net." },
        { title: 'La lumière réfléchie', text: "Éclaircis légèrement le bord de l’ombre, du côté du sol. Gomme doucement ou estompe. Reste discret : cette zone doit rester bien plus sombre que la demi-teinte." },
        { title: 'L’ombre portée et l’occlusion', text: "Ombre portée au sol, opposée à la lumière : sombre et nette près de la sphère, floue et claire en s’éloignant. Sous le point de contact, ajoute un trait très sombre : l’occlusion, là où aucune lumière ne passe." },
        { title: 'Le point lumineux', text: "Réserve ou gomme une petite tache au centre de la zone de lumière, orientée vers la source. Sur une surface mate, il est doux ; sur une surface brillante, il est net et très blanc." }
      ],
      tips: {
        errors: [
          'Une lumière réfléchie trop claire : la sphère ressemble à une lune plate.',
          'Assombrir uniquement le bord : on obtient un anneau, pas une boule.',
          'Oublier l’occlusion : l’objet semble flotter au-dessus du sol.',
          'Contourner la sphère avec un trait noir épais : dans la réalité, il n’y a pas de contour.'
        ],
        tricks: [
          'Plisse les yeux en regardant ton modèle : les détails disparaissent, les grandes masses de valeurs apparaissent.',
          'Pose d’abord l’ombre propre en une seule valeur, ensuite seulement les nuances.',
          'Utilise une gomme mie de pain pour la lumière réfléchie et le point lumineux.'
        ],
        observe: [
          'Pose une orange ou une balle blanche sous une lampe : retrouve les 7 zones.',
          'Compare la valeur de la lumière réfléchie avec celle de la demi-teinte.'
        ]
      },
      exercise: {
        title: 'La sphère d’après nature',
        duration: '40 minutes',
        material: ['Papier à dessin (ou imprimante)', 'Crayons HB, 2B, 4B', 'Gomme mie de pain', 'Une balle ou une orange, une lampe'],
        instructions: [
          'Place l’objet sur une feuille blanche, éclairé par une seule lampe sur le côté (pièce peu éclairée).',
          'Dessine le cercle et la ligne de terminaison en 2 minutes.',
          'Pose l’ombre propre et l’ombre portée en une seule valeur (2B).',
          'Développe la demi-teinte, puis l’ombre de cœur (4B).',
          'Termine par la lumière réfléchie (gomme) et le point lumineux.',
          'Refais l’exercice avec la lampe placée à un autre endroit.'
        ],
        selfCheck: [
          'Si je plisse les yeux, je vois nettement deux familles : lumière et ombre.',
          'Ma lumière réfléchie reste plus sombre que ma demi-teinte.',
          'L’occlusion est la zone la plus sombre du dessin.'
        ]
      }
    },
    // ─────────────────────────────────────────────── A5
    {
      id: 'a5-valeurs',
      module: 'fondamentaux',
      title: 'Valeurs, dégradés et hachures',
      difficulty: 'Débutant',
      minutes: 35,
      skill: 'Produire une échelle de valeurs et des dégradés réguliers',
      objective:
        "Maîtriser une échelle de 7 valeurs, réaliser un dégradé continu et connaître les différentes techniques de hachures.",
      why:
        "En dessin réaliste, ce n’est pas le contour qui fait la ressemblance, c’est la justesse des valeurs (du clair au foncé). Un portrait aux proportions parfaites mais aux valeurs fausses ne ressemblera pas ; un portrait aux valeurs justes paraît vivant même avec un trait approximatif.",
      theory: [
        "Une **valeur** est le degré de clarté d’une zone, indépendamment de sa couleur. Une échelle de **7 valeurs** suffit pour presque tout : du blanc du papier (1) au noir le plus profond (7).",
        "Chaque crayon a une plage de valeurs : **H** (durs, gris clairs, peu de brillance), **HB/B/2B** (valeurs moyennes), **4B à 8B** (gras, valeurs sombres). On ne force pas un HB pour obtenir un noir : on change de crayon. Appuyer trop fort écrase le grain du papier et crée un aspect brillant.",
        "Le **dégradé continu** s’obtient en superposant des couches légères, en petits cercles ou en traits serrés, puis éventuellement en estompant. Il faut plusieurs couches : la pression augmente très progressivement.",
        "Les **hachures** construisent la valeur par le trait : **simples** (une direction), **croisées** (deux directions, plus sombre), **multiples** (trois directions ou plus) et **hachures de contour**, qui suivent la courbure de la forme et l’expriment en même temps qu’elles l’ombrent.",
        "Le **contraste** est l’écart entre deux valeurs voisines. L’œil est attiré par les plus forts contrastes : place-les à l’endroit que tu veux montrer (le regard dans un portrait)."
      ],
      drawing: {
        viewBox: '0 0 320 250',
        layers: [
          <g key="0">
            {grays.map((_, i) => (
              <rect key={i} className="lt" x={20 + i * 40} y={20} width={40} height={40} />
            ))}
            <T x={20} y={14} s={8}>échelle de 7 valeurs</T>
          </g>,
          <g key="1">
            {grays.map((g, i) => (
              <g key={i}>
                <rect x={20 + i * 40} y={20} width={40} height={40} fill={g} stroke="#2e2a25" strokeWidth="1" />
                <T x={40 + i * 40} y={74} a="middle" s={9}>{String(i + 1)}</T>
              </g>
            ))}
          </g>,
          <g key="2">
            <rect x="20" y="90" width="280" height="28" fill="url(#gradH)" stroke="#2e2a25" strokeWidth="1" />
            <T x={20} y={132} s={8}>dégradé continu (couches successives)</T>
          </g>,
          <g key="3">
            <rect className="lt" x="20" y="150" width="60" height="60" />
            {Array.from({ length: 11 }, (_, i) => (
              <line key={i} className="lt" x1={24 + i * 5} y1="154" x2={24 + i * 5} y2="206" />
            ))}
            <T x={50} y={225} a="middle" s={8}>simples</T>
          </g>,
          <g key="4">
            <rect className="lt" x="95" y="150" width="60" height="60" />
            {Array.from({ length: 11 }, (_, i) => (
              <g key={i}>
                <line className="lt" x1={99 + i * 5} y1="154" x2={99 + i * 5} y2="206" />
                <line className="lt" x1="99" y1={154 + i * 5} x2="151" y2={154 + i * 5} />
              </g>
            ))}
            <T x={125} y={225} a="middle" s={8}>croisées</T>
          </g>,
          <g key="5">
            <rect x="170" y="150" width="60" height="60" fill="url(#cross)" stroke="#2e2a25" />
            <rect x="170" y="150" width="60" height="60" fill="url(#hatchV)" />
            <rect x="170" y="150" width="60" height="60" fill="url(#hatchDense)" />
            <T x={200} y={225} a="middle" s={8}>multiples</T>
          </g>,
          <g key="6">
            <circle className="ln" cx="275" cy="180" r="30" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path key={i} className="lt" d={`M${262 + i * 6} ${152 + i * 0.5} Q${282 + i * 4} 180 ${262 + i * 6} ${208 - i * 0.5}`} />
            ))}
            <T x={275} y={225} a="middle" s={8}>de contour</T>
          </g>
        ]
      },
      steps: [
        { title: 'Préparer l’échelle', text: "Trace 7 cases côte à côte. La case 1 restera le blanc du papier, la 7 sera ton noir le plus intense." },
        { title: 'Remplir les 7 valeurs', text: "Commence par les extrêmes : la case 7 (6B–8B, plusieurs couches), puis la case 4 (valeur médiane, exactement entre les deux). Complète ensuite 2-3 et 5-6. Chaque saut doit paraître identique." },
        { title: 'Le dégradé continu', text: "Dans un long rectangle, passe du noir au blanc sans palier visible. Travaille en couches légères superposées, de la droite vers la gauche, en relâchant la pression progressivement." },
        { title: 'Hachures simples', text: "Traits parallèles serrés, dans une seule direction. La valeur dépend de l’espacement et de la pression : plus les traits sont serrés, plus la zone paraît sombre." },
        { title: 'Hachures croisées', text: "Ajoute une seconde couche perpendiculaire (ou à 45°) par-dessus la première. La valeur fonce nettement tout en restant lisible et vibrante." },
        { title: 'Hachures multiples', text: "Superpose 3 ou 4 directions pour les valeurs les plus sombres. Garde les traits fins et réguliers pour éviter l’effet « grillage »." },
        { title: 'Hachures de contour', text: "Fais suivre aux hachures la courbure de la forme, comme les lignes de latitude d’un globe. Elles décrivent la forme en même temps qu’elles l’ombrent : c’est la technique la plus utile pour les visages et les muscles." }
      ],
      tips: {
        errors: [
          'Des sauts irréguliers dans l’échelle (cases 2 et 3 presque identiques, gros saut entre 5 et 6).',
          'Écraser la mine : le papier devient brillant et n’accepte plus de couches.',
          'Estomper au doigt : le gras de la peau tache le papier. Utilise une estompe ou un mouchoir.'
        ],
        tricks: [
          'Garde ton échelle de valeurs à côté de toi : compare chaque zone de ton dessin avec elle.',
          'L’outil « Guide des valeurs de gris » de l’app te sert de référence.',
          'Pour comparer, prends ton dessin en photo et passe-la en noir et blanc.'
        ],
        observe: [
          'Les 7 cases forment-elles une progression régulière quand tu plisses les yeux ?',
          'Le dégradé a-t-il des « marches » visibles ?'
        ]
      },
      exercise: {
        title: 'Échelle, dégradé et nuancier de hachures',
        duration: '35 minutes',
        material: ['Papier à dessin', 'Crayons 2H, HB, 2B, 4B, 6B', 'Estompe ou mouchoir', 'Gomme'],
        instructions: [
          'Réalise une échelle de 7 valeurs avec tous tes crayons.',
          'Réalise la même échelle avec un seul crayon (2B) en variant la pression et les couches.',
          'Fais un dégradé continu de 15 cm.',
          'Réalise une seconde échelle de 7 valeurs uniquement en hachures (simples → croisées → multiples).',
          'Dessine 3 sphères ombrées uniquement avec des hachures de contour.'
        ],
        selfCheck: [
          'La case 4 est visuellement à mi-chemin entre le blanc et le noir.',
          'Mon échelle en hachures atteint un vrai noir dans la case 7.',
          'Sur mes sphères, les hachures suivent la courbure.'
        ]
      }
    },
    // ─────────────────────────────────────────────── A6
    {
      id: 'a6-mesures',
      module: 'fondamentaux',
      title: 'Proportions et mesures',
      difficulty: 'Débutant',
      minutes: 40,
      skill: 'Mesurer un modèle (unité, angles, espaces négatifs) et le reporter',
      objective:
        "Apprendre à mesurer ce que tu vois avec ton crayon, à reporter les proportions et à vérifier ton dessin grâce aux angles et aux espaces négatifs.",
      why:
        "Notre cerveau ment : il dessine ce qu’il « croit savoir » (un œil en amande, un mug rond) et non ce qu’il voit. La mesure est ce qui sépare un dessin d’imagination d’un dessin d’observation fidèle. Tous les portraitistes réalistes mesurent.",
      theory: [
        "**La méthode du crayon** : tends le bras complètement (coude verrouillé, toujours à la même distance), ferme un œil, aligne le bout du crayon sur un bord du modèle et place ton pouce sur l’autre bord. Tu as une **unité de mesure**.",
        "Choisis comme unité une partie **petite et facile à repérer** (la largeur de l’embouchure d’un mug, la hauteur d’une tête). Compare ensuite tout le reste à cette unité : « la hauteur fait 1,6 fois la largeur ».",
        "**Les angles** : tiens le crayon à la verticale puis incline-le pour l’aligner sur un bord du modèle ; reporte cet angle sur ta feuille. Les verticales et horizontales de référence (fil à plomb) permettent aussi de voir ce qui est aligné avec quoi.",
        "**Les espaces négatifs** sont les formes « vides » entre les objets ou à l’intérieur d’eux (le trou de l’anse d’un mug, l’espace entre un bras et le corps). Le cerveau n’a pas d’idée préconçue sur ces formes : il les dessine donc fidèlement. Elles sont un excellent outil de vérification.",
        "Construis toujours **du général au particulier** : boîte englobante → grandes proportions → points clés → contour → détails. Ne commence jamais par un détail."
      ],
      drawing: {
        viewBox: '0 0 300 260',
        layers: [
          <g key="0">
            <rect className="cn" x="88" y="36" width="149" height="190" />
            <Pencil x={40} y={50} angle={90} len={150} />
            <line x1="32" y1="150" x2="48" y2="150" stroke="#b4532a" strokeWidth="2" />
            <T x={10} y={248} s={8}>bras tendu, un œil fermé</T>
          </g>,
          <g key="1">
            <path className="gd" d="M90 26 L190 26 M90 22 L90 30 M190 22 L190 30" />
            <T x={140} y={20} a="middle" s={9}>1</T>
            <path className="gd" d="M70 50 L70 210 M66 50 L74 50 M66 150 L74 150 M66 210 L74 210" />
            <T x={62} y={104} a="end" s={9}>1</T>
            <T x={62} y={184} a="end" s={9}>0,6</T>
          </g>,
          <g key="2">
            <Dot x={90} y={50} /> <Dot x={190} y={50} />
            <Dot x={92} y={210} /> <Dot x={188} y={210} />
            <Dot x={190} y={82} /> <Dot x={190} y={168} /> <Dot x={235} y={122} />
          </g>,
          <g key="3">
            <ellipse className="ln" cx="140" cy="50" rx="50" ry="11" />
            <path className="ln" d="M92 210 A48 15 0 0 0 188 210" />
            <path className="cn" d="M92 210 A48 15 0 0 1 188 210" />
          </g>,
          <g key="4">
            <path className="ln" d="M90 50 L92 210 M190 50 L188 210" />
            <path className="ln" d="M190 82 C245 76 250 170 190 168 M190 98 C228 96 230 152 190 152" />
          </g>,
          <g key="5">
            <path d="M190 98 C228 96 230 152 190 152 Z" fill="url(#hatchDense)" />
            <T x={240} y={100} s={8}>espace</T>
            <T x={240} y={110} s={8}>négatif</T>
          </g>,
          <g key="6">
            <path d="M150 61 L150 61 C170 60 185 56 190 50 L188 210 C180 220 160 225 150 225 Z" fill="url(#hatch)" opacity=".8" />
            <path d="M92 50 A48 9 0 0 1 188 50 A48 7 0 0 0 92 50 Z" fill="#4b453e" opacity=".7" />
            <ellipse cx="170" cy="232" rx="70" ry="8" fill="url(#castShadow)" />
          </g>
        ]
      },
      steps: [
        { title: 'Boîte englobante', text: "Mesure au crayon, bras tendu, la largeur totale (anse comprise) et la hauteur totale du mug. Trace très légèrement le rectangle qui l’enveloppe : tout le dessin devra tenir dedans." },
        { title: 'Choisir l’unité', text: "Prends la largeur de l’embouchure comme unité (1). Reporte-la verticalement : le mug mesure 1 unité + 0,6 unité de haut. Ces rapports, et non les centimètres, garantissent la ressemblance." },
        { title: 'Les points clés', text: "Place les points importants : extrémités de l’embouchure et du fond, attaches de l’anse, point le plus éloigné de l’anse. Vérifie leurs alignements avec des verticales et horizontales imaginaires." },
        { title: 'Les ellipses', text: "Trace l’ellipse de l’embouchure et celle du fond. Le fond est plus loin sous tes yeux : son ellipse est plus ouverte (plus ronde). C’est l’erreur la plus fréquente : dessiner un fond plat." },
        { title: 'Le contour', text: "Relie les points : flancs du mug, puis l’anse (contour extérieur et intérieur). Vérifie l’angle des flancs avec ton crayon incliné." },
        { title: 'Vérifier par l’espace négatif', text: "Regarde la forme du trou de l’anse comme une forme à part entière. Compare-la avec le modèle : si elle est fausse, l’anse est fausse. Corrige maintenant, avant l’ombrage." },
        { title: 'Valeurs simples', text: "Pose l’ombre propre du mug, l’intérieur de l’embouchure (sombre) et l’ombre portée. Tu passes de la mesure au volume." }
      ],
      tips: {
        errors: [
          'Plier le coude pendant la mesure : l’unité change, tout devient faux.',
          'Commencer par l’anse ou un détail avant d’avoir la boîte englobante.',
          'Dessiner le fond du mug comme une ligne droite.'
        ],
        tricks: [
          'Recule régulièrement de 2 mètres pour regarder ton dessin : les erreurs sautent aux yeux.',
          'Regarde ton dessin dans un miroir (ou retourne la photo) : le cerveau le voit « neuf ».',
          'L’outil « Visualiseur de références » de l’app superpose une grille à tes photos de modèle.'
        ],
        observe: [
          'Le rapport largeur/hauteur de ton dessin correspond-il au modèle ?',
          'L’espace négatif de l’anse a-t-il la bonne forme ?'
        ]
      },
      exercise: {
        title: 'Trois objets mesurés',
        duration: '45 minutes',
        material: ['Papier', 'Crayons HB et 2B', 'Un mug, une bouteille, une paire de ciseaux'],
        instructions: [
          'Pose les trois objets devant toi, à environ 1 m.',
          'Pour chacun : trouve une unité, mesure les rapports, trace la boîte englobante puis les points clés.',
          'Dessine le contour en vérifiant les angles au crayon.',
          'Pour les ciseaux, dessine d’abord les espaces négatifs des anneaux.',
          'Compare en photographiant ton dessin et le modèle côte à côte.'
        ],
        selfCheck: [
          'Mes rapports de proportions sont justes à 10 % près.',
          'Les ellipses du bas de mes objets sont plus ouvertes que celles du haut.',
          'Les espaces négatifs correspondent au modèle.'
        ]
      }
    }
  ]
};
