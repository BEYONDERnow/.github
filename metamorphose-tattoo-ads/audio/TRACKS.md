# Phase 3 · Ton (Stand 13.10.2026)

## Eingesetzt

Quelle: **Mixkit**. Die Stock Music Free License erlaubt ausdrücklich «Online marketing ads» und «Social Media video posts» ohne Namensnennung. Nicht erlaubt sind TV/Radio, CDs/DVDs, Games, Remixes als reines Musikstück und die Registrierung bei Content-ID-Diensten. Die Lizenz liegt als PDF in `audio/licenses/Mixkit_Stock_Music_Free_License_2026-10-13.pdf`, abgerufen am 13.10.2026.

| Video | Track | Künstler | Mixkit-Genre | Ausschnitt | Datei |
|---|---|---|---|---|---|
| V1 Narbe | Possible Dreams (#599) | Eugenio Mininni | Classical | ab 1:04.78 | `audio/music/V1_Narbe.flac` |
| V2 Cover-up | Miss You (#592) | Eugenio Mininni | Film Score | ab 0:34.72 | `audio/music/V2_Coverup.flac` |
| V3 Seelentier | Piano Reflections (#22) | Ahjay Stelino | Corporate | ab 1:30.18 | `audio/music/V3_Seelentier.flac` |
| V4 Keine Fotokopie | Silent Descent (#614) | Eugenio Mininni | Film Score | ab 1:47.38 | `audio/music/V4_Seelentattoo.flac` |

Originaldateien: `audio/source/` (Links: https://assets.mixkit.co/music/<ID>/<ID>.mp3)

**So ausgewählt:** 26 Kandidaten aus Mixkit (Stimmungen emotional, hopeful und sad, Tags Piano, Cello, Strings), automatisch ausgewertet mit librosa. Kriterien:

- wenig Perkussion (HPSS-Anteil ≤ 6 %)
- hörbar ab Frame 1 (≥ −32 dB)
- keine Pause im Fenster
- erster Lift zwischen 2,5 und 4,5 s (+4 bis +8 dB)
- zweiter Lift beim Ergebnis-Reveal (+5 bis +10 dB)

Danach habe ich den Startpunkt so verschoben, dass Beat-Onsets auf die Schnittpunkte fallen (Beat-Score V3: 2,3 → 13,6).

**Nicht menschlich angehört.** Die Auswahl beruht auf Signalanalyse. Bitte jede Fassung einmal mit Kopfhörer und einmal über den Handy-Lautsprecher prüfen. Ein Tausch ist einfach: neue Datei nach `audio/music/<Video>.flac` legen und `npm run render:all` ausführen.

## Mischung

Musik ab Frame 1, Ausblende ab 23,5 s, Lautheit −14 LUFS integriert, True Peak −1 dBTP, AAC 192 kbit/s (`scripts/render-all.mjs`). Ein Voiceover unter `audio/vo/<Video>.wav` wird automatisch mit −11 dB Ducking eingemischt.

## Offen: Steffis Voiceover (stärkster Hebel)

Texte zum Einsprechen (Handy, ruhiger Raum, je ca. 20 s):

- **V1 Narbe:** «Die Narbe bleibt. Aber der Blick darauf darf sich ändern. Ich entwerfe jedes Motiv für genau diese Haut – damit du dich ansiehst und denkst: Wow. Das bin ich.»
- **V2 Cover-up:** «Manche Tattoos gehören zu einem früheren Leben. Ein Cover-up darf mehr sein als wegmachen. Ich entwerfe etwas Neues – etwas, das heute zu dir passt.»
- **V3 Seelentier:** «Ein Seelentier ist kein Haustier. Es ist Begleiter, Lehrer, Haltgeber. Darum kopiere ich kein Foto. Ich höre die Geschichte – und zeichne den Blick.»
- **V4 Keine Fotokopie:** «Ich tätowiere keine Fotos. Ich tätowiere Geschichten. Erst das Gespräch, dann die Skizze, dann die Haut. Damit du am Ende sagst: Wow. Das bin ich. Und ich bin schön.»

## Alternativen mit kostenpflichtiger Lizenz (falls Chris aufwerten will)

Artlist Music & SFX Pro oder Soundstripe Pro/Business decken bezahlte Ads ab. Kandidaten aus der ersten Recherche: «Hope on the Horizon» (Alon Peretz), «A Tender Heart» (The David Roy Collective), «Tender Smile» (G-Yerro), alle auf Artlist.
