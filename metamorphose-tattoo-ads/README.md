# Metamorphose Tattoo · Meta-Video-Ads

Vier Video-Ads (Narbentattoo, Cover-Up, Seelentier, Seelentattoo / Keine Fotokopie) für Steffi Völker, Veltheim AG.
Gebaut mit Remotion: eine Komposition pro Video, Parameter für Hook A/B/C, Format 9:16 oder 4:5 und bei V1/V2 Ausgangszustand `mit`/`ohne`. Insgesamt 36 Fassungen.

## Status (13.10.2026)

| Phase | Stand |
|---|---|
| 0 Werkzeuge | ✅ ffmpeg 6.1, Node 22, Remotion 4.0.535, Python 3.13, librosa, Playwright |
| 1 Material | ✅ 91 Website-Bilder in `assets/website_all/`, Inventar `assets/inventory.csv`, 19 saubere Ausschnitte in `assets/selected/`. ⚠️ Instagram ist aus der Cloud nicht abrufbar (Login-Pflicht); Steffis Datenexport würde Reels und Prozessclips liefern. |
| 2 Storyboards | ✅ an das echte Material angepasst, siehe `STORYBOARDS.md` |
| 3 Ton | ✅ 4 Mixkit-Tracks, deren Lizenz Online-Werbung erlaubt (PDF in `audio/licenses/`), auf die Schnitte ausgerichtet; siehe `audio/TRACKS.md`. ⏳ Steffis Voiceover fehlt noch (optional, stärkster Hebel). |
| 4 Bau | ✅ 36 Fassungen in `out/` (V1–V4 × Hook A/B/C × 9:16/4:5, V1/V2 zusätzlich mit/ohne Ausgangszustand) |
| 5 QA | ✅ `qa/report.md`, Messwerte `qa/measurements.md`, Kontaktbögen `qa/contact/` |

## Offene Freigaben für Chris

1. Fassungen ansehen und anhören, vor allem die Musik, die maschinell ausgewählt wurde.
2. Steffi: Bildrechte bestätigen. Sie ist auf allen Bildern Urheberin; abgebildete Kundinnen und Kunden haben ihre Tattoos auf der Website veröffentlicht. Für Werbung sollte Steffi die Einwilligung der Kundschaft bestätigen.
3. Optional: Voiceover von Steffi (`audio/TRACKS.md`) und Instagram-Datenexport für echte Prozess-Clips.
4. Upload in den Ads Manager erst nach Freigabe; neue Anzeigen pausiert anlegen.

## Bedienung

```bash
npm install
bash scripts/fetch-website.sh       # alle Website-Bilder → assets/website_all
python3 -I scripts/crops.py         # saubere Ausschnitte → assets/selected
node scripts/sync-assets.mjs        # assets/selected → public/img, aktualisiert src/available.json
python3 -I scripts/inventory.py     # assets/inventory.csv
python3 -I scripts/logo_color.py assets/selected/logo-dunkellila.png   # → #6E4F69 (in src/theme.ts)
npm run studio                      # Vorschau im Browser
npm run render:all                  # alle 36 Fassungen → out/ (Filter möglich: node scripts/render-all.mjs V2)
bash scripts/qa.sh                  # Messwerte + Kontaktbögen → qa/
```

In der Cloud-Umgebung: `REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell` (wird im Render-Skript automatisch gesetzt).

Fehlende Bilder erscheinen als beschriftete Platzhalter («MATERIAL FEHLT · Datei»). Ohne Musik heissen Renders `*_PREVIEW_STUMM.mp4` und sind nicht für Ads gedacht.

Die Renders (`out/`) sind nicht im Git, weil zu gross. Die Auslieferung erfolgt über Google Drive (siehe Übergabe).

## Anzeigentexte (Primärtext, ohne Merkmals-Ansprache)

| Video | Primärtext | Titel |
|---|---|---|
| V1 Narbe | Eine Narbe erzählt eine Geschichte. Steffi entwirft ein Motiv, das diese Geschichte weiterschreibt – individuell für deine Haut. Über 12 Jahre Erfahrung, Atelier in Veltheim AG. | Narben-Tattoo, individuell entworfen |
| V2 Cover-up | Manche Tattoos gehören zu einem früheren Lebensabschnitt. Ein Cover-up darf mehr sein als wegmachen: Steffi entwirft ein neues Motiv, das zu dir passt. | Cover-up, neu entworfen |
| V3 Seelentier | Ein Seelentier ist Begleiter, Lehrer, Haltgeber. Darum kopiert Steffi kein Foto. Sie hört die Geschichte und entwirft ein Tattoo mit Blick und Charakter. | Seelentier-Tattoo statt Fotokopie |
| V4 Keine Fotokopie | Keine Fotokopie. Jedes Tattoo entsteht aus Gespräch, Zuhören und deiner Geschichte. Über 12 Jahre Erfahrung, ohne Laufkundschaft, in Veltheim AG. | Ein Tattoo, das nur zu dir gehört |

Einsatzvorschlag: V2 und V3 als Test in «K | Leads | Neukunden Video | CH», V1 und V4 ins Retargeting. Neue Anzeigen werden pausiert angelegt. Uploads, Budget- und Statusänderungen erst nach Freigabe durch Chris.

## Ordner

`assets/` Material + `inventory.csv` · `audio/` Musik, Voiceover, `licenses/` · `src/` Remotion · `scripts/` Werkzeuge · `out/` Renders (nicht im Git) · `qa/` Bericht, Messwerte, Kontaktbögen
