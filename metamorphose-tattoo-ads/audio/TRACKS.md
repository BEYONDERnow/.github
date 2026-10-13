# Phase 3 · Musikvorschläge (Stand 13.10.2026)

**Status: wartet auf Chris' Wahl.** Ich habe keinen Track angehört. Die Plattformen (artlist.io, soundstripe.com usw.) sind aus der Produktionsumgebung gesperrt. Angaben zu BPM und Instrumenten stammen aus Suchergebnissen. Bitte vor dem Kauf anhören und die BPM auf der Track-Seite prüfen.

## Empfehlung

1. **Steffis Voiceover** (Handy, ruhiger Raum, 30–40 s, Texte unten) und **ein** Pianotrack für alle vier Videos. So bleibt der Markenklang gleich und es braucht nur eine Lizenz.
2. Lizenz: **Artlist Music & SFX Pro** (deckt laut Preisseite «Paid ads» und «Client work» ab) oder **Soundstripe Pro/Business** (Pro deckt «paid ads, boosted posts» ab, Business zusätzlich mit Freistellung/Indemnification). Artlist «Social» und Soundstripe «Personal» reichen **nicht**.
3. Die **Meta Sound Collection** ist für Werbung freigegeben, aber an Meta gebunden und lässt sich nur im Ads Manager einsetzen. Dann wäre kein Schnitt auf den Beat möglich. Ich setze sie nur als Rückfalloption ein.

## Kandidaten

| Video | Track | Quelle | BPM (laut Listing) | Instrumente/Stimmung | Link |
|---|---|---|---|---|---|
| V1 Narbe | Hope on the Horizon – Alon Peretz | Artlist | 80 | Piano · sad, peaceful, hopeful | https://artlist.io/song/9421/hope-on-the-horizon |
| V1 Narbe | Winds of Hope (Creative Cut – Piano) – Romeo | Artlist | 80 | Piano · sad, serious, hopeful | https://artlist.io/royalty-free-music/song/winds-of-hope-creative-cut-piano/137756 |
| V1 Narbe | A Tender Heart – The David Roy Collective | Artlist | 70 | Piano, Streicher · uplifting, hopeful | https://artlist.io/song/64465/a-tender-heart |
| V2 Cover-up | A Tender Heart – The David Roy Collective | Artlist | 70 | Piano, Streicher, Aufbau für den Reveal | https://artlist.io/song/64465/a-tender-heart |
| V2 Cover-up | Tender Smile – G-Yerro | Artlist | 71 | Piano, Streicher · uplifting, peaceful | https://artlist.io/royalty-free-music/song/tender-smile/34739 |
| V2 Cover-up | Wayfair | Soundstripe | 75 | Piano, Glocken · hopeful, calm | https://www.soundstripe.com/library/songs/17944 |
| V3 Seelentier | Tenderness – Michele Nobler | Artlist | ? | Solo-Piano · sad, peaceful, hopeful | https://artlist.io/royalty-free-music/song/tenderness/11543 |
| V3 Seelentier | The Wind of Hope | Melody Loops | 75 | Piano über Streichern · tender | https://www.melodyloops.com/tracks/the-wind-of-hope/ |
| V3 Seelentier | + Ebene: Cello, Hopeful Short Loop (A, B, E) | Artlist SFX | 80 | Cello-Loop als Ergänzung | https://artlist.io/sfx/track/cello-hopeful-short-loop-notes-a-b-e-80-bpm/48292 |
| V4 Keine Fotokopie | Hope – DaniHaDani | Artlist | 69 | Piano | https://artlist.io/royalty-free-music/song/hope/4865 |
| V4 Keine Fotokopie | Hope on the Horizon – Alon Peretz | Artlist | 80 | Piano | https://artlist.io/song/9421/hope-on-the-horizon |
| V4 Keine Fotokopie | Speak From the Heart | Shockwave-Sound | 55 (unter Zielbereich) | Piano + Cello · tender | https://www.shockwave-sound.com/stock-music-track/24788/speak-from-the-heart |

Melody Loops und Shockwave-Sound: Lizenzstufe für bezahlte Social Ads vor dem Kauf prüfen.

## Ablage, sobald gewählt

- Musik: `audio/music/V1_Narbe.wav` (bzw. `V2_Coverup`, `V3_Seelentier`, `V4_Seelentattoo`). Bei Bedarf schneide ich den Einstieg so, dass der erste Lift bei 2–4 s liegt.
- Voiceover: `audio/vo/V1_Narbe.wav` usw.
- Lizenz-Zertifikat (PDF/Screenshot) je Track: `audio/licenses/`.
- `npm run render:all` mischt automatisch: Musik ab Frame 1, unter der Stimme −11 dB (Ducking), −14 LUFS, −1 dBTP.

## Voiceover-Texte für Steffi (Ich-Form, je ca. 20–25 s gesprochen)

- **V1 Narbe:** «Die Narbe bleibt. Aber der Blick darauf darf sich ändern. Ich entwerfe jedes Motiv für genau diese Haut – damit du dich ansiehst und denkst: Wow. Das bin ich.»
- **V2 Cover-up:** «Manche Tattoos gehören zu einem früheren Leben. Ein Cover-up darf mehr sein als wegmachen. Ich entwerfe etwas Neues – etwas, das heute zu dir passt.»
- **V3 Seelentier:** «Ein Seelentier ist kein Haustier. Es ist Begleiter, Lehrer, Haltgeber. Darum kopiere ich kein Foto. Ich höre die Geschichte – und zeichne den Blick.»
- **V4 Keine Fotokopie:** «Ich tätowiere keine Fotos. Ich tätowiere Geschichten. Erst das Gespräch, dann die Skizze, dann die Haut. Damit du am Ende sagst: Wow. Das bin ich. Und ich bin schön.»

(V2–V4 sind Entwürfe nach Steffis Website-Sätzen. Bitte von Steffi freigeben lassen.)
