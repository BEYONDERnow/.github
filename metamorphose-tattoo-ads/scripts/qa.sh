#!/usr/bin/env bash
# Prüft jede Datei in out/: Format, Grösse < 30 MB, Lautheit, und erstellt einen Kontaktbogen (5 Frames) in qa/.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p qa/contact
printf "| Datei | Auflösung | Dauer | MB | LUFS | dBTP |\n|---|---|---|---|---|---|\n" > qa/measurements.md
for f in out/*.mp4; do
  n=$(basename "$f" .mp4)
  res=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$f" | sed "s/x$//")
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  mb=$(awk "BEGIN{printf \"%.1f\", $(stat -c %s "$f")/1048576}")
  if ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$f" | grep -q .; then
    ln=$(ffmpeg -nostats -i "$f" -af ebur128=peak=true -f null - 2>&1 | tail -12)
    lufs=$(echo "$ln" | awk '/I:/{print $2}' | tail -1); tp=$(echo "$ln" | awk '/Peak:/{print $2}' | tail -1)
  else lufs="stumm"; tp="–"; fi
  echo "| $n | $res | ${dur%.*} s | $mb | $lufs | $tp |" >> qa/measurements.md
  # Kontaktbogen: Frame 1, 3 s, 8 s, 15 s, Endkarte
  ffmpeg -v error -y -i "$f" -filter_complex "select='eq(n\,0)+eq(n\,89)+eq(n\,240)+eq(n\,450)+eq(n\,720)',scale=300:-1,tile=5x1:padding=8:color=white,split[a][b];[a]palettegen=max_colors=192[p];[b][p]paletteuse=dither=sierra2_4a" -frames:v 1 -fps_mode vfr "qa/contact/${n}.png"
done
cat qa/measurements.md
