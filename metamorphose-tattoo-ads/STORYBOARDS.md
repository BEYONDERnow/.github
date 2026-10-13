# Phase 2 · Storyboards, umgesetzt in `src/storyboards.ts`

Bildauswahl nach Briefing (Abschnitt 7). **Noch nicht am echten Material geprüft**: Die Website war nicht erreichbar. Ausschnitte (`focus`, `zoom`) justiere ich, sobald die Bilder in `assets/website/` liegen.

## Abweichungen vom Briefing (bitte bestätigen)

| Punkt | Briefing | Umsetzung | Grund |
|---|---|---|---|
| Varianten Narbe/Cover-up | A mit Ausgangszustand / B ohne | Parameter `start = mit/ohne`, unabhängig von Hook A/B/C | Hook-Buchstaben und Vorher-Varianten sonst doppelt belegt |
| Dateiname | `MT_V2_Coverup_HookA_916.mp4` | `MT_V2_Coverup_HookA_916_mit.mp4` / `_ohne` bei V1, V2 | Unterscheidung der Varianten |
| Hook C Narbe | «Was, wenn eine Narbe Teil eines Kunstwerks wird?» (9 Wörter) | «Was, wenn eine Narbe Kunst wird?» | max. 7 Wörter |
| Hook C Cover-up | «Was passiert mit einem Tattoo aus einem früheren Leben?» (9) | «Was passiert mit einem alten Tattoo?» | max. 7 Wörter |
| Hook A Cover-up | – | «Ein Cover-up darf mehr sein als wegmachen.» (Hook-Bank A) | Hook-Bank; Storyboard-Satz «Ein Tattoo aus einem früheren Leben?» ist jetzt Hook B |
| Hook B (Bild-Hooks) | Hand streicht über Narben-Tattoo / Stencil über altem Tattoo / Foto→Skizze→Haut / Steffi im Gespräch | Makro-Ausschnitt aus vorhandenem Foto + Satz-Hook | Video-/Prozessmaterial fehlt; Austausch, sobald Clips da sind |
| V3 Szene 15–20 s | «Ich höre die Geschichte – und zeichne den Blick.» (8) | «Ich höre die Geschichte.» | max. 7 Wörter; Fortsetzung im Voiceover |
| V4 «Erst das Gespräch. Dann die Skizze. Dann die Haut.» | eine Einblendung | drei Einblendungen auf Studio2/3/4, Schnitt auf den Beat | max. 7 Wörter je Einblendung |
| V4 «Über 12 Jahre Erfahrung. In einem geschützten Raum.» | eine Einblendung | nur «Über 12 Jahre Erfahrung.» | max. 7 Wörter; «geschützter Raum» im Anzeigentext |
| Prozess-Szenen (Skizze, Stencil, Nadel) | falls nicht vorhanden: Atelier | Atelier-Bilder Studio2–4 | Instagram-Material fehlt |

## Regel «Steffi spätestens ab Sekunde 10»

Ohne Voiceover und ohne ein Bild von Steffi ist sie in **keinem** Video bis Sekunde 10 sichtbar oder hörbar. Lösung: Steffis Voiceover (siehe `audio/TRACKS.md`) **oder** ein Porträt bzw. Clip von Steffi im Atelier, den ich dann bei ca. 7–10 s einsetze.

## Ablauf je Video (9:16, 25 s, 30 fps)

- **V1 Narbe:** 0–3 Hook · 3–7 Narben2 + Nadel-Linie «Der Blick darauf darf sich ändern.» · 7–13 Studio3 «Jedes Motiv entsteht für diese eine Haut.» · 13–19 Narben2 Reveal «Aus Narben werden Zeichen von Stärke.» · 19–22 Studio2 · 22–25 Endkarte
- **V2 Cover-up:** 0–3 Hook · 3–8 Studio4 + Nadel-Linie «Ein Cover-up darf mehr sein als wegmachen.» · 8–15 CoverUp2 Detail→Ganzes «Neu entworfen. Nicht übermalt.» · 15–20 CoverUp2 «Es darf zu dir passen. Heute.» · 20–25 Endkarte
- **V3 Seelentier:** 0–3 Augen-Makro Seelentier2 · 3–8 «Es ist Begleiter. Lehrer. Haltgeber.» · 8–15 Fahrt über Fell/Blick + Nadel-Linie «Darum kopiere ich kein Foto.» · 15–20 Seelentier1-1 «Ich höre die Geschichte.» · 20–25 Endkarte
- **V4 Keine Fotokopie:** 0–3 Seelen (Wolf) · 3–7 Seelen3 «Ich tätowiere Geschichten.» · 7–14 Studio2/3/4 Gespräch/Skizze/Haut · 14–19 Seelen «Über 12 Jahre Erfahrung.» · 19–25 Endkarte mit «Wow. Das bin ich.»

Vorher/Nachher: Ausgangszustand (Narben1, CoverUp1) erscheint nur in 0–3 s der `mit`-Variante, nie gleichzeitig mit dem Ergebnis im selben Frame.
