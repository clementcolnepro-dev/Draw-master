#!/bin/sh
# Génère les icônes PNG à partir de public/favicon.svg (nécessite rsvg-convert)
set -e
mkdir -p public/icons
rsvg-convert -w 192 -h 192 public/favicon.svg -o public/icons/icon-192.png
rsvg-convert -w 512 -h 512 public/favicon.svg -o public/icons/icon-512.png
rsvg-convert -w 180 -h 180 public/favicon.svg -o public/icons/apple-touch-icon.png
# Maskable : fond plein, motif réduit dans la zone de sécurité
sh scripts/splash.sh 2>/dev/null || true
sed 's/rx="112"/rx="0"/' public/favicon.svg > /tmp/mask.svg
rsvg-convert -w 512 -h 512 /tmp/mask.svg -o public/icons/icon-maskable-512.png
