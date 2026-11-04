import type { Guide } from './types';
import { Mirror, Tube, J, HeadGrid, type P } from './kit';

/* Corps entiers, vue de face. On dessine la moitié gauche ; <Mirror> crée la droite (axe x = 120).
   Grille : 8 têtes de 46 px, du sommet (y 16) à la plante des pieds (y 384). */

const CX = 120;

interface BodySpec {
  sh: P; el: P; wr: P; hip: P; kn: P; an: P;
  arm: [number, number, number]; // rayons épaule, coude, poignet
  leg: [number, number, number]; // rayons hanche, genou, cheville
  rib: { cy: number; rx: number; ry: number };
  pelvis: string;
  neck: [number, number];
  armPath: string;
  bodyPath: string;
  details: string;
  hair: string;
  shade: string;
}

const woman: BodySpec = {
  sh: [84, 80], el: [76, 145], wr: [73, 198], hip: [104, 196], kn: [105, 286], an: [106, 364],
  arm: [7, 5, 4], leg: [14, 8, 5],
  rib: { cy: 102, rx: 25, ry: 31 },
  pelvis: 'M94 166 L120 162 L120 212 L102 204 Z',
  neck: [112, 60],
  armPath:
    'M85 78 C77 81 74 91 75 101 C74 116 71 131 71 145 C70 162 69 182 70 198 C66 208 65 224 70 236 C75 241 82 237 81 227 C81 216 80 207 77 198 C78 183 80 164 81 148 C82 131 84 116 88 104',
  bodyPath:
    'M112 58 C112 66 110 70 106 73 C99 76 90 76 85 78 M90 101 C92 113 94 127 99 140 C101 151 94 168 83 185 C80 195 80 206 82 216 C84 240 92 264 97 285 C96 302 94 322 98 344 C100 356 101 362 102 366 C100 374 95 381 100 384 L113 384 C115 379 113 372 111 366 C113 350 115 330 113 310 C112 300 112 292 112 286 C113 263 116 234 120 205',
  details:
    'M96 104 C97 117 106 123 118 117 M104 77 Q113 81 119 79 M112 286 Q106 290 99 287 M120 150 Z',
  hair: 'M120 13 C98 12 95 30 97 46 C98 60 96 76 92 90 C99 88 103 80 104 70 C103 56 104 38 113 28 C116 24 118 22 120 22',
  shade:
    'M140 104 C142 120 140 130 136 140 C137 152 145 168 152 182 L157 186 C150 168 142 152 141 140 Z M131 210 C128 240 126 262 126 286 L130 286 C131 262 134 238 137 214 Z M162 106 C164 122 166 134 167 146 L161 148 C160 132 159 118 156 104 Z'
};

const man: BodySpec = {
  sh: [78, 82], el: [71, 148], wr: [69, 201], hip: [102, 196], kn: [104, 286], an: [106, 364],
  arm: [9, 6, 4.5], leg: [15, 9, 5.5],
  rib: { cy: 104, rx: 30, ry: 34 },
  pelvis: 'M98 166 L120 164 L120 212 L102 206 Z',
  neck: [110, 62],
  armPath:
    'M80 77 C70 82 67 94 69 105 C67 120 65 134 67 148 C65 165 65 184 67 201 C62 211 62 228 67 239 C73 244 82 239 81 229 C81 217 80 209 77 201 C78 183 80 164 80 150 C81 132 83 118 86 108',
  bodyPath:
    'M110 58 C110 66 108 70 104 72 C95 74 85 74 80 77 M87 104 C89 118 95 130 98 142 C99 156 97 170 92 186 C90 196 89 206 90 216 C91 240 94 262 97 284 C96 302 95 322 99 344 C100 356 101 362 102 366 C100 374 95 381 99 385 L113 385 C115 380 113 373 111 366 C113 350 115 330 113 310 C112 300 112 292 112 286 C113 262 116 232 120 206',
  details:
    'M91 101 C96 117 109 121 119 114 M101 77 Q112 81 119 79 M108 128 Q114 130 119 129 M108 146 Q114 148 119 147 M106 164 Q113 167 119 166 M112 286 Q106 290 99 287',
  hair: 'M120 12 C104 11 100 20 101 36 C103 28 110 24 120 25',
  shade:
    'M143 106 C146 122 143 134 141 144 C142 158 145 172 149 186 L154 188 C150 172 146 156 146 144 Z M131 212 C128 240 126 262 126 286 L130 286 C131 262 134 238 137 214 Z M166 110 C168 126 170 138 171 150 L165 152 C164 136 163 122 160 108 Z'
};

function body(id: string, title: string, s: BodySpec): Guide {
  return {
    id,
    title,
    level: 'Moyen',
    viewBox: '0 0 260 400',
    layers: [
      // 0 — lignes générales
      <g key="0">
        <HeadGrid top={16} unit={46} n={8} x1={50} x2={190} />
        <line className="gd" x1={CX} y1="8" x2={CX} y2="392" />
        <line className="gd" x1={s.sh[0]} y1={s.sh[1]} x2={240 - s.sh[0]} y2={s.sh[1]} />
        <line className="gd" x1={s.hip[0] - 18} y1={186} x2={240 - s.hip[0] + 18} y2={186} />
      </g>,
      // 1 — tête et cou
      <g key="1">
        <ellipse className="ln" cx={CX} cy="39" rx="16.5" ry="23" />
        <Mirror cx={CX}>
          <line className="cs" x1={s.neck[0]} y1={s.neck[1]} x2={s.neck[0] - 1} y2={76} />
        </Mirror>
      </g>,
      // 2 — cage thoracique et bassin
      <g key="2">
        <ellipse className="cs" cx={CX} cy={s.rib.cy} rx={s.rib.rx} ry={s.rib.ry} />
        <Mirror cx={CX}>
          <path className="cs" d={s.pelvis} />
        </Mirror>
        <path className="cn" d={`M${CX} ${s.rib.cy + s.rib.ry} L${CX} 165`} />
      </g>,
      // 3 — membres en tubes
      <g key="3">
        <Mirror cx={CX}>
          <Tube a={s.sh} b={s.el} r1={s.arm[0]} r2={s.arm[1]} />
          <Tube a={s.el} b={s.wr} r1={s.arm[1]} r2={s.arm[2]} />
          <Tube a={s.hip} b={s.kn} r1={s.leg[0]} r2={s.leg[1]} />
          <Tube a={s.kn} b={s.an} r1={s.leg[1]} r2={s.leg[2]} />
        </Mirror>
      </g>,
      // 4 — articulations, mains, pieds
      <g key="4">
        <Mirror cx={CX}>
          {[s.sh, s.el, s.wr, s.hip, s.kn, s.an].map((p, i) => (
            <J key={i} p={p} r={i === 0 || i === 3 ? 6 : 4.5} />
          ))}
          <path className="cs" d={`M${s.wr[0] - 6} ${s.wr[1] + 4} L${s.wr[0] + 6} ${s.wr[1] + 4} L${s.wr[0] + 7} ${s.wr[1] + 36} L${s.wr[0] - 4} ${s.wr[1] + 36} Z`} />
          <path className="cs" d={`M${s.an[0] - 4} ${s.an[1] + 2} L${s.an[0] + 6} ${s.an[1] + 2} L${s.an[0] + 7} 384 L${s.an[0] - 8} 384 Z`} />
        </Mirror>
      </g>,
      // 5 — ébauche
      <g key="5">
        <Mirror cx={CX}>
          <path className="sk" d={s.armPath} />
          <path className="sk" d={s.bodyPath} />
        </Mirror>
      </g>,
      // 6 — contour définitif
      <g key="6">
        <Mirror cx={CX}>
          <path className="ln" d={s.armPath} />
          <path className="ln" d={s.bodyPath} />
          <path className="lt" d={s.details} />
        </Mirror>
        <circle cx={CX} cy="150" r="1.4" fill="#2e2a25" />
      </g>,
      // 7 — visage et cheveux
      <g key="7">
        <Mirror cx={CX}>
          <path className="lt" d="M108 38 Q112 35.5 116 38" />
          <path className="lt" d="M107 33 Q111 30 116 32" />
          <path className="ln" d={s.hair} />
        </Mirror>
        <path className="lt" d="M118 47 Q120 49 122 47 M114 53 Q120 55 126 53" />
      </g>,
      // 8 — ombres
      <g key="8">
        <path d={s.shade} fill="url(#hatch)" />
        <path d="M128 30 C134 40 134 52 126 60 L132 58 C138 50 138 38 132 28 Z" fill="url(#hatchLight)" />
      </g>
    ],
    steps: [
      { title: 'Lignes générales : axe et grille de 8 têtes', tip: 'Ligne des épaules et ligne des hanches' },
      { title: 'Tête (1 unité) et cou' },
      { title: 'Cage thoracique (œuf) et bassin (boîte)', tip: id.includes('femme') ? 'Bassin plus large que la cage' : 'Cage plus large que le bassin' },
      { title: 'Bras et jambes en tubes', tip: 'Coudes au nombril, poignets à l’entrejambe' },
      { title: 'Articulations, mains et pieds simplifiés' },
      { title: 'Premières lignes d’ébauche de la silhouette', tip: 'Trait léger, on enveloppe les volumes' },
      { title: 'Contour définitif et détails' },
      { title: 'Visage et cheveux' },
      { title: 'Ombres légères', tip: 'Lumière venant de la gauche' }
    ]
  };
}

export const corpsFemme = body('corps-femme', 'Corps de femme (face)', woman);
export const corpsHomme = body('corps-homme', 'Corps d’homme (face)', man);
