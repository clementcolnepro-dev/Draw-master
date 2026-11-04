import type { Module } from './types';
import { T, Dot } from './shapes';

const pear = (cx: number, cy: number) =>
  `M${cx} ${cy - 45} C${cx + 8} ${cy - 45} ${cx + 10} ${cy - 30} ${cx + 12} ${cy - 18} C${cx + 30} ${cy - 8} ${cx + 38} ${cy + 15} ${cx + 32} ${cy + 30} C${cx + 25} ${cy + 45} ${cx - 25} ${cy + 45} ${cx - 32} ${cy + 30} C${cx - 38} ${cy + 15} ${cx - 30} ${cy - 8} ${cx - 12} ${cy - 18} C${cx - 10} ${cy - 30} ${cx - 8} ${cy - 45} ${cx} ${cy - 45} Z`;
const pearShadow = (cx: number, cy: number) =>
  `M${cx + 6} ${cy - 44} C${cx + 10} ${cy - 30} ${cx + 12} ${cy - 18} ${cx + 12} ${cy - 18} C${cx + 30} ${cy - 8} ${cx + 38} ${cy + 15} ${cx + 32} ${cy + 30} C${cx + 25} ${cy + 45} ${cx - 25} ${cy + 45} ${cx - 32} ${cy + 30} C${cx - 10} ${cy + 36} ${cx + 18} ${cy + 20} ${cx + 14} ${cy} C${cx + 10} ${cy - 15} ${cx + 2} ${cy - 25} ${cx + 6} ${cy - 44} Z`;

function Grid({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <line className="cn" x1={x + i * 22.5} y1={y} x2={x + i * 22.5} y2={y + 110} />
          <line className="cn" x1={x} y1={y + i * 27.5} x2={x + 90} y2={y + i * 27.5} />
        </g>
      ))}
    </g>
  );
}

function Pear({ cx, cy, final }: { cx: number; cy: number; final?: boolean }) {
  return (
    <g>
      <ellipse cx={cx + 14} cy={cy + 42} rx="40" ry="6" fill="url(#castShadow)" />
      <path d={pear(cx, cy)} fill="#e9e2d5" />
      <path d={pearShadow(cx, cy)} fill="#746b60" opacity={final ? 0.75 : 0.6} />
      <ellipse cx={cx - 14} cy={cy + 5} rx="8" ry="12" fill="#fbf7ef" opacity=".9" />
      <path d={pear(cx, cy)} fill="none" stroke="#2e2a25" strokeWidth={final ? 0.8 : 1.2} />
      <path d={`M${cx} ${cy - 45} L${cx + 4} ${cy - 56}`} className="ln" />
    </g>
  );
}

export const realisme: Module = {
  id: 'realisme',
  letter: 'E',
  discipline: 'techniques',
  title: 'Maîtriser le réalisme',
  subtitle: 'Ombres, matières, reproduction',
  description:
    "Les techniques qui font passer un dessin juste à un dessin réaliste : construire les ombres portées, rendre les matières (mat, brillant, métal, verre) et reproduire fidèlement une photographie.",
  planned: [
    'Étude de la lumière (sources multiples)',
    'Dégradés subtils',
    'Textures de peau',
    'Texture des cheveux',
    'Textures des tissus',
    'Gestion des contrastes',
    'Hyperréalisme'
  ],
  lessons: [
    // ─────────────────────────────────────────────── E1
    {
      id: 'e1-ombres',
      module: 'realisme',
      title: 'Ombres propres et ombres portées',
      difficulty: 'Avancé',
      minutes: 45,
      skill: 'Construire géométriquement une ombre portée',
      objective:
        "Construire précisément l’ombre portée d’un objet à partir de la position de la source lumineuse, et distinguer ombre propre et ombre portée.",
      why:
        "Des ombres portées approximatives trahissent immédiatement un dessin. Savoir les construire permet de les placer juste — l’ombre du nez sur la joue, du menton sur le cou, d’un personnage sur le sol — et de créer une lumière cohérente dans toute l’image.",
      theory: [
        "**L’ombre propre** est la partie d’un objet qui ne reçoit pas la lumière parce qu’elle est tournée dans l’autre sens. **L’ombre portée** est l’ombre que l’objet projette sur une autre surface. Elles se rejoignent toujours au niveau de la **ligne de terminaison** et du point de contact.",
        "Pour construire une ombre portée avec une lumière proche (lampe), on utilise deux points : **la source lumineuse** et **son pied**, c’est-à-dire le point du sol situé juste en dessous de la lampe.",
        "Méthode : pour chaque coin haut de l’objet, trace un **rayon** depuis la lumière qui passe par ce coin. Depuis le **pied de la lumière**, trace une ligne au sol qui passe par la base de ce coin. **L’intersection** des deux lignes donne la position de l’ombre de ce coin.",
        "Avec le **soleil**, très lointain, les rayons sont **parallèles** : toutes les ombres ont la même direction. Avec une **lampe**, les rayons divergent : les ombres s’écartent en éventail.",
        "Une ombre portée n’est **pas uniforme** : elle est la plus sombre et la plus nette au **contact** de l’objet (occlusion), et devient plus claire et plus floue (**pénombre**) en s’éloignant."
      ],
      drawing: {
        viewBox: '0 0 300 240',
        layers: [
          <g key="0">
            <line className="lt" x1="0" y1="200" x2="300" y2="200" opacity=".3" />
            <path className="ln" d="M100 120 H160 V180 H100 Z M100 120 L130 95 H190 L160 120 M190 95 V155 L160 180" />
            <path className="cn" d="M130 95 V155 H190 M130 155 L100 180" />
          </g>,
          <g key="1">
            <circle cx="60" cy="30" r="7" fill="#f5c15a" stroke="#b4532a" />
            <line className="cn" x1="60" y1="37" x2="60" y2="215" />
            <Dot x={60} y={215} r={4} />
            <T x={70} y={30} s={8}>lumière</T>
            <T x={66} y={230} s={8}>pied de la lumière</T>
          </g>,
          <g key="2">
            <path className="cn" d="M60 30 L208 163.2 M60 30 L252.4 126.2 M60 30 L163.6 126.2" />
          </g>,
          <g key="3">
            <path className="gd" d="M60 215 L208 163.2 M60 215 L252.4 126.2 M60 215 L163.6 126.2" />
          </g>,
          <g key="4">
            <Dot x={208} y={163.2} /> <Dot x={252.4} y={126.2} /> <Dot x={163.6} y={126.2} />
            <path className="ln" d="M160 180 L208 163.2 L252.4 126.2 L190 126.2" />
          </g>,
          <g key="5">
            <path d="M160 180 L208 163.2 L252.4 126.2 L190 126.2 L190 155 Z" fill="#4b453e" opacity=".55" />
            <path d="M160 180 L190 155 L200 160 L172 182 Z" fill="#25211d" opacity=".5" />
            <path d="M160 120 L190 95 V155 L160 180 Z" fill="url(#hatch)" />
            <path className="ln" d="M100 120 H160 V180 H100 Z M100 120 L130 95 H190 L160 120 M190 95 V155 L160 180" />
          </g>
        ],
        annotations: (
          <g>
            <T x={196} y={88} s={8}>ombre propre</T>
            <T x={210} y={190} s={8}>ombre portée</T>
          </g>
        )
      },
      steps: [
        { title: 'L’objet', text: "Dessine un cube posé au sol, en transparence (arêtes cachées en pointillés). On a besoin de connaître la position de tous ses coins, y compris cachés." },
        { title: 'La lumière et son pied', text: "Place la source lumineuse, puis son pied : le point du sol situé exactement à la verticale de la lampe. Ici, la lampe est devant et à gauche du cube." },
        { title: 'Les rayons lumineux', text: "Depuis la lumière, trace un rayon qui passe par chaque coin supérieur du cube et continue au-delà." },
        { title: 'Les lignes au sol', text: "Depuis le pied de la lumière, trace une ligne qui passe par la base de chacun de ces coins (le point au sol sous le coin)." },
        { title: 'Les intersections', text: "Chaque rayon croise sa ligne au sol : c’est la position de l’ombre du coin. Relie ces points aux bases du cube pour obtenir la forme de l’ombre portée." },
        { title: 'Les valeurs', text: "Remplis l’ombre portée, plus sombre près du cube. La face droite, tournée à l’opposé de la lumière, est l’ombre propre : elle est généralement un peu plus claire que l’ombre portée, car elle reçoit la lumière réfléchie du sol." }
      ],
      tips: {
        errors: [
          'Des ombres portées qui partent dans des directions différentes sous un même soleil.',
          'Une ombre portée de valeur uniforme et à bords nets partout.',
          'Une ombre qui ne touche pas l’objet : il semble flotter.'
        ],
        tricks: [
          'Fais l’exercice avec une vraie boîte et une lampe de bureau pour vérifier ta construction.',
          'Pour un visage, pense à l’ombre portée du nez : elle indique d’où vient la lumière.',
          'Plisse les yeux : l’ombre portée et l’ombre propre se confondent-elles ? Ajuste les valeurs.'
        ],
        observe: [
          'Compare les ombres au soleil (parallèles) et sous un lampadaire (en éventail).',
          'Observe le flou des ombres : plus nettes près de l’objet, floues plus loin.'
        ]
      },
      exercise: {
        title: 'Boîtes et lampe',
        duration: '45 minutes',
        material: ['Papier', 'Crayons HB, 2B, 4B', 'Règle', 'Une boîte, une lampe de bureau'],
        instructions: [
          'Reproduis la construction de la leçon avec la règle.',
          'Refais-la avec la lumière placée à droite et plus basse : l’ombre s’allonge.',
          'Pose une vraie boîte sous une lampe, dessine-la d’après nature et vérifie ton ombre par construction.',
          'Dessine un cylindre et sa construction d’ombre (utilise les points de son ellipse supérieure).'
        ],
        selfCheck: [
          'Mes ombres construites correspondent à ce que j’observe avec la lampe.',
          'L’ombre portée est plus sombre près de l’objet.',
          'L’ombre propre et l’ombre portée se rejoignent à la base.'
        ]
      }
    },
    // ─────────────────────────────────────────────── E2
    {
      id: 'e2-matieres',
      module: 'realisme',
      title: 'Reflets et matériaux',
      difficulty: 'Avancé',
      minutes: 60,
      skill: 'Rendre une surface mate, brillante, métallique ou transparente',
      objective:
        "Rendre la différence entre quatre matières (mate, brillante, métallique, transparente) sur une même forme, uniquement par les valeurs et les reflets.",
      why:
        "Une même forme peut être une balle de tennis, une boule de billard, une boule de Noël ou une bille de verre. Ce qui change, c’est la façon dont la surface renvoie la lumière. Maîtriser ces différences te permet de rendre une peau mate ou grasse, des yeux humides, un bijou, une boucle de ceinture, une paire de lunettes.",
      theory: [
        "Une **surface mate** (papier, peau sèche, tissu) diffuse la lumière dans toutes les directions : **dégradés très doux**, pas de reflet net, transitions progressives.",
        "Une **surface brillante** (plastique, peau grasse, cuir ciré) garde le dégradé de la forme, mais ajoute un **reflet spéculaire net et très clair** (petite tache blanche aux bords précis) et des contrastes plus forts.",
        "Une **surface métallique** (chrome, argent) n’a presque pas de valeur propre : **elle reflète son environnement**. On y voit des **bandes de contraste extrême**, du blanc pur au noir, avec souvent une ligne d’horizon : le ciel clair en haut, le sol en bas, déformés par la forme.",
        "Une **surface transparente** (verre, eau) laisse voir ce qu’il y a derrière, **déformé et souvent inversé**. Ses bords sont marqués (plus sombres ou très clairs), elle porte des reflets nets, et son ombre portée contient une **tache lumineuse** (la caustique), car le verre concentre la lumière.",
        "Dans tous les cas, la **règle de cohérence** s’applique : tous les reflets d’une même image proviennent des mêmes sources lumineuses."
      ],
      drawing: {
        viewBox: '0 0 320 200',
        layers: [
          <g key="0">
            {[45, 125, 205, 285].map((x) => (
              <circle key={x} className="lt" cx={x} cy={95} r={34} />
            ))}
            <line className="lt" x1="0" y1="135" x2="320" y2="135" opacity=".3" />
            <T x={45} y={170} a="middle" s={9}>mat</T>
            <T x={125} y={170} a="middle" s={9}>brillant</T>
            <T x={205} y={170} a="middle" s={9}>métal</T>
            <T x={285} y={170} a="middle" s={9}>verre</T>
          </g>,
          <g key="1">
            <circle cx="45" cy="95" r="34" fill="url(#sphereMat)" />
          </g>,
          <g key="2">
            <circle cx="125" cy="95" r="34" fill="url(#sphereGloss)" />
            <path d="M152 115 A34 34 0 0 1 112 127" stroke="#998f82" strokeWidth="4" fill="none" opacity=".8" />
            <ellipse cx="113" cy="80" rx="7" ry="5" fill="#fffdf8" transform="rotate(-30 113 80)" />
          </g>,
          <g key="3">
            <defs>
              <clipPath id="metalClip">
                <circle cx="205" cy="95" r="34" />
              </clipPath>
            </defs>
            <g clipPath="url(#metalClip)">
              <rect x="170" y="60" width="70" height="70" fill="#d9d1c3" />
              <path d="M170 60 H240 V88 Q205 80 170 88 Z" fill="#fbf7ef" />
              <path d="M170 88 Q205 80 240 88 V100 Q205 92 170 100 Z" fill="#25211d" />
              <path d="M170 100 Q205 92 240 100 V130 H170 Z" fill="#746b60" />
              <path d="M170 112 Q205 104 240 112 V130 H170 Z" fill="#4b453e" />
              <circle cx="205" cy="95" r="34" fill="none" stroke="#25211d" strokeWidth="6" opacity=".5" />
            </g>
            <ellipse cx="193" cy="72" rx="6" ry="4" fill="#fff" />
          </g>,
          <g key="4">
            <line x1="245" y1="80" x2="320" y2="80" stroke="#6f87a6" strokeWidth="3" />
            <path d="M262 102 Q285 112 308 102" stroke="#6f87a6" strokeWidth="3" fill="none" />
            <circle cx="285" cy="95" r="34" fill="#f3ede2" opacity=".35" />
            <path d="M255 85 A34 34 0 0 1 270 66" stroke="#fffdf8" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="285" cy="95" r="33" fill="none" stroke="#4b453e" strokeWidth="2.5" opacity=".7" />
            <ellipse cx="272" cy="76" rx="5" ry="3.5" fill="#fff" />
            <T x={300} y={74} s={7}>fond</T>
          </g>,
          <g key="5">
            <ellipse cx="62" cy="133" rx="34" ry="5" fill="url(#castShadow)" />
            <ellipse cx="142" cy="133" rx="34" ry="5" fill="url(#castShadow)" />
            <ellipse cx="222" cy="133" rx="34" ry="5" fill="url(#castShadow)" />
            <ellipse cx="302" cy="133" rx="30" ry="5" fill="url(#castShadow)" opacity=".6" />
            <ellipse cx="304" cy="133" rx="9" ry="2.5" fill="#fffdf8" />
          </g>
        ]
      },
      steps: [
        { title: 'Quatre sphères identiques', text: "Dessine quatre cercles identiques posés sur une même ligne de sol. Même forme, même lumière : seule la matière va changer." },
        { title: 'Mat', text: "Dégradé doux et continu, de la lumière vers l’ombre, sans aucun reflet net. Les transitions sont larges, estompées. C’est la sphère de la leçon A4, sans point lumineux marqué." },
        { title: 'Brillant', text: "Valeur de base plus sombre, contraste plus fort. Ajoute un reflet spéculaire petit, net et blanc pur, et une lumière réfléchie nette sur le bord inférieur." },
        { title: 'Métal', text: "Divise la sphère en bandes horizontales courbes : ciel clair en haut, ligne d’horizon très sombre au milieu, sol en bas. Contrastes extrêmes, transitions nettes. Le bord est sombre." },
        { title: 'Verre', text: "Dessine d’abord le fond qui passe derrière (une ligne) : à travers la bille, il est déformé et inversé. Garde l’intérieur clair, marque le bord, ajoute un reflet fin le long du contour et un point lumineux net." },
        { title: 'Les ombres portées', text: "Ombres portées identiques pour les trois sphères opaques. Pour le verre : une ombre plus légère, avec une tache lumineuse au centre (la caustique), car le verre concentre la lumière." }
      ],
      tips: {
        errors: [
          'Ajouter un reflet blanc net sur une matière mate.',
          'Dessiner le métal comme une sphère grise ombrée : il manque les reflets de l’environnement.',
          'Assombrir le verre : il doit rester lumineux.',
          'Des reflets qui ne viennent pas de la même source sur les différents objets.'
        ],
        tricks: [
          'Utilise une gomme stylo ou un crayon blanc pour les reflets les plus nets.',
          'Pour le métal, travaille avec un 6B ou 8B pour obtenir des noirs profonds à côté du blanc du papier.',
          'Rassemble chez toi une balle, une bille, une cuillère et une balle de ping-pong et dessine-les ensemble.'
        ],
        observe: [
          'Regarde une cuillère à soupe : tu y vois la pièce entière, inversée.',
          'Observe l’ombre d’un verre d’eau au soleil : la tache lumineuse au centre.'
        ]
      },
      exercise: {
        title: 'Nature morte des matières',
        duration: '1 heure',
        material: ['Papier lisse', 'Crayons HB, 2B, 4B, 8B', 'Gomme stylo, estompe', 'Une balle mate, un objet en plastique brillant, une cuillère, un verre'],
        instructions: [
          'Dispose les quatre objets sous une même lampe.',
          'Dessine leurs contours en 10 minutes.',
          'Rends chaque matière en 10 minutes chacune, en suivant les principes de la leçon.',
          'Vérifie la cohérence : tous les reflets proviennent-ils de la même lampe ?'
        ],
        selfCheck: [
          'On reconnaît chaque matière sans légende.',
          'Le métal présente des contrastes extrêmes.',
          'Le verre reste lumineux et laisse deviner le fond.'
        ]
      }
    },
    // ─────────────────────────────────────────────── E3
    {
      id: 'e3-photo',
      module: 'realisme',
      title: 'Reproduction d’après photographie (mise au carreau)',
      difficulty: 'Avancé',
      minutes: 90,
      skill: 'Reproduire fidèlement une photo avec la méthode de la grille',
      objective:
        "Reproduire fidèlement une photographie grâce à la méthode de la mise au carreau, puis développer les valeurs jusqu’à un rendu réaliste.",
      why:
        "La mise au carreau est utilisée depuis la Renaissance pour transférer une image avec précision. Elle libère le cerveau du problème des proportions : on se concentre sur une petite case à la fois. C’est la méthode de base de tous les dessins hyperréalistes d’après photo.",
      theory: [
        "Le principe : on trace une **grille** sur la photo de référence et une **grille identique** (même nombre de cases) sur le papier. On reproduit ensuite **case par case** ce que contient chaque carré.",
        "Les cases peuvent être **plus grandes** sur le papier pour agrandir l’image, tant que leurs **proportions** sont les mêmes. Une grille de 4×4 à 6×6 suffit pour débuter ; on affine avec des grilles plus serrées pour les portraits.",
        "Repère où le contour de l’objet **coupe les lignes de la grille** : ce sont des points précis que tu peux reporter. Relie-les ensuite en observant les courbes dans chaque case.",
        "Une fois le contour en place, travaille les **valeurs par grandes masses** : d’abord séparer ombre et lumière, puis les demi-teintes, enfin les détails. Compare toujours une zone de ton dessin avec la même zone de la photo.",
        "La grille doit être **tracée très légèrement** (crayon dur, 2H) pour pouvoir l’effacer. Dans l’app, l’outil « Visualiseur de références » superpose une grille à n’importe quelle photo de ton téléphone."
      ],
      drawing: {
        viewBox: '0 0 320 230',
        layers: [
          <g key="0">
            <Pear cx={80} cy={110} />
            <Grid x={35} y={55} />
            <T x={80} y={185} a="middle" s={8}>référence + grille</T>
          </g>,
          <g key="1">
            <Grid x={185} y={55} />
            {['A', 'B', 'C', 'D'].map((l, i) => (
              <T key={l} x={196 + i * 22.5} y={50} a="middle" s={7}>{l}</T>
            ))}
            {[1, 2, 3, 4].map((n, i) => (
              <T key={n} x={178} y={72 + i * 27.5} a="middle" s={7}>{String(n)}</T>
            ))}
            <T x={230} y={185} a="middle" s={8}>papier : même grille</T>
          </g>,
          <g key="2">
            {[[197.2, 137.5], [200.8, 110], [207.5, 100.5], [207.5, 147.6], [219.6, 82.5], [240.4, 82.5], [252.5, 100.4], [252.5, 147.5], [259.1, 110], [262.9, 137.5], [230, 65]].map(([x, y], i) => (
              <Dot key={i} x={x} y={y} r={2.5} />
            ))}
          </g>,
          <g key="3">
            <path className="ln" d={pear(230, 110)} />
            <path className="ln" d="M230 65 L234 54" />
          </g>,
          <g key="4">
            <path d={pearShadow(230, 110)} fill="url(#hatch)" />
            <ellipse cx="244" cy="152" rx="40" ry="6" fill="url(#hatchLight)" />
          </g>,
          <g key="5">
            <path d={pearShadow(230, 110)} fill="#746b60" opacity=".45" />
            <ellipse cx="216" cy="115" rx="8" ry="12" fill="#fbf7ef" opacity=".9" />
          </g>,
          <g key="6">
            <rect x="170" y="40" width="115" height="150" fill="#f3ede2" />
            <Pear cx={230} cy={110} final />
            <T x={232} y={185} a="middle" s={8}>grille effacée</T>
          </g>
        ]
      },
      steps: [
        { title: 'La grille sur la référence', text: "Trace une grille régulière sur ta photo (ou utilise l’outil de l’app). Ici, 4×4 cases. La grille doit couvrir tout le sujet." },
        { title: 'La même grille sur le papier', text: "Trace très légèrement une grille identique sur ton papier (même nombre de cases, mêmes proportions). Numérote les lignes et les colonnes pour ne pas te perdre." },
        { title: 'Les points d’intersection', text: "Repère où le contour du sujet coupe chaque ligne de la grille de référence (« au tiers de la case B2 », « au milieu de la ligne entre C3 et C4 ») et reporte ces points sur ton papier." },
        { title: 'Le contour', text: "Relie les points en observant la forme du contour dans chaque case. Travaille case par case, sans penser à l’objet dans son ensemble." },
        { title: 'Les grandes masses', text: "Sépare l’ombre et la lumière : pose l’ombre propre et l’ombre portée en une valeur moyenne, d’après les limites que tu observes dans chaque case." },
        { title: 'Les valeurs', text: "Développe les demi-teintes, les zones les plus sombres, et réserve les lumières. Compare régulièrement case par case avec la référence." },
        { title: 'Effacer la grille', text: "Gomme délicatement la grille, puis repasse les valeurs abîmées et estompe les transitions. Le dessin final ne garde aucune trace de la méthode." }
      ],
      tips: {
        errors: [
          'Une grille aux cases irrégulières : tout le dessin se décale.',
          'Tracer la grille trop fort : impossible à effacer.',
          'Passer d’une case à l’autre sans vérifier les raccords.',
          'Rester dépendant de la grille : alterne avec des dessins à main levée.'
        ],
        tricks: [
          'Utilise une grille plus serrée sur les zones complexes (les yeux d’un portrait).',
          'Retourne la photo et le dessin à l’envers : tu verras les formes, pas l’objet.',
          'Passe la photo en noir et blanc pour mieux lire les valeurs (option de l’outil Visualiseur).'
        ],
        observe: [
          'Dans chaque case, où se trouve la valeur la plus sombre et la plus claire ?',
          'Les points d’intersection de ton dessin correspondent-ils exactement à ceux de la référence ?'
        ]
      },
      exercise: {
        title: 'Un fruit, puis un visage',
        duration: '1 h 30',
        material: ['Papier à dessin A4', 'Crayons 2H (grille), HB, 2B, 4B, 6B', 'Règle, gomme, estompe', 'Une photo de fruit et une photo de visage en noir et blanc'],
        instructions: [
          'Ouvre ta photo de fruit dans l’outil « Visualiseur de références » avec la grille 4×4.',
          'Reproduis-la avec la méthode de la leçon (45 min).',
          'Choisis ensuite une photo de visage de face. Utilise une grille 6×6.',
          'Reproduis le contour et les grandes masses de valeurs (45 min).',
          'Ajoute les deux dessins dans « Mes dessins » pour suivre ta progression.'
        ],
        selfCheck: [
          'Les contours se superposent presque à ceux de la référence.',
          'Les valeurs de chaque case correspondent à la référence.',
          'La grille n’est plus visible dans le dessin final.'
        ]
      }
    }
  ]
};
