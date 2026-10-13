#!/usr/bin/env bash
# Lädt Steffis Website-Bilder in Originalgrösse nach assets/website/ (lokal auf dem Mac ausführen,
# falls die Produktionsumgebung steffi-voelker.com nicht erreicht). Danach: node scripts/sync-assets.mjs
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/website
U=https://steffi-voelker.com/wp-content/uploads
urls=(
  $U/2024/10/logo-dunkellila.png
  $U/2026/02/CoverUp1.jpg $U/2026/02/CoverUp2.jpg
  $U/2026/02/Narben1.jpg $U/2026/02/Narben2.jpg
  $U/2026/02/Seelen.jpg $U/2026/02/Seelen3.jpg
  $U/2026/02/Seelentier2.jpg $U/2026/02/Seelentier1-1.jpg
  $U/2024/10/Studio2.jpg $U/2024/10/Studio3.jpg $U/2024/10/Studio4.jpg
)
# Zusätzlich alle Bilder der Galerie-Seiten, ohne Grössen-Suffix (-300x300 usw.)
for page in https://steffi-voelker.com/tattoos/ https://steffi-voelker.com/tattoo-design/ https://steffi-voelker.com/; do
  while read -r u; do urls+=("$u"); done < <(curl -fsSL "$page" | grep -oE 'https://steffi-voelker\.com/wp-content/uploads/[^"'"'"' )]+\.(jpe?g|png|webp)' \
    | sed -E 's/-[0-9]+x[0-9]+(\.(jpe?g|png|webp))$/\1/' | sort -u)
done
printf '%s\n' "${urls[@]}" | sort -u | while read -r u; do
  f="assets/website/$(basename "$u")"
  [ -s "$f" ] || { curl -fsSL "$u" -o "$f" && echo "✓ $f" || echo "✗ $u"; sleep 0.3; }
done
# Website-CSS: Schriften und Farben
curl -fsSL https://steffi-voelker.com/ | grep -oE "font-family:[^;\"]+|#[0-9a-fA-F]{6}\b" | sort | uniq -c | sort -rn | head -30 > assets/website/css-auszug.txt
echo "fertig – siehe assets/website/"
