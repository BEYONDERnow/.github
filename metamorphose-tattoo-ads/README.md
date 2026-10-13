# Metamorphose Tattoo · Meta-Video-Ads

Vier Video-Ads (Narbentattoo, Cover-Up, Seelentier, Seelentattoo / Keine Fotokopie) für Steffi Völker, Veltheim AG.
Gebaut mit Remotion: eine Komposition pro Video, Parameter für Hook A/B/C, Format 9:16 oder 4:5 und bei V1/V2 Ausgangszustand `mit`/`ohne`. Insgesamt 36 Fassungen.

## Status (13.10.2026)

| Phase | Stand |
|---|---|
| 0 Werkzeuge | ✅ ffmpeg 6.1, Node 22, Remotion 4.0.535, Python 3.13. Instaloader ist installierbar, aber Instagram ist gesperrt. |
| 1 Material | ❌ **blockiert**: steffi-voelker.com, instagram.com und youcanbook.me sind von der Netzwerkrichtlinie der Cloud-Umgebung gesperrt. Kein Instagram-Export vorhanden. In Google Drive liegen keine Bilder von Steffi. |
| 2 Storyboards | ✅ umgesetzt in `src/storyboards.ts`; Abweichungen siehe `STORYBOARDS.md` |
| 3 Ton | ⏳ 12 Trackvorschläge in `audio/TRACKS.md`; **wartet auf Chris' Wahl bzw. Steffis Voiceover** |
| 4 Bau | ✅ Vorlage, Signatur-Nadel-Linie, Schmetterlings-Endkarte, Ton-Mischung; ⏳ Finale Renders nach Material + Ton |
| 5 QA | ✅ Skript und Bericht `qa/report.md`; Pipeline-Test mit −14,0 LUFS bestanden |

## Was ich von Chris brauche

1. **Material**, eine der Varianten:
   - in der Environment-Einstellung unter Network access `steffi-voelker.com` (und ggf. `instagram.com`) als Allowed domain eintragen ([Anleitung](https://code.claude.com/docs/en/cloud-environments#network-access)), dann lade ich selbst; oder
   - `scripts/fetch-website.sh` lokal ausführen und `assets/website/` in diesen Branch pushen; oder
   - Steffis Instagram-Export (ZIP) bzw. die Bilder in einen Google-Drive-Ordner legen und mir den Namen nennen.
2. **Ton**: Track-Wahl aus `audio/TRACKS.md` (Artlist Pro oder Soundstripe Pro/Business) plus Lizenz-PDF; idealerweise **Steffis Voiceover** (Texte ebenda).
3. **Steffi im Bild**: mind. ein Porträt oder ein kurzer Clip im Atelier, damit sie bis Sekunde 10 sichtbar ist.
4. **Entscheidungen**: Abweichungen in `STORYBOARDS.md` bestätigen und Schreibweise «Völker» bestätigen.

## Bedienung

```bash
npm install
node scripts/sync-assets.mjs        # assets/website → public/img, aktualisiert src/available.json
python3 -I scripts/inventory.py     # assets/inventory.csv
python3 -I scripts/logo_color.py public/img/logo-dunkellila.png   # Hex in src/theme.ts eintragen
npm run studio                      # Vorschau im Browser
npm run render:all                  # alle 36 Fassungen → out/ (Filter möglich: node scripts/render-all.mjs V2)
bash scripts/qa.sh                  # Messwerte + Kontaktbögen → qa/
```

In der Cloud-Umgebung: `REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell` (wird im Render-Skript automatisch gesetzt).

Fehlende Bilder erscheinen als beschriftete Platzhalter («MATERIAL FEHLT · Datei»). Ohne Musik heissen Renders `*_PREVIEW_STUMM.mp4` und sind nicht für Ads gedacht.

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
