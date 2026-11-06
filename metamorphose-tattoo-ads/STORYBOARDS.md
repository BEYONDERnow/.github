# Phase 2 · Storyboards mit echtem Material

Umgesetzt in `src/storyboards.ts`. Die Bilder stammen von steffi-voelker.com: 91 Originale, Inventar in `assets/inventory.csv`. Die Ausschnitte erzeugt `scripts/crops.py` nach `assets/selected/`.

## Materiallage

- Die Briefing-Dateien (`Narben1.jpg`, `CoverUp1.jpg`, `Seelen*.jpg` usw.) sind auf der Website nur **150 × 150 px** gross und damit unbrauchbar.
- Ersatz sind die Galerie-Bilder von 2026/04 mit 1284 px. Das sind Komposite mit Rahmen, Wasserzeichen, Titel und einem **eingeklebten Vorher-Bild**, also Vorher/Nachher nebeneinander. Ich verwende nur Ausschnitte ohne Vorher-Einsatz, Wasserzeichen und Titel, mit Lanczos hochskaliert (Faktor 1,3–2,1) und leicht nachgeschärft.
- Prozessbilder: Stencil über altem Tattoo (`20251206`), Linework über altem Tattoo (`20251207`), Nadel bei der Arbeit (`Banner5`).
- Steffi: Porträt `Steffi_Voelker.jpg`, 2000 × 1333 px.
- Instagram war nicht nutzbar: Anonyme Zugriffe aus dem Rechenzentrum werden mit Login-Pflicht und Rate-Limit beantwortet. Mit Steffis Datenexport lassen sich Reels und Prozessclips nachrüsten.

## Ablauf (9:16, 25 s, 30 fps; 4:5 gleiche Sequenz)

| Video | 0–3 s Hook | danach |
|---|---|---|
| V1 Narbe | mit: Brandnarbe · ohne: Phoenix-Detail (B: Koi-Detail) | 3–7 Tattoo auf Brandnarbe + Nadel-Linie «Der Blick darauf darf sich ändern.» · 7–10 **Steffi** «Ich entwerfe für genau diese Haut.» · 10–13 Nadel «Jedes Motiv entsteht neu.» · 13–17 Phoenix «Aus Narben werden Zeichen von Stärke.» · 17–20 Koi «Individuell und ästhetisch.» · 20–25 Endkarte |
| V2 Cover-up | mit: Stencil über altem Tattoo · ohne: Leopardenauge | 3–6 Linework + Nadel-Linie «Neu entworfen. Nicht übermalt.» · 6–9 **Steffi** «Ich entwerfe, was heute zu dir passt.» · 9–11,5 Nadel «Schicht für Schicht.» · 11,5–17 Leopard Detail→Ganzes «Es darf zu dir passen. Heute.» · 17–20 Löwe, Panther · 20–25 Endkarte |
| V3 Seelentier | Kira (Chihuahua) Augen-Makro (B: Dexter) | 3–7 Kira «Es ist Begleiter. Lehrer. Haltgeber.» · 7–10 **Steffi** «Darum kopiere ich kein Foto.» · 10–14 Wolf-Entwurf + Nadel-Linie «Ich höre die Geschichte.» · 14–17,5 Dexter «Und zeichne den Blick.» · 17,5–20 Adler · 20–25 Endkarte |
| V4 Keine Fotokopie | A: Löwe · B: Steffi · C: Adler | 3–7 Entwurf Pferd/Frau «Ich tätowiere Geschichten.» · 7–9,5 **Steffi** «Erst das Gespräch.» · 9,5–12 Wolf-Entwurf «Dann die Skizze.» · 12–14 Nadel «Dann die Haut.» · 14–19 Atelier «Über 12 Jahre Erfahrung.» · 19–25 Endkarte «Wow. Das bin ich.» |

## Abweichungen vom Briefing

| Punkt | Briefing | Umsetzung | Grund |
|---|---|---|---|
| Bilder | Narben1/2, CoverUp1/2, Seelen, Seelentier1/2 | Galerie-Ausschnitte (siehe oben) | Briefing-Dateien nur 150 px |
| Varianten Narbe/Cover-up | A mit / B ohne Ausgangszustand | Parameter `mit`/`ohne`, unabhängig von Hook A/B/C; Dateiname `_mit`/`_ohne` | Hook-Buchstaben sonst doppelt belegt |
| Ausgangszustand | Narben1 / CoverUp1 | Brandnarbe (V1), Stencil über altem Tattoo (V2), nur 0–3 s, nie im selben Frame wie das Ergebnis | keine Vorher/Nachher-Gegenüberstellung |
| Hook B (Bild) | Hand über Narbe, Stencil, Foto→Skizze→Haut, Steffi im Gespräch | Makro-Ausschnitte; bei V2 echter Stencil-Moment; bei V4 Steffi-Porträt | kein Videomaterial |
| Hook C Narbe / Cover-up | 9 Wörter | «Was, wenn eine Narbe Kunst wird?» / «Was passiert mit einem alten Tattoo?» | max. 7 Wörter |
| Steffi ab 10 s | – | Porträt + Namenszeile bei 6–10 s in allen Videos | Regel erfüllt ohne Voiceover |
| V4 «Über 12 Jahre … geschützten Raum» | eine Einblendung | nur «Über 12 Jahre Erfahrung.»; «geschützter Raum» steht im Anzeigentext | max. 7 Wörter |
| Seelen3 (Drache mit Lotus) | V4 3–7 s | Entwurf Pferd/Frau (1284 px) | Drache nur in 600 px vorhanden |
