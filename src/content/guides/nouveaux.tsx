import type { Guide } from './types';
import { Mirror, Tube, type P } from './kit';
import { portrait } from '../portrait';

const L = (id: string) => portrait.lessons.find((l) => l.id === id)!.drawing.layers;

/* ─────────────────────────────── Tête de face complète (Loomis + placement + rendu) */
export const teteFace: Guide = (() => {
  const b1 = L('b1-crane');
  const b2 = L('b2-face');
  return {
    id: 'tete-face',
    title: 'Tête de face',
    level: 'Facile',
    viewBox: '0 0 300 300',
    layers: [
      <g key="c0" className="constr">{b1[0]}</g>,
      <g key="c1" className="constr">{b1[1]}</g>,
      b1[2],
      b1[3],
      b1[4],
      <g key="c5" className="constr">{b1[5]}</g>,
      <g key="f" transform="translate(37.05 23.05) scale(.753)">
        {b2[6]}
      </g>,
      <g key="h">
        <Mirror cx={150}>
          <path className="ln" d="M150 34 C104 33 76 64 74 112 C73 150 78 182 90 206 C94 190 92 170 92 150 C93 120 104 92 126 80 C136 76 144 75 150 75" />
          <path className="lt" d="M150 46 C118 48 98 66 92 96 M136 52 C112 62 100 84 98 110" />
        </Mirror>
      </g>,
      b1[6],
      <g key="s">
        <path d="M208 140 C206 175 196 205 178 222 C190 214 204 194 210 160 Z" fill="url(#hatch)" />
        <path d="M144 176 Q150 181 156 176 Q150 186 144 176 Z" fill="#4b453e" opacity=".5" />
        <path d="M138 202 Q150 208 162 202 Q150 213 138 202 Z" fill="#4b453e" opacity=".45" />
        <path d="M120 236 Q150 250 182 232 L184 250 Q150 262 118 250 Z" fill="url(#hatch)" />
        <path d="M168 128 Q180 134 192 128 Q180 140 168 128 Z" fill="url(#hatchLight)" />
      </g>
    ],
    steps: [
      { title: 'Un cercle : la boîte crânienne' },
      { title: 'Couper les côtés (ellipses latérales)' },
      { title: 'Axe vertical et ligne des sourcils', tip: 'La ligne des sourcils passe au centre du cercle' },
      { title: 'Les trois tiers : cheveux, nez, menton', tip: 'Le menton est un tiers sous le cercle' },
      { title: 'La mâchoire' },
      { title: 'Placer orbites, nez, bouche et oreilles' },
      { title: 'Dessiner yeux, sourcils, nez et bouche', tip: 'Yeux à mi-hauteur de la tête' },
      { title: 'Les cheveux : masse puis mèches', tip: 'Les cheveux ont du volume au-dessus du crâne' },
      { title: 'Le cou et les trapèzes' },
      { title: 'Ombres : côté du visage, sous le nez, sous la lèvre, sous le menton' }
    ]
  };
})();

/* ─────────────────────────────── Oreille */
export const oreille: Guide = {
  id: 'oreille',
  title: 'Oreille',
  level: 'Moyen',
  viewBox: '0 0 240 260',
  layers: [
    <g key="0">
      <line className="gd" x1="30" y1="40" x2="210" y2="40" />
      <line className="gd" x1="30" y1="236" x2="210" y2="236" />
      <text className="lb" x="212" y="43" fontSize="8">sourcils</text>
      <text className="lb" x="212" y="239" fontSize="8">nez</text>
      <ellipse className="cs" cx="132" cy="140" rx="52" ry="98" transform="rotate(14 132 140)" />
    </g>,
    <g key="1">
      <path className="ln" d="M96 52 C150 26 194 66 182 120 C175 160 156 182 140 200 C130 214 126 236 108 240 C92 242 86 226 94 214" />
    </g>,
    <g key="2">
      <path className="ln" d="M126 74 C152 84 158 120 142 152 C134 168 120 176 108 176" />
      <path className="lt" d="M126 74 C116 84 109 96 106 112 M128 76 C140 72 150 76 156 84" />
    </g>,
    <g key="3">
      <path className="ln" d="M106 120 C126 114 140 134 130 156 C122 170 106 168 100 162" />
      <path className="ln" d="M90 140 C100 136 106 150 99 160" />
      <path className="lt" d="M112 178 Q124 174 128 184" />
    </g>,
    <g key="4">
      <path className="lt" d="M102 56 C146 40 172 80 164 122 C160 140 152 156 142 168" />
      <path className="lt" d="M94 214 C104 202 114 196 118 186" />
      <path className="lt" d="M96 52 C90 60 88 70 92 80" />
    </g>,
    <g key="5">
      <path d="M106 120 C126 114 140 134 130 156 C122 170 106 168 100 162 C104 150 104 132 106 120 Z" fill="#4b453e" opacity=".6" />
      <path d="M102 56 C146 40 172 80 164 122 C160 140 152 156 142 168 C150 150 158 128 156 104 C152 72 128 60 102 56 Z" fill="url(#hatch)" />
      <path d="M126 74 C116 84 109 96 106 112 C110 100 118 88 128 80 Z" fill="url(#hatchDense)" />
      <path d="M142 152 C134 168 120 176 108 176 C118 180 132 176 140 166 Z" fill="url(#hatch)" />
    </g>,
    <g key="6">
      <path d="M132 86 C146 98 148 120 140 140" stroke="#fffdf8" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M150 42 C168 52 178 76 176 100" stroke="#fffdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M104 226 Q110 230 116 224" stroke="#fffdf8" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  ],
  steps: [
    { title: 'Entre la ligne des sourcils et celle du nez : un ovale incliné', tip: 'Incliné vers l’arrière, comme la mâchoire' },
    { title: 'Le contour extérieur (hélix) et le lobe' },
    { title: 'L’anthélix : la crête en « Y »' },
    { title: 'La conque, le tragus et l’antitragus' },
    { title: 'L’épaisseur du rebord et le lobe' },
    { title: 'Ombres : la conque est la zone la plus sombre' },
    { title: 'Lumières sur les crêtes' }
  ]
};

/* ─────────────────────────────── Pied de profil */
export const pied: Guide = {
  id: 'pied',
  title: 'Pied (profil extérieur)',
  level: 'Moyen',
  viewBox: '0 0 300 210',
  layers: [
    <g key="0">
      <line className="gd" x1="20" y1="180" x2="290" y2="180" />
      <circle className="cs" cx="72" cy="158" r="22" />
      <circle className="cs" cx="100" cy="92" r="15" />
      <circle className="cs" cx="222" cy="166" r="12" />
      <path className="cs" d="M72 158 L100 92 L222 166 M222 166 L268 172" />
    </g>,
    <g key="1">
      <path className="cs" d="M54 176 L86 84 L118 84 L226 150 L272 172 L270 180 L54 180 Z" />
    </g>,
    <g key="2">
      <path className="ln" d="M112 20 L114 78 C122 100 160 120 210 145 C238 157 262 160 270 170 C273 178 262 182 240 181 L92 181 C70 181 54 176 51 160 C49 146 56 128 66 117 C74 98 80 64 84 20" />
    </g>,
    <g key="3">
      <circle className="lt" cx="100" cy="98" r="7" />
      <path className="lt" d="M228 158 Q238 168 233 181 M249 162 Q257 170 254 181 M214 154 Q222 166 216 181" />
      <path className="lt" d="M84 40 C88 70 92 82 96 86" />
    </g>,
    <g key="4">
      <path d="M90 181 L240 181 C230 176 200 174 160 175 C130 175 100 176 90 181 Z" fill="#4b453e" opacity=".55" />
      <path d="M51 160 C49 146 56 128 66 117 C70 135 70 160 80 178 C68 178 54 174 51 160 Z" fill="url(#hatch)" />
      <path d="M114 78 C122 100 160 120 210 145 C190 140 150 126 120 104 Z" fill="url(#hatchLight)" />
    </g>,
    <g key="5">
      <ellipse cx="170" cy="186" rx="115" ry="7" fill="url(#castShadow)" />
    </g>
  ],
  steps: [
    { title: 'Talon, cheville, base des orteils : trois cercles reliés' },
    { title: 'Le bloc en coin du pied', tip: 'Le pied est un coin : haut à la cheville, bas aux orteils' },
    { title: 'Le contour : jambe, cou-de-pied, orteils, talon' },
    { title: 'Malléole, orteils, tendon d’Achille' },
    { title: 'Ombres : dessous du pied, talon' },
    { title: 'Ombre portée au sol' }
  ]
};

/* ─────────────────────────────── Jean de face */
const hipJ: P = [100, 44], knJ: P = [103, 182], anJ: P = [106, 312];
export const jean: Guide = {
  id: 'jean',
  title: 'Jean (de face)',
  level: 'Moyen',
  viewBox: '0 0 240 340',
  layers: [
    <g key="0">
      <line className="gd" x1="120" y1="10" x2="120" y2="330" />
      <Mirror cx={120}>
        <Tube a={hipJ} b={knJ} r1={20} r2={11} />
        <Tube a={knJ} b={anJ} r1={11} r2={7} />
      </Mirror>
      <path className="cs" d="M74 30 L166 30 L160 86 L120 100 L80 86 Z" />
    </g>,
    <g key="1">
      <Mirror cx={120}>
        <path className="ln" d="M70 30 L120 30 M68 46 L120 46 M70 30 L68 46" />
        <path className="ln" d="M68 46 C62 100 72 150 78 190 C80 240 82 285 84 320 Q101 325 116 320 C115 260 116 200 117 150 C118 120 119 104 120 96" />
      </Mirror>
    </g>,
    <g key="2">
      <path className="lt" d="M120 46 L120 94 M128 46 C128 70 128 84 120 94" />
      <Mirror cx={120}>
        <path className="lt" d="M72 48 C82 62 92 68 104 66 M84 28 L84 48 M100 28 L100 48" />
      </Mirror>
      <circle cx="124" cy="38" r="2.8" fill="#2e2a25" />
    </g>,
    <g key="3">
      <Mirror cx={120}>
        <path className="lt" d="M100 92 L113 84 M98 102 L112 94 M101 112 L114 104" />
        <path className="lt" d="M86 282 Q100 290 114 284 M85 297 Q99 304 115 298 M88 309 Q100 314 114 309" />
        <path className="lt" d="M94 176 Q103 184 112 178" />
      </Mirror>
    </g>,
    <g key="4">
      <Mirror cx={120}>
        <path d="M66 50 C61 100 70 150 76 190 C78 240 80 285 82 318" fill="none" stroke="#2e2a25" strokeWidth=".8" strokeDasharray="3 2" transform="translate(4 0)" />
        <path d="M73 52 C82 64 92 70 104 68" fill="none" stroke="#2e2a25" strokeWidth=".8" strokeDasharray="3 2" />
      </Mirror>
      <path d="M124 48 C124 70 124 82 119 90" fill="none" stroke="#2e2a25" strokeWidth=".8" strokeDasharray="3 2" />
    </g>,
    <g key="5">
      <path d="M120 96 C121 104 122 120 123 150 C124 200 125 260 124 320 L152 322 C152 300 150 260 152 210 C140 190 132 140 120 96 Z" fill="url(#denim)" />
      <path d="M168 50 C174 100 168 150 162 190 C160 240 158 285 156 320 L146 320 C148 280 150 240 152 200 C158 150 162 100 160 50 Z" fill="url(#hatch)" />
      <path d="M68 46 C62 100 72 150 78 190 C80 240 82 285 84 320 L96 320 C94 280 92 240 90 190 C84 150 78 100 78 46 Z" fill="url(#denim)" opacity=".7" />
    </g>
  ],
  steps: [
    { title: 'Les jambes en tubes et le bassin', tip: 'Un vêtement se dessine toujours sur le corps' },
    { title: 'Ceinture et silhouette du pantalon', tip: 'Le jean s’élargit un peu sur les cuisses' },
    { title: 'Braguette, poches, passants, bouton' },
    { title: 'Plis : entrejambe, genoux, bas tassé sur la chaussure' },
    { title: 'Surpiqûres en pointillés' },
    { title: 'Ombres et texture du denim (hachures obliques)' }
  ]
};

/* ─────────────────────────────── Robe */
export const robe: Guide = {
  id: 'robe',
  title: 'Robe évasée',
  level: 'Moyen',
  viewBox: '0 0 240 340',
  layers: [
    <g key="0">
      <line className="gd" x1="120" y1="10" x2="120" y2="330" />
      <line className="gd" x1="78" y1="30" x2="162" y2="30" />
      <ellipse className="cs" cx="120" cy="66" rx="30" ry="40" />
      <path className="cs" d="M92 128 L148 128 L144 160 L120 170 L96 160 Z" />
      <Mirror cx={120}>
        <Tube a={[104, 156]} b={[106, 300]} r1={14} r2={8} />
      </Mirror>
    </g>,
    <g key="1">
      <Mirror cx={120}>
        <path className="ln" d="M96 28 L102 30 L118 64 L120 66 M96 28 C90 44 88 56 89 66 C92 86 98 104 102 118" />
      </Mirror>
      <path className="lt" d="M108 70 Q120 82 132 70" />
    </g>,
    <g key="2">
      <path className="ln" d="M100 116 Q120 124 140 116 L141 126 Q120 134 99 126 Z" />
    </g>,
    <g key="3">
      <Mirror cx={120}>
        <path className="ln" d="M99 126 C90 170 74 230 54 300" />
      </Mirror>
      <path className="ln" d="M54 300 Q66 312 80 302 Q94 292 108 308 Q120 318 132 306 Q146 292 160 302 Q174 312 186 300" />
    </g>,
    <g key="4">
      <path className="lt" d="M108 130 C100 190 90 250 80 302 M118 132 C116 200 112 260 108 308 M126 132 C130 200 132 260 132 306 M134 130 C146 190 154 250 160 302" />
      <Mirror cx={120}>
        <path className="lt" d="M104 92 Q110 98 112 104" />
      </Mirror>
    </g>,
    <g key="5">
      <path d="M108 130 C100 190 90 250 80 302 Q94 292 108 308 C112 260 116 200 118 132 Z" fill="url(#hatch)" />
      <path d="M126 132 C130 200 132 260 132 306 Q146 292 160 302 C154 250 146 190 134 130 Z" fill="url(#hatch)" />
      <path d="M141 126 C150 170 166 230 186 300 Q174 312 160 302 C154 250 146 190 136 130 Z" fill="url(#hatchLight)" />
      <path d="M128 40 C140 52 146 70 142 96 C146 84 148 60 138 40 Z" fill="url(#hatchLight)" />
    </g>,
    <g key="6">
      <path className="lt" d="M54 300 Q66 292 80 302 M108 308 Q120 296 132 306 M160 302 Q174 292 186 300" strokeDasharray="3 3" />
      <path d="M94 160 C86 200 76 250 64 296" stroke="#fffdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M122 150 C123 200 122 260 120 312" stroke="#fffdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  ],
  steps: [
    { title: 'Le corps dessous : épaules, buste, bassin, jambes' },
    { title: 'Bretelles, encolure et corsage ajusté', tip: 'Le haut colle au corps : peu de plis' },
    { title: 'La taille (ceinture)' },
    { title: 'La jupe s’évase depuis la taille, ourlet ondulé' },
    { title: 'Plis qui partent de la taille vers l’ourlet', tip: 'Chaque pli aboutit à un creux de l’ourlet' },
    { title: 'Ombres dans les creux des plis' },
    { title: 'Arrière de l’ourlet et lumières sur les crêtes' }
  ]
};
