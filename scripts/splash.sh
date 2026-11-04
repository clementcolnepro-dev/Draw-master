#!/bin/sh
# Écrans de lancement iOS (apple-touch-startup-image)
set -e
INNER=$(sed -e '1d' -e '$d' public/favicon.svg)
mkdir -p public/splash
for s in 750x1334 1125x2436 1170x2532 1179x2556 1284x2778 1290x2796 828x1792 1242x2688; do
  w=${s%x*}; h=${s#*x}; i=$((w*45/100)); x=$(((w-i)/2)); y=$((h*36/100-i/2)); ty=$((y+i+w/9)); fs=$((w/14))
  cat > /tmp/splash.svg <<SVG
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="$w" height="$h">
<rect width="$w" height="$h" fill="#1c1b19"/>
<g transform="translate($x $y) scale($(echo "scale=4;$i/512"|bc))">$INNER</g>
<text x="$((w/2))" y="$ty" fill="#efe8da" font-family="Georgia, serif" font-size="$fs" text-anchor="middle">Draw Master</text>
<text x="$((w/2))" y="$((ty+fs))" fill="#c9a96a" font-family="Georgia, serif" font-size="$((fs*45/100))" text-anchor="middle" letter-spacing="4">ÉCOLE DE DESSIN RÉALISTE</text>
</svg>
SVG
  rsvg-convert /tmp/splash.svg -o public/splash/splash-$s.png
done
