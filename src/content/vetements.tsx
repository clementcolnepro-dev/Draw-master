import type { Module } from './types';
import { T, Dot } from './shapes';

const hem = 'M60 230 Q75 242 90 231 Q105 222 120 236 Q135 246 150 233 Q165 224 180 237 Q192 243 200 230';

export const vetements: Module = {
  id: 'vetements',
  letter: 'D',
  discipline: 'vetements',
  title: 'Vêtements et tissus',
  subtitle: 'Tension, plis, matières',
  description:
    "Un tissu n’est jamais dessiné au hasard : chaque pli a une cause. Il naît d’un point de tension, tombe sous l’effet de la gravité ou se comprime. En apprenant les grandes familles de plis, tu pourras habiller n’importe quel personnage de façon crédible.",
  planned: [
    'Dessiner une chemise',
    'Dessiner un pantalon',
    'Dessiner une veste',
    'Dessiner des vêtements amples',
    'Comprendre les différentes matières',
    'Dessiner le cuir, le jean, le coton et la laine',
    'Ajouter les ombres et les textures',
    'Habiller un personnage de manière réaliste'
  ],
  lessons: [
    // ─────────────────────────────────────────────── D1
    {
      id: 'd1-tension',
      module: 'vetements',
      title: 'Le comportement du tissu et les points de tension',
      difficulty: 'Débutant',
      minutes: 35,
      skill: 'Identifier les points de tension et dessiner les plis qui en partent',
      objective:
        "Comprendre comment un tissu réagit à la gravité et aux points d’appui, et dessiner les plis qui rayonnent depuis un point de tension.",
      why:
        "Les débutants ajoutent des plis « pour faire joli », au hasard : le vêtement paraît froissé et faux. En sachant d’où partent les plis et pourquoi, tu en dessineras moins, mais des justes.",
      theory: [
        "Un tissu a deux comportements : il **pend** sous l’effet de la gravité là où il est libre, et il **se tend** là où il est retenu. Les endroits où il est retenu (épingle, épaule, coude plié, genou, ceinture) sont les **points de tension**.",
        "**Les plis partent des points de tension** et s’en éloignent en rayonnant, comme les rayons d’une roue. Plus la tension est forte, plus les plis sont nets, tendus et rectilignes. Loin des points de tension, le tissu se détend et les plis deviennent mous et arrondis.",
        "Un pli est un **volume** : c’est un petit cylindre (ou un cône) de tissu. Il a donc une face éclairée, une ligne de terminaison, une ombre propre, et il projette parfois une ombre sur le pli voisin. On applique exactement les règles de la sphère et du cylindre (leçons A2 et A4).",
        "Le **bord** du tissu (l’ourlet) révèle la forme des plis : il ondule en suivant les creux et les bosses. C’est souvent l’ourlet qui rend un drapé crédible.",
        "L’**épaisseur** et la **rigidité** de la matière changent les plis : un tissu fin (soie) forme beaucoup de petits plis serrés, un tissu épais (laine, jean) forme peu de plis, larges et arrondis."
      ],
      drawing: {
        viewBox: '0 0 260 260',
        layers: [
          <g key="0">
            <circle cx="130" cy="30" r="5" fill="#b4532a" />
            <T x={140} y={26} s={8}>point de tension</T>
          </g>,
          <g key="1">
            <path className="ln" d="M130 30 C100 80 70 150 60 230" />
            <path className="ln" d="M130 30 C160 80 190 150 200 230" />
            <path className="ln" d={hem} />
          </g>,
          <g key="2">
            <path className="lt" d="M130 34 C118 110 100 180 90 231" />
            <path className="lt" d="M130 34 C125 120 120 190 120 236" />
            <path className="lt" d="M130 34 C138 120 146 190 150 233" />
            <path className="lt" d="M130 34 C146 110 168 180 180 237" />
          </g>,
          <g key="3">
            <path d="M130 34 C118 110 100 180 90 231 Q105 222 120 236 C120 190 125 120 130 34 Z" fill="url(#hatch)" />
            <path d="M130 34 C138 120 146 190 150 233 Q165 224 180 237 C168 180 146 110 130 34 Z" fill="url(#hatch)" />
            <path d="M130 34 C160 80 190 150 200 230 Q192 243 180 237 C168 180 146 110 130 34 Z" fill="url(#hatchLight)" />
          </g>,
          <g key="4">
            <path className="lt" d="M90 231 Q105 238 120 236 M150 233 Q165 240 180 237" />
            <path className="cn" d="M60 230 Q75 220 90 231 M120 236 Q135 226 150 233" />
          </g>,
          <g key="5">
            <path d="M130 40 C112 110 84 180 75 232" stroke="#fffdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M130 40 C132 120 134 190 135 240" stroke="#fffdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M131 40 C150 110 160 180 165 228" stroke="#fffdf8" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        ]
      },
      steps: [
        { title: 'Le point de tension', text: "Place le point où le tissu est retenu : ici, une épingle. Tout le reste du tissu pend à partir de ce point." },
        { title: 'La silhouette', text: "Trace la silhouette générale du tissu : il s’élargit en descendant, comme un cône. Le bas (l’ourlet) ondule." },
        { title: 'Les plis rayonnants', text: "Depuis le point de tension, trace les plis qui rayonnent vers le bas. Ils sont tendus et rapprochés près de l’épingle, plus larges et plus mous en bas. Chaque pli aboutit à un creux ou une bosse de l’ourlet." },
        { title: 'Les ombres', text: "Chaque creux entre deux plis est dans l’ombre. Lumière venant de la gauche : ombre la face droite de chaque pli et le côté droit du tissu." },
        { title: 'L’ourlet en volume', text: "Le bas du tissu se lit comme une suite de tubes : on voit l’avant des bosses et l’arrière des creux (en pointillés). C’est cette ondulation qui exprime le volume des plis." },
        { title: 'Les lumières', text: "Gomme une ligne de lumière sur la crête de chaque pli, fine près de l’épingle, plus large en bas. Les crêtes éclairées et les creux sombres créent le relief." }
      ],
      tips: {
        errors: [
          'Des plis qui ne partent de nulle part.',
          'Des plis tous parallèles et de même taille.',
          'Un ourlet droit alors que le tissu est plissé.',
          'Des plis dessinés par de simples traits, sans ombre ni volume.'
        ],
        tricks: [
          'Accroche un torchon par un coin avec une pince et dessine-le : c’est le modèle idéal.',
          'Commence toujours par repérer les points de tension avant de dessiner un vêtement.',
          'Moins de plis, mieux placés, valent mieux que beaucoup de plis approximatifs.'
        ],
        observe: [
          'Sur tes vêtements, trouve les points de tension quand tu lèves le bras ou plies le genou.',
          'Compare la façon dont tombent un t-shirt en coton et un pull en laine.'
        ]
      },
      exercise: {
        title: 'Le torchon suspendu',
        duration: '40 minutes',
        material: ['Papier', 'Crayons HB, 2B, 4B', 'Un torchon ou un tissu, une pince ou une punaise, une lampe'],
        instructions: [
          'Suspends le tissu par un seul coin, éclairé latéralement.',
          'Dessine la silhouette et les plis principaux en 10 minutes, en partant du point de tension.',
          'Ajoute les ombres en 20 minutes, en traitant chaque pli comme un cylindre.',
          'Recommence en suspendant le tissu par deux coins (voir leçon D3).'
        ],
        selfCheck: [
          'Tous mes plis partent du point de tension.',
          'L’ourlet ondule en accord avec les plis.',
          'Chaque pli a une face claire et une face sombre.'
        ]
      }
    },
    // ─────────────────────────────────────────────── D2
    {
      id: 'd2-compression',
      module: 'vetements',
      title: 'Les plis de compression',
      difficulty: 'Intermédiaire',
      minutes: 40,
      skill: 'Dessiner les plis en accordéon d’une manche comprimée',
      objective:
        "Dessiner les plis qui apparaissent quand un tissu tubulaire est comprimé (manche relevée, bas de pantalon), avec leur alternance de bourrelets et de losanges.",
      why:
        "Les manches relevées, les chaussettes, les bas de pantalon, les bottes souples : les plis de compression sont partout. Bien dessinés, ils donnent instantanément du réalisme et du volume au membre qui est dessous.",
      theory: [
        "Quand on pousse un tube de tissu dans le sens de sa longueur, l’excès de tissu doit aller quelque part : il forme des **bourrelets** qui s’empilent comme un **accordéon**.",
        "Les bourrelets ne sont pas réguliers : ils forment des **losanges** et des **« Y »** qui s’emboîtent, alternant d’un côté puis de l’autre du tube. C’est cette alternance qui donne un aspect naturel.",
        "La **silhouette** du tube n’est plus droite : chaque bourrelet fait déborder le contour, créant une ligne bosselée. Le membre en dessous reste un cylindre : le tissu s’enroule autour.",
        "Les **creux** entre les bourrelets sont des zones d’**ombre très marquée** (occlusion), parfois presque noires. Les bourrelets, eux, sont des petits cylindres arrondis avec leur propre lumière.",
        "La compression est **plus forte près de l’obstacle** (le poignet, la cheville, le coude plié) et se relâche en s’éloignant."
      ],
      drawing: {
        viewBox: '0 0 280 200',
        layers: [
          <g key="0">
            <path className="cn" d="M20 85 H262 M20 125 H262" />
            <ellipse className="cn" cx="262" cy="105" rx="6" ry="20" />
            <T x={20} y={70} s={8}>le bras : un cylindre</T>
          </g>,
          <g key="1">
            <path className="ln" d="M30 80 Q50 70 70 80 Q88 68 106 80 Q122 70 138 81 Q152 71 166 82 Q180 72 192 84 Q202 76 212 86" />
            <path className="ln" d="M30 130 Q48 142 64 130 Q82 142 100 129 Q118 141 134 128 Q150 140 164 127 Q178 138 192 126 Q202 134 212 124" />
          </g>,
          <g key="2">
            <path className="lt" d="M70 80 L86 105 L64 130 M86 105 L100 129" />
            <path className="lt" d="M106 80 L120 103 L100 129 M120 103 L134 128" />
            <path className="lt" d="M138 81 L150 104 L134 128 M150 104 L164 127" />
            <path className="lt" d="M166 82 L177 104 L164 127 M177 104 L192 126" />
            <path className="lt" d="M192 84 L200 104 L192 126" />
          </g>,
          <g key="3">
            <path d="M70 80 L86 105 L64 130 Q60 120 62 105 Z" fill="url(#hatchDense)" />
            <path d="M106 80 L120 103 L100 129 Q96 115 98 102 Z" fill="url(#hatchDense)" />
            <path d="M138 81 L150 104 L134 128 Q130 116 132 103 Z" fill="url(#hatchDense)" />
            <path d="M166 82 L177 104 L164 127 Q160 116 162 103 Z" fill="url(#hatchDense)" />
            <path d="M30 112 Q120 120 212 112 L212 124 Q120 140 30 130 Z" fill="url(#hatchLight)" />
          </g>,
          <g key="4">
            <ellipse className="ln" cx="212" cy="105" rx="9" ry="19" />
            <path className="lt" d="M206 90 Q214 96 208 104 Q216 110 208 118" />
            <path className="ln" d="M221 92 H262 M221 118 H262" />
            <T x={222} y={140} s={8}>poignet</T>
          </g>,
          <g key="5">
            <path d="M44 78 Q50 74 58 77 M80 76 Q88 72 96 76 M114 77 Q120 73 128 77 M144 78 Q150 74 158 78" stroke="#fffdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M78 100 Q80 106 76 112 M112 98 Q114 104 110 110 M144 100 Q146 105 142 110" stroke="#fffdf8" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        ]
      },
      steps: [
        { title: 'Le cylindre du membre', text: "Trace légèrement le bras comme un cylindre. Le tissu va s’enrouler autour : ne le perds jamais de vue." },
        { title: 'La silhouette bosselée', text: "Trace le contour de la manche : une ligne qui ondule, avec des bosses qui ne sont pas alignées entre le haut et le bas. Les bosses du haut tombent en face des creux du bas." },
        { title: 'Losanges et « Y »', text: "Relie les bosses du haut et du bas par des lignes obliques qui se croisent : tu obtiens une suite de losanges et de « Y ». Chaque pli traverse le tube en diagonale." },
        { title: 'Les ombres des creux', text: "Fonce fortement les creux entre les bourrelets, surtout à leur pointe. Ombre aussi tout le dessous du bras, qui ne reçoit pas la lumière." },
        { title: 'Le poignet', text: "La manche s’arrête sur le poignet : son bord forme une ellipse irrégulière, froncée. Le bras continue en dessous." },
        { title: 'Les lumières', text: "Pose des lumières sur le dessus de chaque bourrelet. L’alternance net/sombre rend le volume du tissu épais." }
      ],
      tips: {
        errors: [
          'Des bourrelets réguliers comme les anneaux d’un ressort.',
          'Une silhouette droite alors que le tissu est comprimé.',
          'Oublier le cylindre en dessous : la manche paraît plate.'
        ],
        tricks: [
          'Remonte la manche de ton pull et photographie-la : c’est le meilleur modèle.',
          'Pense « Y » et « losange » plutôt que « vague ».',
          'Plus le tissu est épais, moins il y a de bourrelets, et plus ils sont gros.'
        ],
        observe: [
          'Observe le bas d’un jean sur une chaussure : où se forment les bourrelets ?',
          'Compare une manche de chemise fine et une manche de pull épais remontées.'
        ]
      },
      exercise: {
        title: 'Manches et chaussettes',
        duration: '40 minutes',
        material: ['Papier', 'Crayons HB, 2B, 4B', 'Ton bras avec une manche relevée, une chaussette'],
        instructions: [
          'Remonte la manche d’un pull jusqu’au coude et dessine-la d’après nature (20 min).',
          'Dessine une chaussette repliée sur une cheville (10 min).',
          'Dessine de mémoire, en 10 minutes, un bas de pantalon qui tombe sur une chaussure, en appliquant la méthode losanges/Y.'
        ],
        selfCheck: [
          'Mes bourrelets alternent de part et d’autre du tube.',
          'Les creux sont les zones les plus sombres.',
          'On devine le membre sous le tissu.'
        ]
      }
    },
    // ─────────────────────────────────────────────── D3
    {
      id: 'd3-suspendus',
      module: 'vetements',
      title: 'Les plis suspendus (drapés)',
      difficulty: 'Intermédiaire',
      minutes: 40,
      skill: 'Dessiner un drapé suspendu entre deux points',
      objective:
        "Dessiner un tissu suspendu entre deux points : les plis en « U » emboîtés et les cascades qui tombent des points d’accroche.",
      why:
        "Ce type de pli se trouve partout : rideaux, écharpes, capes, manches amples, tissu tendu entre les épaules et les bras levés. Il est aussi le pli « classique » de la peinture et de la sculpture.",
      theory: [
        "Quand un tissu est tenu par **deux points**, il s’affaisse entre eux sous son poids. Il forme une suite de **plis en « U »** (ou en hamac), emboîtés les uns dans les autres.",
        "Le **premier U**, juste sous la ligne entre les deux points, est le plus petit et le plus tendu. Les suivants sont **de plus en plus grands et profonds**. Tous convergent vers les deux points d’accroche.",
        "Depuis chaque point d’accroche, le surplus de tissu tombe verticalement en **cascade** : un bord qui zigzague en se repliant sur lui-même.",
        "La lumière révèle les U : le **dessus de chaque courbe** est éclairé, l’**intérieur du creux** est dans l’ombre. Les ombres sont plus marquées au centre, là où les plis sont les plus profonds.",
        "Plus les deux points sont **rapprochés**, plus le tissu est lâche : les U sont profonds et nombreux. Plus ils sont **écartés**, plus le tissu est tendu : les U s’aplatissent jusqu’à presque disparaître."
      ],
      drawing: {
        viewBox: '0 0 300 220',
        layers: [
          <g key="0">
            <circle cx="40" cy="40" r="5" fill="#b4532a" />
            <circle cx="260" cy="40" r="5" fill="#b4532a" />
            <line className="cn" x1="40" y1="40" x2="260" y2="40" />
          </g>,
          <g key="1">
            <path className="ln" d="M40 40 Q150 78 260 40" />
          </g>,
          <g key="2">
            <path className="ln" d="M42 44 Q150 122 258 44" />
            <path className="ln" d="M46 48 Q150 162 254 48" />
            <path className="ln" d="M52 54 Q150 198 248 54" />
          </g>,
          <g key="3">
            <path className="ln" d="M40 40 L33 90 L46 110 L30 160 L44 175" />
            <path className="ln" d="M260 40 L267 90 L254 110 L270 160 L256 175" />
            <path className="lt" d="M40 40 L46 110 M260 40 L254 110" />
          </g>,
          <g key="4">
            <path d="M42 44 Q150 122 258 44 Q150 92 42 44 Z" fill="url(#hatchLight)" />
            <path d="M46 48 Q150 162 254 48 Q150 132 46 48 Z" fill="url(#hatch)" />
            <path d="M52 54 Q150 198 248 54 Q150 172 52 54 Z" fill="url(#hatchDense)" />
            <path d="M40 40 L46 110 L30 160 L44 175 L33 90 Z" fill="url(#hatch)" />
            <path d="M260 40 L254 110 L270 160 L256 175 L267 90 Z" fill="url(#hatch)" />
          </g>,
          <g key="5">
            <path d="M80 62 Q150 96 220 62" stroke="#fffdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M80 82 Q150 132 220 82" stroke="#fffdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M84 104 Q150 168 216 104" stroke="#fffdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        ]
      },
      steps: [
        { title: 'Les deux points', text: "Place les deux points d’accroche. La ligne qui les relie sert de repère : tout le tissu pend en dessous." },
        { title: 'Le bord supérieur', text: "Le bord du tissu s’affaisse légèrement entre les deux points : une courbe douce et tendue." },
        { title: 'Les U emboîtés', text: "Trace les plis en U, de plus en plus grands vers le bas. Chacun part très près des points d’accroche. Ils ne se croisent jamais." },
        { title: 'Les cascades', text: "Sous chaque point d’accroche, le tissu en trop tombe en cascade : un bord en zigzag qui se replie. Les cascades encadrent le drapé." },
        { title: 'Les ombres', text: "L’intérieur de chaque U est dans l’ombre, de plus en plus sombre vers le bas où les plis sont profonds. Ombre aussi les replis des cascades." },
        { title: 'Les lumières', text: "Sur la crête de chaque U, une ligne de lumière continue. Ces lignes claires parallèles donnent l’effet de drapé classique." }
      ],
      tips: {
        errors: [
          'Des U qui se croisent ou qui ne rejoignent pas les points d’accroche.',
          'Des U tous de la même taille.',
          'Oublier les cascades : le tissu semble collé aux points.'
        ],
        tricks: [
          'Tiens une écharpe entre tes deux mains devant un miroir et rapproche-les : observe les U se creuser.',
          'Dessine d’abord le pli le plus profond, puis les autres de part et d’autre.'
        ],
        observe: [
          'Regarde un rideau ouvert et attaché : où sont les U, où sont les cascades ?',
          'Sur une personne qui lève les bras en t-shirt, repère les U sous les aisselles.'
        ]
      },
      exercise: {
        title: 'Drapé entre deux punaises',
        duration: '40 minutes',
        material: ['Papier', 'Crayons HB, 2B, 4B', 'Un tissu fin (foulard, tee-shirt), deux punaises, une lampe'],
        instructions: [
          'Accroche le tissu par deux coins au mur, à 40 cm d’écart.',
          'Dessine les U et les cascades (15 min), puis les valeurs (15 min).',
          'Rapproche les punaises à 20 cm et refais un croquis de 10 minutes : compare la profondeur des U.'
        ],
        selfCheck: [
          'Mes U convergent vers les deux points.',
          'Les U grandissent vers le bas.',
          'Les cascades sont présentes sous les points.'
        ]
      }
    },
    // ─────────────────────────────────────────────── D4
    {
      id: 'd4-zigzag',
      module: 'vetements',
      title: 'Les plis en zigzag (articulations)',
      difficulty: 'Intermédiaire',
      minutes: 45,
      skill: 'Dessiner les plis d’un pantalon au niveau d’un genou plié',
      objective:
        "Dessiner les plis qui se forment à l’intérieur d’une articulation pliée (genou, coude) et les plis de tension qui partent de l’extérieur.",
      why:
        "Dès qu’un personnage bouge, ses articulations se plient et le tissu réagit. Ce sont les plis qui « racontent » le mouvement : bien dessinés, ils rendent un personnage assis, accroupi ou en marche immédiatement crédible.",
      theory: [
        "Quand un tube de tissu se **plie**, il est **comprimé à l’intérieur** de l’angle (le creux du genou, le pli du coude) et **tendu à l’extérieur** (sur le genou, sur la pointe du coude).",
        "À l’intérieur de l’angle, l’excès de tissu forme des **plis en zigzag** : une suite de petits plis en forme de Z ou d’éclair, qui s’empilent dans le creux. Leurs ombres sont profondes.",
        "À l’extérieur, le tissu est tendu sur l’articulation : il est **lisse** et les plis partent de ce **point de tension** en **diagonales** vers les zones de compression (vers la hanche, vers la cheville).",
        "Le bas du pantalon forme une **« cassure »** au-dessus de la chaussure : quelques bourrelets de compression (leçon D2).",
        "La **matière** change tout : un jean épais forme des zigzags gros et rigides, un pantalon de toile fine des plis plus nombreux et plus doux."
      ],
      drawing: {
        viewBox: '0 0 260 280',
        layers: [
          <g key="0">
            <path className="cn" d="M60 40 L150 132 L140 262" />
            <circle className="cn" cx="150" cy="132" r="16" />
            <T x={170} y={136} s={8}>genou</T>
          </g>,
          <g key="1">
            <path className="ln" d="M82 18 L170 110 Q186 130 178 156 L170 262" />
            <path className="ln" d="M38 62 L118 148 L114 262" />
          </g>,
          <g key="2">
            <path className="ln" d="M118 148 L136 140 L120 162 L140 156 L122 180 L134 182" />
            <path className="lt" d="M168 118 Q130 100 90 70 M172 140 Q140 120 112 112 M168 128 Q140 150 128 150" />
          </g>,
          <g key="3">
            <path d="M118 148 L136 140 L120 162 Z" fill="url(#hatchDense)" />
            <path d="M120 162 L140 156 L122 180 Z" fill="url(#hatchDense)" />
            <path d="M38 62 L118 148 L114 262 L132 262 L134 182 L122 180 L118 148 L60 80 Z" fill="url(#hatch)" opacity=".8" />
          </g>,
          <g key="4">
            <path className="ln" d="M114 262 Q142 274 170 262" />
            <path className="lt" d="M116 240 Q130 248 142 238 Q156 248 170 240" />
            <path className="lt" d="M118 250 Q132 256 146 248" />
          </g>,
          <g key="5">
            <path d="M175 118 Q182 132 176 152" stroke="#fffdf8" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M160 108 Q125 90 95 60" stroke="#fffdf8" strokeWidth="2" fill="none" strokeLinecap="round" />
            {Array.from({ length: 14 }, (_, i) => (
              <line key={i} x1={150 + (i % 7) * 3} y1={170 + i * 6} x2={155 + (i % 7) * 3} y2={168 + i * 6} stroke="#2e2a25" strokeWidth=".6" opacity=".4" />
            ))}
          </g>
        ]
      },
      steps: [
        { title: 'La jambe dessous', text: "Trace la cuisse et la jambe comme deux axes reliés au genou (une sphère). Ici, le genou est plié : la jambe forme un angle." },
        { title: 'Le tube du pantalon', text: "Habille la jambe d’un tube. À l’extérieur, le tissu épouse l’arrondi du genou. À l’intérieur, l’angle est plus fermé." },
        { title: 'Zigzags et diagonales', text: "Dans le creux du genou, trace une suite de plis en zigzag qui s’empilent. Depuis le genou (point de tension), trace quelques plis en diagonale qui remontent vers la cuisse." },
        { title: 'Les ombres', text: "Les triangles des zigzags sont très sombres. Le côté de la jambe opposé à la lumière est dans une ombre moyenne." },
        { title: 'La cassure du bas', text: "Au-dessus de la chaussure, le bas du pantalon se comprime : deux ou trois bourrelets ondulés, et un ourlet en ellipse." },
        { title: 'Lumières et texture', text: "Une lumière marquée sur le genou, là où le tissu est tendu. Pour un jean, ajoute un léger hachurage diagonal qui suggère le tissage." }
      ],
      tips: {
        errors: [
          'Des plis à l’extérieur du genou : il y est tendu et lisse.',
          'Des zigzags trop réguliers et symétriques.',
          'Trop de petits plis partout : garde de grandes zones calmes.'
        ],
        tricks: [
          'Assieds-toi et photographie ton genou plié en jean, éclairé de côté.',
          'Simplifie : 3 à 5 plis bien placés suffisent souvent.',
          'Le même principe s’applique au coude d’une veste.'
        ],
        observe: [
          'Compare les plis de ton pantalon debout et assis.',
          'Observe l’intérieur du coude d’une veste quand tu plies le bras.'
        ]
      },
      exercise: {
        title: 'Genoux et coudes pliés',
        duration: '45 minutes',
        material: ['Papier', 'Crayons HB, 2B, 4B', 'Ton propre pantalon et ta veste, un miroir ou des photos'],
        instructions: [
          'Dessine ta jambe pliée en position assise, en jean, d’après nature (20 min).',
          'Dessine ton bras plié dans une veste ou un sweat (15 min).',
          'Fais trois croquis de 3 minutes de personnes assises (photos) en identifiant seulement les zones de tension et de compression.'
        ],
        selfCheck: [
          'Le côté extérieur de l’articulation est lisse et éclairé.',
          'Les zigzags sont dans le creux de l’articulation.',
          'Les plis diagonaux partent du point de tension.'
        ]
      }
    },
    // ─────────────────────────────────────────────── D5
    {
      id: 'd5-tshirt',
      module: 'vetements',
      title: 'Dessiner un t-shirt',
      difficulty: 'Intermédiaire',
      minutes: 50,
      skill: 'Habiller un torse d’un t-shirt crédible (tension, plis, coutures)',
      objective:
        "Dessiner un t-shirt porté sur un torse, en partant du corps, des points de tension et des plis qui en découlent.",
      why:
        "Le t-shirt est le vêtement le plus dessiné. Il est un excellent résumé de la leçon : il pend des épaules, se tend sur la poitrine, se comprime aux aisselles et à la taille. Si tu sais dessiner un t-shirt, tu sais aborder tous les hauts.",
      theory: [
        "Un vêtement se dessine **toujours par-dessus le corps**. Commence par le mannequin (leçon C2) : épaules, cage thoracique, bassin. Le tissu se pose dessus.",
        "Un t-shirt est retenu par les **épaules** : ce sont ses principaux points de tension. Il est aussi en contact avec le **haut de la poitrine** (ou les pectoraux), qui le soutient. Entre ces points et la taille, il **pend**.",
        "Les **plis principaux** : depuis l’aisselle, des plis en diagonale vers la poitrine ; sous la poitrine, le tissu se détache du corps et tombe ; à la taille, si le t-shirt est un peu long, des plis de compression horizontaux.",
        "Les **coutures** sont des lignes qui suivent la forme du corps : la couture d’épaule, l’encolure (une ellipse autour du cou), l’ourlet et les bas de manches (des ellipses autour du torse et des bras). Elles révèlent le volume, comme les lignes de contour d’une sphère.",
        "Le **coton** est un tissu de poids moyen : plis assez doux, peu nombreux, arrondis. Un t-shirt **moulant** a très peu de plis (le corps se lit), un t-shirt **ample** a de grands plis tombants."
      ],
      drawing: {
        viewBox: '0 0 260 290',
        layers: [
          <g key="0">
            <path className="cn" d="M80 52 Q130 40 180 52" />
            <ellipse className="cn" cx="130" cy="110" rx="48" ry="62" />
            <path className="cn" d="M95 200 L165 200 L170 250 L90 250 Z" />
            <path className="cn" d="M118 22 L118 42 M142 22 L142 42" />
          </g>,
          <g key="1">
            <path className="ln" d="M104 46 Q130 62 156 46 L200 62 L232 118 L204 134 L190 106 L193 262 Q130 274 67 262 L70 106 L56 134 L28 118 L60 62 Z" />
          </g>,
          <g key="2">
            <Dot x={104} y={46} r={4} /> <Dot x={156} y={46} r={4} />
            <Dot x={92} y={110} r={4} /> <Dot x={168} y={110} r={4} />
            <T x={204} y={50} s={8}>épaule</T>
            <T x={198} y={180} s={8}>appuis : épaules</T>
            <T x={198} y={191} s={8}>et poitrine</T>
          </g>,
          <g key="3">
            <path className="lt" d="M72 104 Q90 120 100 140 M188 104 Q170 120 160 140" />
            <path className="lt" d="M92 112 Q90 170 96 230 M168 112 Q170 170 164 230" />
            <path className="lt" d="M80 236 Q100 228 120 238 Q140 228 160 238 Q172 232 184 238" />
            <path className="lt" d="M202 80 L214 112 M60 80 L48 112" />
          </g>,
          <g key="4">
            <path d="M190 106 L193 262 Q182 264 170 266 L168 112 Z" fill="url(#hatch)" />
            <path d="M70 106 L67 262 Q78 264 90 266 L92 112 Z" fill="url(#hatchLight)" />
            <path d="M96 140 Q130 160 164 140 Q130 150 96 140 Z" fill="#4b453e" opacity=".3" />
            <path d="M200 62 L232 118 L204 134 L190 106 Z" fill="url(#hatchLight)" />
            <path d="M110 50 Q130 66 150 50 Q130 58 110 50 Z" fill="#4b453e" opacity=".7" />
          </g>,
          <g key="5">
            <path className="lt" d="M100 46 Q130 70 160 46" />
            <path d="M70 254 Q130 266 192 254" className="cn" />
            <path className="cn" d="M58 128 L32 114 M202 128 L228 114" />
            <path className="lt" d="M104 46 L90 70 M156 46 L170 70" opacity=".6" />
          </g>
        ]
      },
      steps: [
        { title: 'Le corps dessous', text: "Pose légèrement les épaules, le cou, la cage thoracique et le haut du bassin. Le t-shirt n’existe que parce que ce corps le porte." },
        { title: 'La silhouette du t-shirt', text: "Trace la forme générale : encolure, épaules, manches courtes qui s’écartent du bras, flancs qui tombent presque droits depuis l’aisselle, ourlet qui contourne les hanches." },
        { title: 'Les points de tension', text: "Repère les points d’appui : les deux épaules (le t-shirt pend de là) et les deux points hauts de la poitrine (le tissu repose dessus puis se détache)." },
        { title: 'Les plis', text: "Diagonales de l’aisselle vers la poitrine. Plis verticaux mous qui descendent de la poitrine. Petits plis de compression à la taille et sur le dessus de la manche." },
        { title: 'Les ombres', text: "Le côté opposé à la lumière est ombré. Sous la poitrine, une ombre douce là où le tissu se détache du corps. L’intérieur de l’encolure et des manches est sombre." },
        { title: 'Coutures et détails', text: "Double ligne de l’encolure côtelée, coutures d’épaule, surpiqûres en pointillés sur l’ourlet et les bas de manches. Elles suivent le volume du corps : ce sont des ellipses." }
      ],
      tips: {
        errors: [
          'Dessiner le t-shirt sans le corps dessous : il paraît vide ou plat.',
          'Mettre des plis partout de façon uniforme.',
          'Des coutures et ourlets droits au lieu de suivre la courbure du torse.'
        ],
        tricks: [
          'Porte un t-shirt et photographie-toi : bras le long du corps, bras levés, torse tourné.',
          'Commence par les plis les plus grands et les plus sombres, ignore les tout petits.',
          'Une ombre portée sous la manche sur le bras renforce l’épaisseur du tissu.'
        ],
        observe: [
          'Où ton t-shirt touche-t-il réellement ton corps, et où s’en détache-t-il ?',
          'Observe la forme de l’encolure quand tu tournes la tête.'
        ]
      },
      exercise: {
        title: 'Le t-shirt en trois poses',
        duration: '50 minutes',
        material: ['Papier', 'Crayons HB, 2B, 4B', 'Photos de toi ou d’un proche en t-shirt'],
        instructions: [
          'Reproduis la démonstration de la leçon (15 min).',
          'Dessine un t-shirt porté bras le long du corps, d’après photo (15 min).',
          'Dessine-le avec les bras levés : repère les nouveaux points de tension (aisselles) et les U qui se forment (10 min).',
          'Dessine-le torse en torsion : les plis s’enroulent en spirale autour du torse (10 min).'
        ],
        selfCheck: [
          'J’ai d’abord dessiné le corps.',
          'Chaque pli a une cause (tension, compression ou gravité).',
          'Mes coutures suivent la courbure du corps.'
        ]
      }
    }
  ]
};
