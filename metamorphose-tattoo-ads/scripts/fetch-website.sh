#!/usr/bin/env bash
# Lädt alle Originalbilder von steffi-voelker.com (alle Seiten aus der Sitemap, ohne Grössen-Suffixe)
# nach assets/website_all/<Jahr>_<Monat>_<Datei>. Danach: python3 -I scripts/crops.py && node scripts/sync-assets.mjs
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/website_all
pages=$(for sm in post page; do curl -fsSL "https://steffi-voelker.com/$sm-sitemap.xml" | grep -oE '<loc>[^<]+' | sed 's/<loc>//'; done | grep -v wp-content)
for p in $pages; do
  curl -fsSL "$p" | grep -oE 'https://steffi-voelker\.com/wp-content/uploads/[^"'"'"' ),]+\.(jpe?g|png|webp)'
  sleep 0.2
done | grep -vE -- '-[0-9]+x[0-9]+\.(jpe?g|png|webp)$' | sort -u | while read -r u; do
  f="assets/website_all/$(echo "$u" | sed -E 's#.*/uploads/##; s#/#_#g')"
  [ -s "$f" ] || { curl -fsSL "$u" -o "$f" && echo "✓ $f" || echo "✗ $u"; }
done
echo "fertig"
