import type { Module } from './types';
import { T, Dot } from './shapes';

type P = [number, number];
const seg = (a: P, b: P, cls = 'ln') => <line className={cls} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />;
const capsule = (a: P, b: P, w: number) => (
  <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#2e2a25" strokeOpacity=".16" strokeWidth={w} strokeLinecap="round" />
);
const joint = (p: P, r = 5) => <circle className="lt" cx={p[0]} cy={p[1]} r={r} fill="#f3ede2" />;

// Mannequin (leçon C2) — contrapposto : poids sur la jambe droite (à droite de l'image).
const M = {
  sh: [[92, 76], [166, 86]] as P[],
  el: [[80, 138], [180, 146]] as P[],
  wr: [[78, 190], [172, 196]] as P[],
  hip: [[112, 190], [148, 180]] as P[],
  kn: [[100, 262], [148, 254]] as P[],
  an: [[88, 320], [138, 324]] as P[]
};

// Pose dynamique (leçon C5)
const D = {
  sh: [[176, 110], [210, 82]] as P[],
  el: [[152, 140], [244, 58]] as P[],
  wr: [[128, 134], [280, 30]] as P[],
  hip: [[116, 186], [140, 172]] as P[],
  kn: [[90, 248], [168, 232]] as P[],
  an: [[68, 302], [146, 292]] as P[]
};

// Doigts (leçon C4) : base → pointe
const fingers: [P, P][] = [
  [[92, 150], [82, 62]],
  [[117, 142], [114, 40]],
  [[142, 143], [148, 50]],
  [[165, 150], [180, 82]]
];
const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

export const anatomie: Module = {
  id: 'anatomie',
  letter: 'C',
  discipline: 'anatomie',
  title: 'Anatomie et corps humain',
  subtitle: 'Proportions, structure, mouvement',
  description:
    "Comprendre le corps pour le dessiner de manière crédible : ses proportions, ses grandes masses (cage thoracique et bassin), un mannequin de construction, les mains et enfin le mouvement. On construit toujours de l’intérieur vers l’extérieur.",
  planned: [
    'Les épaules et les clavicules',
    'Les bras et les avant-bras',
    'Les jambes',
    'Les pieds',
    'Les principaux groupes musculaires',
    'Les articulations',
    'Les raccourcis anatomiques',
    'La perspective appliquée au corps',
    'Réaliser un corps humain complet réaliste'
  ],
  lessons: [
    // ─────────────────────────────────────────────── C1
    {
      id: 'c1-proportions',
      module: 'anatomie',
      title: 'Les proportions du corps : la règle des 8 têtes',
      difficulty: 'Débutant',
      minutes: 40,
      skill: 'Placer les repères du corps avec le canon de 8 têtes',
      objective:
        "Utiliser la hauteur de la tête comme unité pour construire un corps aux proportions justes, et connaître les repères anatomiques principaux.",
      why:
        "Sans unité de mesure, les corps dessinés ont presque toujours une tête trop grosse, des jambes trop courtes et des bras qui s’arrêtent trop tôt. Le canon de 8 têtes est le système le plus utilisé par les illustrateurs pour éviter ces erreurs.",
      theory: [
        "On mesure le corps **en hauteurs de tête** (du sommet du crâne au menton). Un adulte réel mesure en moyenne **7 à 7,5 têtes** ; les artistes utilisent souvent **8 têtes**, plus élégant et plus simple à diviser. Un enfant de 5 ans mesure environ 5 têtes.",
        "Repères du canon de 8 têtes : **1** = menton ; **2** = ligne des mamelons ; **3** = nombril (et coudes) ; **4** = entrejambe, c’est **la moitié exacte du corps** ; **5** = mi-cuisse (bout des doigts) ; **6** = sous les genoux ; **7** = mi-mollet ; **8** = plante des pieds.",
        "En largeur : les **épaules** d’un homme mesurent environ **2 hauteurs de tête** ; chez la femme, un peu moins, avec des hanches relativement plus larges. Les **hanches** font environ 1,5 tête de large.",
        "Les **bras** : le coude tombe au niveau du nombril (taille), le poignet au niveau de l’entrejambe, le bout des doigts à mi-cuisse. Bras tendus à l’horizontale, l’envergure est à peu près égale à la hauteur totale.",
        "Ce canon est un **outil de construction**, pas une loi : observe ton modèle et adapte. Mais commence toujours par placer ces repères avant tout détail."
      ],
      drawing: {
        viewBox: '0 0 260 360',
        layers: [
          <g key="0">
            {Array.from({ length: 9 }, (_, i) => (
              <line key={i} className="cn" x1="40" y1={20 + i * 40} x2="200" y2={20 + i * 40} />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <T key={i} x={215} y={45 + i * 40} s={10}>{String(i + 1)}</T>
            ))}
            <line className="gd" x1="110" y1="14" x2="110" y2="346" />
          </g>,
          <g key="1">
            <ellipse className="ln" cx="110" cy="40" rx="15" ry="20" />
          </g>,
          <g key="2">
            <path className="ln" d="M104 59 L103 70 M116 59 L117 70" />
            <path className="ln" d="M72 78 Q110 66 148 78" />
            <path className="ln" d="M80 82 C76 105 84 128 96 138 M140 82 C144 105 136 128 124 138" />
            <Dot x={95} y={100} /> <Dot x={125} y={100} />
            <T x={170} y={97} s={8}>mamelons</T>
            <T x={170} y={57} s={8}>menton</T>
          </g>,
          <g key="3">
            <Dot x={110} y={140} />
            <path className="ln" d="M96 138 C92 148 84 155 82 165 L110 183 L138 165 C136 155 128 148 124 138" />
            <T x={170} y={137} s={8}>nombril</T>
            <T x={170} y={177} s={8}>entrejambe = ½</T>
          </g>,
          <g key="4">
            <path className="ln" d="M84 168 C86 205 92 235 96 252 M106 182 C106 210 104 235 102 252 M136 168 C134 205 128 235 124 252 M114 182 C114 210 116 235 118 252" />
            <circle className="lt" cx="99" cy="258" r="7" />
            <circle className="lt" cx="121" cy="258" r="7" />
            <path className="ln" d="M93 264 C90 285 96 310 98 330 M105 264 C106 290 104 315 103 330 M127 264 C130 285 124 310 122 330 M115 264 C114 290 116 315 117 330" />
            <T x={170} y={257} s={8}>genoux</T>
          </g>,
          <g key="5">
            <path className="ln" d="M98 330 L86 341 L104 341 L103 330 M122 330 L134 341 L116 341 L117 330" />
            <T x={170} y={337} s={8}>pieds</T>
          </g>,
          <g key="6">
            <path className="ln" d="M73 80 C64 100 64 120 66 140 C64 158 62 170 63 182 M147 80 C156 100 156 120 154 140 C156 158 158 170 157 182" />
            <path className="ln" d="M63 182 C60 196 62 208 66 216 M157 182 C160 196 158 208 154 216" />
            <circle className="lt" cx="66" cy="140" r="4" />
            <circle className="lt" cx="154" cy="140" r="4" />
            <T x={170} y={217} s={8}>bout des doigts</T>
          </g>
        ]
      },
      steps: [
        { title: 'La grille de 8 têtes', text: "Trace une verticale et divise-la en 8 parts égales. La hauteur d’une part sera la hauteur de la tête. C’est la toute première chose à poser." },
        { title: 'La tête', text: "Dessine la tête dans la première case : un ovale du sommet au menton. Toutes les autres mesures découlent d’elle." },
        { title: 'Épaules, cage thoracique', text: "Les épaules se placent juste sous le menton, larges d’environ 2 têtes. La cage thoracique descend jusqu’au repère 3. Les mamelons sont sur la ligne 2." },
        { title: 'Nombril, bassin, entrejambe', text: "Le nombril est sur la ligne 3, l’entrejambe sur la ligne 4 : c’est la moitié exacte de la figure. Le bassin, en forme de coupe, fait environ 1,5 tête de large." },
        { title: 'Les jambes', text: "La cuisse descend jusqu’au genou, juste au-dessus de la ligne 6. La jambe se termine à la cheville, un peu au-dessus de la ligne 8. Les cuisses s’affinent vers le genou." },
        { title: 'Les pieds', text: "Les pieds occupent le bas de la dernière case. Vus de face, ils sont courts car on les voit en raccourci." },
        { title: 'Les bras', text: "Coudes à hauteur du nombril (ligne 3), poignets à l’entrejambe (ligne 4), bout des doigts à mi-cuisse. Des bras trop courts sont l’erreur la plus fréquente." }
      ],
      tips: {
        errors: [
          'Une tête trop grosse par rapport au corps (souvent 6 têtes au lieu de 8).',
          'Des jambes trop courtes : l’entrejambe doit être au milieu.',
          'Des bras qui s’arrêtent à la taille.',
          'Des épaules trop étroites.'
        ],
        tricks: [
          'Utilise l’outil « Grille de proportions du corps » de l’app pour réviser.',
          'Trace toujours la grille avant de dessiner, même pour un croquis rapide.',
          'Mesure les photos de référence avec la tête comme unité.'
        ],
        observe: [
          'Mesure-toi dans un miroir : combien de têtes mesures-tu ?',
          'Où arrivent tes doigts quand tes bras pendent ?'
        ]
      },
      exercise: {
        title: 'Le canon en trois versions',
        duration: '40 minutes',
        material: ['Papier', 'Crayon HB', 'Règle'],
        instructions: [
          'Dessine une figure de face sur une grille de 8 têtes (20 cm de haut), en plaçant tous les repères.',
          'Dessine à côté une figure de 7,5 têtes (réaliste) et compare.',
          'Sur 3 photos de personnes debout, mesure combien de têtes elles mesurent et où tombent l’entrejambe et les coudes.',
          'Refais la figure de 8 têtes sans règle, en 5 minutes.'
        ],
        selfCheck: [
          'L’entrejambe est au milieu de ma figure.',
          'Les coudes sont au niveau du nombril.',
          'Le bout des doigts arrive à mi-cuisse.'
        ]
      }
    },
    // ─────────────────────────────────────────────── C2
    {
      id: 'c2-mannequin',
      module: 'anatomie',
      title: 'Construire un mannequin simplifié',
      difficulty: 'Débutant',
      minutes: 40,
      skill: 'Construire un corps en volumes simples à partir d’une ligne d’action',
      objective:
        "Construire un corps humain avec un mannequin de formes simples (sphère, œufs, cylindres) posé sur une ligne d’action, pour dessiner n’importe quelle pose.",
      why:
        "On ne dessine pas un corps en commençant par les contours des muscles. On pose d’abord une structure simple et juste, qui contient la pose, l’équilibre et les proportions. L’anatomie viendra ensuite « habiller » ce mannequin.",
      theory: [
        "La **ligne d’action** est une courbe unique qui résume le mouvement principal du corps, de la tête aux pieds. C’est la première ligne que l’on trace : elle donne l’énergie de la pose.",
        "Le corps se résume à **trois masses** qui ne se déforment pas : la **tête** (sphère), la **cage thoracique** (œuf) et le **bassin** (boîte ou coupe). Elles sont reliées par la **colonne vertébrale**, qui, elle, se courbe.",
        "Les **lignes des épaules et des hanches** sont essentielles : dans une pose naturelle debout, elles s’inclinent **en sens opposé** (le *contrapposto*). La hanche monte du côté de la jambe d’appui, l’épaule descend de ce côté.",
        "Les **membres** sont des segments reliés par des **articulations** (sphères) : épaule, coude, poignet, hanche, genou, cheville. Chaque segment devient ensuite un **cylindre** qui s’affine.",
        "**L’équilibre** : chez une personne debout, une verticale partant du creux du cou tombe sur le pied d’appui (ou entre les deux pieds si le poids est réparti). Si ce n’est pas le cas, la figure semble tomber."
      ],
      drawing: {
        viewBox: '0 0 260 340',
        layers: [
          <g key="0">
            <path className="gd" d="M130 25 C150 120 112 200 140 330" strokeWidth="2" />
            <T x={150} y={30} s={8}>ligne d’action</T>
          </g>,
          <g key="1">
            <ellipse className="ln" cx="132" cy="44" rx="16" ry="20" transform="rotate(8 132 44)" />
          </g>,
          <g key="2">
            <ellipse className="ln" cx="128" cy="112" rx="30" ry="38" transform="rotate(6 128 112)" />
          </g>,
          <g key="3">
            <path className="ln" d="M104 176 L152 166 L154 194 L132 210 L110 204 Z" />
          </g>,
          <g key="4">
            <path className="gd" d="M134 64 C124 110 138 150 130 186" />
            {seg(M.sh[0], M.sh[1], 'cn')}
            {seg([104, 176], [152, 166], 'cn')}
            <T x={190} y={74} s={8}>épaules</T>
            <T x={30} y={182} s={8}>hanches</T>
          </g>,
          <g key="5">
            {[0, 1].map((i) => (
              <g key={i}>
                {seg(M.sh[i], M.el[i])}
                {seg(M.el[i], M.wr[i])}
                {seg(M.hip[i], M.kn[i])}
                {seg(M.kn[i], M.an[i])}
              </g>
            ))}
            <path className="ln" d="M88 320 L74 330 L92 330 Z M138 324 L156 332 L138 334 Z" />
          </g>,
          <g key="6">
            {[...M.sh, ...M.el, ...M.wr, ...M.hip, ...M.kn, ...M.an].map((p, i) => (
              <g key={i}>{joint(p)}</g>
            ))}
          </g>,
          <g key="7">
            {[0, 1].map((i) => (
              <g key={i}>
                {capsule(M.sh[i], M.el[i], 16)}
                {capsule(M.el[i], M.wr[i], 12)}
                {capsule(M.hip[i], M.kn[i], 22)}
                {capsule(M.kn[i], M.an[i], 15)}
              </g>
            ))}
            <line className="cn" x1="132" y1="68" x2="132" y2="330" />
            <T x={20} y={300} s={8}>aplomb du cou</T>
            <T x={20} y={311} s={8}>→ pied d’appui</T>
          </g>
        ]
      },
      steps: [
        { title: 'La ligne d’action', text: "Trace une seule courbe souple, de la tête au pied d’appui. Elle exprime le mouvement global : ici, une légère courbe en S d’une personne au repos." },
        { title: 'La tête', text: "Pose la tête en haut de la ligne d’action, légèrement inclinée. Elle sert d’unité de mesure pour le reste du corps (règle des 8 têtes)." },
        { title: 'La cage thoracique', text: "Un œuf d’environ 1,5 tête de haut, sous la tête. Le cou les relie (le cou n’est pas un simple trait : il a une épaisseur)." },
        { title: 'Le bassin', text: "Une boîte ou une coupe, inclinée. Laisse un espace entre la cage et le bassin : c’est la zone souple de l’abdomen, où le corps se plie et se tord." },
        { title: 'Colonne, épaules, hanches', text: "Relie les masses par la colonne vertébrale. Trace la ligne des épaules et celle des hanches : elles s’inclinent en sens contraire. La hanche est haute du côté de la jambe d’appui." },
        { title: 'Les segments des membres', text: "Bras : épaule → coude → poignet. Jambes : hanche → genou → cheville. Vérifie les longueurs avec la règle des 8 têtes. La jambe d’appui est sous le centre du corps." },
        { title: 'Les articulations', text: "Place une petite sphère à chaque articulation. C’est autour d’elles que les membres pivotent : elles t’aident à comprendre la rotation." },
        { title: 'Les volumes', text: "Transforme les segments en cylindres qui s’affinent vers les extrémités. Vérifie l’équilibre : une verticale depuis le cou tombe sur le pied d’appui." }
      ],
      tips: {
        errors: [
          'Épaules et hanches parallèles : la pose paraît raide.',
          'Une ligne d’action droite : la figure est sans vie.',
          'Coller la cage thoracique et le bassin : le torse ne peut plus se plier.',
          'Un pied d’appui qui n’est pas sous le centre de gravité.'
        ],
        tricks: [
          'Dessine des dizaines de mannequins rapides (1 à 2 min) avec l’outil « Minuteur de croquis ».',
          'Garde le mannequin très léger : il sera recouvert par la suite.',
          'Sur des photos de sport ou de danse, trace la ligne d’action par-dessus.'
        ],
        observe: [
          'Debout, mets le poids sur une jambe et observe dans un miroir l’inclinaison de tes hanches et de tes épaules.',
          'Où passe la verticale depuis ton cou ?'
        ]
      },
      exercise: {
        title: '30 mannequins',
        duration: '40 minutes',
        material: ['Papier A4 ou carnet', 'Crayon HB', 'Photos de poses (sport, danse, vie quotidienne)'],
        instructions: [
          'Avec le minuteur de croquis réglé sur 1 minute, dessine 15 lignes d’action seules d’après photos.',
          'Règle le minuteur sur 2 minutes : dessine 10 mannequins complets (ligne d’action, 3 masses, segments, articulations).',
          'Prends 5 minutes par mannequin pour 3 poses : ajoute les volumes cylindriques et vérifie l’équilibre.'
        ],
        selfCheck: [
          'Mes lignes d’action sont courbes et dynamiques.',
          'Épaules et hanches s’inclinent en sens opposé sur les poses debout.',
          'Mes figures debout paraissent stables.'
        ]
      }
    },
    // ─────────────────────────────────────────────── C3
    {
      id: 'c3-cage-bassin',
      module: 'anatomie',
      title: 'Comprendre la cage thoracique et le bassin',
      difficulty: 'Intermédiaire',
      minutes: 45,
      skill: 'Dessiner la cage thoracique et le bassin et leurs repères visibles',
      objective:
        "Connaître la forme de la cage thoracique et du bassin, leurs repères visibles sous la peau, et la façon dont ils bougent l’un par rapport à l’autre.",
      why:
        "Ces deux masses osseuses déterminent toute la silhouette du torse. Les muscles, les vêtements et les plis s’organisent autour d’elles. Les comprendre permet de dessiner un torse crédible, même sous un t-shirt.",
      theory: [
        "La **cage thoracique** a la forme d’un **œuf** (ou d’un tonneau) plus étroit en haut. Elle est un peu aplatie à l’avant et à l’arrière. En haut, les **clavicules** forment une barre presque horizontale qui s’appuie sur le **sternum**.",
        "Le **sternum** est un os plat au centre. Sous lui s’ouvre l’**arc costal** (ou arcade thoracique), un « V » renversé très visible sur les corps minces et sur les poses étirées. Les **côtes** partent de la colonne à l’arrière et descendent en oblique vers l’avant.",
        "Le **bassin** a la forme d’une **coupe** ou d’une boîte inclinée vers l’avant. Ses repères visibles sont les **crêtes iliaques** (les « os des hanches ») et, devant, les **épines iliaques** qui pointent sous la peau. Le bassin féminin est plus large et plus bas, le masculin plus haut et plus étroit.",
        "Entre les deux, la **colonne lombaire** est la seule liaison osseuse : c’est là que le torse se plie, se tord et s’incline. Les **obliques** (muscles de la taille) relient la cage au bassin.",
        "Simplifier ces deux masses en **boîtes** aide énormément pour les dessiner en perspective : on voit immédiatement leur orientation, leur inclinaison et leur rotation l’une par rapport à l’autre."
      ],
      drawing: {
        viewBox: '0 0 260 300',
        layers: [
          <g key="0">
            <ellipse className="ln" cx="130" cy="100" rx="55" ry="70" />
          </g>,
          <g key="1">
            <path className="ln" d="M124 46 L136 46 L135 122 L130 130 L125 122 Z" />
            <path className="ln" d="M126 44 Q100 34 68 42 M134 44 Q160 34 192 42" />
          </g>,
          <g key="2">
            <path className="ln" d="M84 160 Q108 145 130 130 Q152 145 176 160" />
          </g>,
          <g key="3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i}>
                <path className="lt" d={`M125 ${58 + i * 12} Q${90 - i} ${54 + i * 13} ${80 + i * 1.5} ${84 + i * 14}`} />
                <path className="lt" d={`M135 ${58 + i * 12} Q${170 + i} ${54 + i * 13} ${180 - i * 1.5} ${84 + i * 14}`} />
              </g>
            ))}
          </g>,
          <g key="4">
            <path className="ln" d="M80 212 Q72 194 96 199 Q130 214 164 199 Q188 194 180 212 L172 246 Q152 268 130 270 Q108 268 88 246 Z" />
            <path className="lt" d="M120 262 Q130 255 140 262" />
            <Dot x={88} y={208} /> <Dot x={172} y={208} />
            <T x={186} y={210} s={8}>crête iliaque</T>
          </g>,
          <g key="5">
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} className="cn" x="124" y={170 + i * 9} width="12" height="7" rx="2" />
            ))}
            <path className="lt" d="M80 140 Q76 175 86 205 M180 140 Q184 175 174 205" />
            <T x={190} y={180} s={8}>obliques</T>
          </g>,
          <g key="6">
            <path className="cn" d="M75 30 L185 30 L190 170 L70 170 Z" />
            <path className="cn" d="M78 196 L182 196 L174 268 L86 268 Z" />
            <T x={10} y={100} s={8}>« boîte »</T>
            <T x={10} y={235} s={8}>« boîte »</T>
          </g>
        ]
      },
      steps: [
        { title: 'L’œuf de la cage', text: "Trace un œuf plus étroit en haut, d’environ 1,5 tête de haut. C’est la forme générale de la cage thoracique vue de face." },
        { title: 'Sternum et clavicules', text: "Au centre, le sternum, un os plat en forme de cravate. En haut, les clavicules partent du sternum vers les épaules en légère forme de S." },
        { title: 'L’arc costal', text: "Sous le sternum, trace le « V » renversé de l’arc costal. C’est le repère le plus visible de la cage sur un corps vivant." },
        { title: 'Les côtes', text: "Trace quelques côtes : elles descendent en oblique et s’enroulent autour de la forme. Tu n’auras presque jamais à les dessiner toutes : il s’agit de comprendre la direction." },
        { title: 'Le bassin', text: "Plus bas, la coupe du bassin. Repère les crêtes iliaques en haut de chaque côté : ce sont les points où les hanches dépassent sous la peau." },
        { title: 'La liaison : lombaires et obliques', text: "La colonne lombaire relie seule les deux masses. Les obliques forment la taille, de la cage vers les crêtes iliaques. C’est la zone mobile du torse." },
        { title: 'Simplifier en boîtes', text: "Enferme chaque masse dans une boîte. Cette simplification permet de dessiner le torse sous n’importe quel angle : penche, tourne ou incline les boîtes indépendamment." }
      ],
      tips: {
        errors: [
          'Une cage thoracique trop petite ou trop courte : elle descend jusqu’au niveau du nombril environ.',
          'Un torse dessiné comme un seul bloc rigide.',
          'Des côtes horizontales : elles descendent toujours vers l’avant.'
        ],
        tricks: [
          'Sur des photos de sportifs, repère l’arc costal et les crêtes iliaques.',
          'Dessine les boîtes en perspective (leçon A3) pour tourner le torse.',
          'Une ficelle imaginaire relie le nombril au sternum : elle se plie quand le torse se courbe.'
        ],
        observe: [
          'Touche tes propres crêtes iliaques et ton arc costal.',
          'Penche-toi sur le côté devant un miroir : observe la compression d’un côté et l’étirement de l’autre.'
        ]
      },
      exercise: {
        title: 'Les deux masses en mouvement',
        duration: '45 minutes',
        material: ['Papier', 'Crayon HB et 2B', 'Photos de torses (sport, modèles vivants)'],
        instructions: [
          'Dessine la cage et le bassin de face, de profil et de dos (10 min chacun), en t’appuyant sur la démonstration.',
          'Sur 5 photos de poses, dessine uniquement les deux boîtes et la colonne qui les relie.',
          'Dessine 3 torses où les boîtes s’inclinent en sens opposé (penché, tordu, cambré).'
        ],
        selfCheck: [
          'Je retrouve l’arc costal et les crêtes iliaques sur mes photos de référence.',
          'Mes boîtes sont orientées indépendamment l’une de l’autre.'
        ]
      }
    },
    // ─────────────────────────────────────────────── C4
    {
      id: 'c4-mains',
      module: 'anatomie',
      title: 'Les mains et les doigts',
      difficulty: 'Intermédiaire',
      minutes: 60,
      skill: 'Construire une main en plans et segments, pouce compris',
      objective:
        "Construire une main vue de dos à partir de la paume en boîte, des arcs des articulations et des segments des doigts.",
      why:
        "Les mains sont réputées difficiles parce qu’on essaie de les dessiner doigt par doigt. En les construisant comme une boîte et une série d’arcs, elles deviennent logiques. Des mains justes donnent une grande crédibilité à un personnage.",
      theory: [
        "La **paume** est une boîte légèrement trapézoïdale, à peu près **carrée**. Elle est un peu plus large au niveau des articulations des doigts qu’au poignet.",
        "**Le majeur mesure environ la longueur de la paume.** L’index et l’annulaire sont légèrement plus courts, l’auriculaire arrive à peu près à la dernière articulation de l’annulaire.",
        "Les articulations ne sont **pas alignées** : les jointures (métacarpes), puis chaque rangée d’articulations des doigts, forment des **arcs** concentriques. C’est le principe le plus important : garde ces arcs, et la main sera juste dans toutes les positions.",
        "Chaque doigt a **trois phalanges** dont la longueur diminue vers le bout (environ 1/2, 1/3, 1/4 de la longueur totale… la première est la plus longue). Les doigts sont légèrement plus épais aux articulations et s’affinent vers le bout.",
        "Le **pouce** n’est pas dans le même plan que les doigts : il part du **poignet**, pas de la paume. Sa base est une masse charnue (l’éminence thénar). Il n’a que deux phalanges visibles, mais son métacarpe mobile forme un troisième segment."
      ],
      drawing: {
        viewBox: '0 0 260 300',
        layers: [
          <g key="0">
            <path className="ln" d="M82 152 L172 148 L176 250 L92 256 Z" />
            <T x={134} y={274} a="middle" s={8}>paume ≈ carrée</T>
          </g>,
          <g key="1">
            <path className="gd" d="M82 154 Q125 128 172 150" />
            {fingers.map(([a], i) => (
              <Dot key={i} x={a[0]} y={a[1]} />
            ))}
          </g>,
          <g key="2">
            {fingers.map(([a, b], i) => (
              <line key={i} className="cn" x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
            ))}
            <path className="gd" d="M80 62 Q112 22 182 82" />
            <path className="gd" d="M232 40 V142 M228 40 H236 M228 142 H236 M232 150 V256 M228 256 H236" />
            <T x={238} y={94} s={8}>=</T>
            <T x={238} y={205} s={8}>=</T>
          </g>,
          <g key="3">
            {[0.5, 0.76].map((t, k) => (
              <path
                key={k}
                className="gd"
                d={`M${lerp(...fingers[0], t).join(' ')} Q${lerp(...fingers[1], t)[0]} ${lerp(...fingers[1], t)[1] - 8} ${lerp(...fingers[2], t).join(' ')} T${lerp(...fingers[3], t).join(' ')}`}
              />
            ))}
            {fingers.flatMap(([a, b], i) => [0.5, 0.76].map((t) => <Dot key={`${i}-${t}`} x={lerp(a, b, t)[0]} y={lerp(a, b, t)[1]} r={2.5} />))}
          </g>,
          <g key="4">
            <path className="ln" d="M90 245 Q58 222 48 190 L40 150 M90 220 Q70 200 64 175 L56 140" />
            <path className="cn" d="M90 250 L52 185 L42 130" />
            <Dot x={52} y={185} /> <Dot x={44} y={150} />
            <T x={10} y={292} s={8}>le pouce part du poignet</T>
          </g>,
          <g key="5">
            {fingers.map(([a, b], i) => (
              <line key={`o${i}`} x1={a[0]} y1={a[1] + 6} x2={b[0]} y2={b[1]} stroke="#2e2a25" strokeWidth={i === 3 ? 19 : 22} strokeLinecap="round" />
            ))}
            <path d="M82 152 L172 148 L176 250 L92 256 Z" fill="none" stroke="#2e2a25" strokeWidth="3" strokeLinejoin="round" />
            <path d="M90 234 Q64 211 56 182 L48 140" fill="none" stroke="#2e2a25" strokeWidth="23" strokeLinecap="round" />
            {fingers.map(([a, b], i) => (
              <line key={`f${i}`} x1={a[0]} y1={a[1] + 6} x2={b[0]} y2={b[1]} stroke="#f3ede2" strokeWidth={i === 3 ? 16 : 19} strokeLinecap="round" />
            ))}
            <path d="M90 234 Q64 211 56 182 L48 140" fill="none" stroke="#f3ede2" strokeWidth="20" strokeLinecap="round" />
            <path d="M83 153 L171 149 L175 249 L93 255 Z" fill="#f3ede2" />
          </g>,
          <g key="6">
            {fingers.map(([a, b], i) => {
              const t1 = lerp(a, b, 0.5), t2 = lerp(a, b, 0.76), nail = lerp(a, b, 0.9);
              return (
                <g key={i}>
                  <path className="lt" d={`M${t1[0] - 6} ${t1[1]} q6 3 12 0 M${t2[0] - 5} ${t2[1]} q5 2 10 0`} />
                  <rect className="lt" x={nail[0] - 5} y={nail[1] - 4} width="10" height="11" rx="4" transform={`rotate(${(Math.atan2(b[0] - a[0], a[1] - b[1]) * 180) / Math.PI} ${nail[0]} ${nail[1]})`} />
                </g>
              );
            })}
            <path d="M158 150 L172 148 L176 250 L164 252 Z" fill="url(#hatchLight)" />
            <path className="lt" d="M100 160 L104 230 M124 155 L124 228 M146 155 L144 228" opacity=".45" />
            <rect className="lt" x="43" y="136" width="10" height="11" rx="4" transform="rotate(-15 48 141)" />
          </g>
        ]
      },
      steps: [
        { title: 'La paume', text: "Trace la paume comme une boîte presque carrée, un peu plus large du côté des doigts. Son épaisseur est faible : vue de dos, c’est un plan." },
        { title: 'L’arc des jointures', text: "Les jointures des doigts ne sont pas alignées : elles forment un arc, le plus haut au niveau du majeur. Place un point par doigt sur cet arc." },
        { title: 'Longueur des doigts', text: "Trace l’axe de chaque doigt. Le majeur est aussi long que la paume. Les doigts s’écartent légèrement en éventail et leurs bouts forment un nouvel arc." },
        { title: 'Les phalanges', text: "Place les articulations de chaque doigt. Relie-les d’un doigt à l’autre : tu obtiens des arcs parallèles à celui des jointures. La première phalange est la plus longue." },
        { title: 'Le pouce', text: "Le pouce part du poignet, sur le côté de la paume, avec une base charnue. Il a trois segments (métacarpe compris) et pointe dans une direction différente des doigts." },
        { title: 'Les volumes', text: "Habille chaque axe d’un cylindre, plus large à la base, arrondi au bout. Fusionne doigts et paume en une seule silhouette sans lignes intérieures inutiles." },
        { title: 'Détails et valeurs', text: "Ajoute les plis aux articulations, les ongles (qui suivent l’orientation de chaque doigt), les tendons sur le dos de la main et une ombre légère sur le côté de la paume." }
      ],
      tips: {
        errors: [
          'Des doigts tous de la même longueur, alignés comme une saucisse.',
          'Des doigts trop longs ou une paume trop petite.',
          'Un pouce qui part du milieu de la paume.',
          'Des ongles plaqués de face alors que le doigt tourne.'
        ],
        tricks: [
          'Ta propre main gauche (ou droite) est un modèle toujours disponible !',
          'Dessine d’abord la main en « moufle » (les doigts groupés en une masse) puis sépare-les.',
          'Pense aux arcs : si tu plies les doigts, ils se courbent mais restent concentriques.'
        ],
        observe: [
          'Pose ta main à plat : vérifie que le majeur mesure bien la longueur de la paume.',
          'Ferme doucement le poing : observe comment les arcs se resserrent.'
        ]
      },
      exercise: {
        title: 'Ta main en 10 positions',
        duration: '60 minutes',
        material: ['Papier', 'Crayons HB et 2B', 'Ta main libre comme modèle'],
        instructions: [
          'Reproduis la démonstration étape par étape (15 min).',
          'Dessine ta main libre dans 10 positions (5 min chacune) : à plat, poing fermé, main qui tient un objet, doigts écartés, vue de profil…',
          'Pour chaque dessin, commence par la boîte de la paume et les arcs, même pour les poses compliquées.',
          'Photographie la page et ajoute-la dans « Mes dessins ».'
        ],
        selfCheck: [
          'Mes arcs d’articulations restent cohérents dans les différentes poses.',
          'Le pouce part du poignet.',
          'La longueur du majeur est proche de celle de la paume.'
        ]
      }
    },
    // ─────────────────────────────────────────────── C5
    {
      id: 'c5-mouvement',
      module: 'anatomie',
      title: 'Les poses et les mouvements',
      difficulty: 'Avancé',
      minutes: 50,
      skill: 'Dessiner une pose dynamique équilibrée à partir de la ligne d’action',
      objective:
        "Dessiner une pose dynamique en partant de la ligne d’action, en orientant les masses et en vérifiant l’équilibre.",
      why:
        "Un corps parfaitement proportionné mais figé ne paraît pas vivant. La dynamique vient de la ligne d’action et de la relation entre les masses. C’est ce qui rend un personnage expressif et crédible.",
      theory: [
        "Les lignes d’action ont trois formes de base : la **ligne droite** (tension, rigidité), la **courbe en C** (étirement, effort d’un seul côté) et la **courbe en S** (souplesse, repos, élégance).",
        "Dans un mouvement, le corps est presque toujours **étiré d’un côté et comprimé de l’autre**. Le côté étiré forme une courbe douce et longue, le côté comprimé des plis et des courbes serrées.",
        "Les masses **s’orientent selon la ligne d’action** : la cage thoracique et le bassin s’inclinent et tournent indépendamment. Plus l’écart entre leurs orientations est grand, plus la pose est dynamique.",
        "**L’équilibre** reste indispensable : le centre de gravité (environ au niveau du bassin) doit se trouver au-dessus de la zone d’appui (entre les pieds). Sinon, la figure doit être en train de tomber, de courir ou de s’appuyer sur quelque chose.",
        "Les **croquis rapides** (gesture drawing) de 30 secondes à 2 minutes sont le meilleur entraînement : ils obligent à capter l’essentiel du mouvement avant les détails."
      ],
      drawing: {
        viewBox: '0 0 300 320',
        layers: [
          <g key="0">
            <path className="gd" d="M68 302 C90 200 150 90 262 32" strokeWidth="2" />
            <T x={20} y={20} s={8}>courbe en C : étirement</T>
          </g>,
          <g key="1">
            <ellipse className="ln" cx="236" cy="58" rx="15" ry="19" transform="rotate(40 236 58)" />
          </g>,
          <g key="2">
            <ellipse className="ln" cx="186" cy="112" rx="25" ry="34" transform="rotate(48 186 112)" />
            <path className="ln" d="M108 176 L142 160 L156 186 L136 204 L116 200 Z" />
          </g>,
          <g key="3">
            <path className="gd" d="M222 76 C200 100 168 136 134 182" />
            {seg(D.sh[0], D.sh[1], 'cn')}
            {seg(D.hip[0], D.hip[1], 'cn')}
          </g>,
          <g key="4">
            {[0, 1].map((i) => (
              <g key={i}>
                {seg(D.sh[i], D.el[i])}
                {seg(D.el[i], D.wr[i])}
                {seg(D.hip[i], D.kn[i])}
                {seg(D.kn[i], D.an[i])}
              </g>
            ))}
            <path className="ln" d="M68 302 L52 310 L70 312 Z M146 292 L164 300 L146 302 Z" />
          </g>,
          <g key="5">
            {[0, 1].map((i) => (
              <g key={i}>
                {capsule(D.sh[i], D.el[i], 15)}
                {capsule(D.el[i], D.wr[i], 11)}
                {capsule(D.hip[i], D.kn[i], 21)}
                {capsule(D.kn[i], D.an[i], 14)}
              </g>
            ))}
            {[...D.sh, ...D.el, ...D.wr, ...D.hip, ...D.kn, ...D.an].map((p, i) => (
              <g key={i}>{joint(p, 4.5)}</g>
            ))}
          </g>,
          <g key="6">
            <circle cx="132" cy="186" r="5" fill="#b4532a" />
            <line className="cn" x1="132" y1="186" x2="132" y2="312" />
            <line className="gd" x1="60" y1="312" x2="160" y2="312" strokeWidth="3" />
            <T x={170} y={305} s={8}>centre de gravité</T>
            <T x={170} y={316} s={8}>au-dessus de l’appui</T>
          </g>
        ]
      },
      steps: [
        { title: 'La ligne d’action', text: "Une seule grande courbe en C qui va du pied arrière jusqu’à la main tendue : tout le corps s’étire dans cette direction. Trace-la en un geste rapide, avec énergie." },
        { title: 'La tête', text: "La tête prolonge la ligne d’action, inclinée dans le sens du mouvement." },
        { title: 'Les masses', text: "Cage thoracique et bassin suivent la courbe : la cage est très inclinée, presque couchée dans la direction du mouvement, le bassin l’est moins. L’écart entre les deux crée la torsion." },
        { title: 'Colonne, épaules, hanches', text: "La colonne suit le côté étiré. Les lignes d’épaules et de hanches sont perpendiculaires à chaque masse : elles ne sont plus parallèles." },
        { title: 'Les membres', text: "Le bras avant prolonge la ligne d’action. La jambe arrière aussi : c’est elle qui pousse. La jambe avant, pliée, porte le poids. Le bras arrière équilibre la pose." },
        { title: 'Volumes et articulations', text: "Ajoute les articulations et les cylindres. Dans les zones comprimées (aisselle du bras arrière, hanche avant), les volumes se rapprochent ; du côté étiré, ils s’éloignent." },
        { title: 'Vérifier l’équilibre', text: "Le centre de gravité, au niveau du bassin, doit tomber entre les deux pieds. Ici, la figure est en équilibre instable mais crédible : elle s’étire sans tomber." }
      ],
      tips: {
        errors: [
          'Commencer par les contours au lieu de la ligne d’action.',
          'Atténuer le mouvement par prudence : exagère légèrement plutôt que l’inverse.',
          'Oublier le côté comprimé : seul le côté étiré est dessiné.',
          'Un centre de gravité en dehors de la base d’appui sans raison.'
        ],
        tricks: [
          'Règle l’outil « Minuteur de croquis » sur 30 s puis 1 min : interdis-toi les détails.',
          'Dessine avec tout le bras, debout si possible, sur un grand format.',
          'Mime la pose toi-même pour sentir où va le poids.'
        ],
        observe: [
          'Sur des photos de sport, trouve le côté étiré et le côté comprimé.',
          'Repère les poses en C et en S dans la vie quotidienne.'
        ]
      },
      exercise: {
        title: 'Séance de croquis rapides',
        duration: '45 minutes',
        material: ['Carnet ou papier A3', 'Crayon gras (2B–4B) ou fusain', 'Photos de poses dynamiques', 'Minuteur de croquis de l’app'],
        instructions: [
          'Échauffement : 10 croquis de 30 secondes, uniquement la ligne d’action.',
          '10 croquis de 1 minute : ligne d’action + masses + membres en segments.',
          '5 croquis de 2 minutes avec articulations et volumes.',
          '2 croquis de 5 minutes avec vérification de l’équilibre.',
          'Note à chaque fois si la ligne d’action est en C, en S ou droite.'
        ],
        selfCheck: [
          'Mes croquis rapides montrent clairement le mouvement, même sans détails.',
          'Je distingue un côté étiré et un côté comprimé.',
          'Mes figures debout paraissent en équilibre.'
        ]
      }
    }
  ]
};
