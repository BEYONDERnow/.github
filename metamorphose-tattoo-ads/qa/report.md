# Qualitätsprüfung (Abschnitt 9) · 13.10.2026

36 Fassungen in `out/`: V1–V4 × Hook A/B/C × 9:16/4:5, bei V1 und V2 zusätzlich mit und ohne Ausgangszustand. Messwerte aller Dateien stehen in `qa/measurements.md`, Kontaktbögen mit je 5 Frames (0 s, 3 s, 8 s, 15 s, 24 s) in `qa/contact/`.

## Ablauf der Prüfschleife

1. Rendern → `scripts/qa.sh` → Kontaktbögen sichten.
2. **Runde 1:** Text lag über Steffis Gesicht. Lösung: In Porträt-Szenen steht der Text oben im hellen Himmel, die Namenszeile unten. Kontrast auf hellen Bildern: weicher Schatten-Hof hinter dem Text. Das Logo auf der Endkarte habe ich vergrössert.
3. **Runde 2:** Der True Peak lag bei einzelnen Fassungen über −1 dBTP (bis −0,9). Lösung: Zwei-Pass-Loudnorm (linear) plus Limiter (`scripts/mix.mjs`).
4. **Runde 3:** Makro-Zooms über 1,6× zeigten Hochskalierungs-Artefakte (Dexter, Leopardenauge, Kira). Lösung: Zoom auf höchstens 1,45× begrenzt, V2 und V3 neu gerendert.

## Prüfpunkte

| Prüfpunkt | V1 Narbe | V2 Cover-up | V3 Seelentier | V4 Keine Fotokopie |
|---|---|---|---|---|
| Frame 1 zeigt Bild und Hook-Text; Musik ab Frame 1 | ✅ | ✅ | ✅ | ✅ |
| Texte in der Safe Zone (9:16: y 270–1250 px), stumm verständlich | ✅ | ✅ | ✅ | ✅ |
| Steffi spätestens ab Sekunde 10 (Porträt + Namenszeile) | ✅ 7–10 s | ✅ 6–9 s | ✅ 7–10 s | ✅ 7–9,5 s (Hook B ab 0 s) |
| Kein Vorher/Nachher nebeneinander im selben Frame | ✅ Brandnarbe nur 0–3 s, ohne Ergebnis | ✅ Stencil-Moment 0–3 s; Galerie-Einsätze weggeschnitten | ✅ | ✅ |
| Ich-Form oder dritte Person, keine Unterstellung | ✅ | ✅ | ✅ | ✅ |
| Höchstens 7 Wörter pro Einblendung | ✅ | ✅ | ✅ | ✅ |
| Musiklizenz abgelegt (`audio/licenses/`) | ✅ Mixkit | ✅ | ✅ | ✅ |
| Lautheit −14 LUFS ±1 / True Peak ≤ −1 dBTP | ✅ | ✅ | ✅ | ✅ |
| Endkarte: Logo, «Erstgespräch buchen», Veltheim AG, steffi-voelker.com | ✅ | ✅ | ✅ | ✅ + «Wow. Das bin ich.» |
| Schweizer Rechtschreibung, «Steffi Völker» | ✅ | ✅ | ✅ | ✅ |
| H.264 · yuv420p · 30 fps · AAC 192 kbit/s · faststart · < 30 MB | ✅ | ✅ | ✅ | ✅ |
| Kontaktbogen in `qa/` | ✅ | ✅ | ✅ | ✅ |

## Grenzen (offen, nicht technisch prüfbar)

- **Musik nicht menschlich angehört.** Die Auswahl beruht auf Signalanalyse (Perkussion, Lifts, Beat-Lage). Bitte auf dem Handy-Lautsprecher und mit Kopfhörer prüfen.
- **Bildschärfe:** Die Website liefert die Bilder in höchstens 1284 px, als Komposit. Die Ausschnitte sind 1,3–2,1× hochskaliert. Auf dem Handy wirkt das weich, aber sauber. Mit Steffis Originalfotos oder dem Instagram-Export wird es schärfer.
- **Einwilligung:** Die Tattoos stammen aus Steffis öffentlicher Galerie. Ob die Kundinnen und Kunden der Nutzung in bezahlter Werbung zugestimmt haben, muss Steffi bestätigen.
- **Meta-Prüfung:** Die Fassungen V1 `_mit` (Brandnarbe sichtbar) und V2 `_mit` (altes Tattoo unter dem Stencil) sind die Varianten mit Ablehnungsrisiko. Die `_ohne`-Varianten sind die sichere Rückfalloption.
