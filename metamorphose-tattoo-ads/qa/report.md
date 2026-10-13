# Qualitätsprüfung (Abschnitt 9)

**Stand 13.10.2026: noch keine auslieferbaren Videos.** Material und Ton fehlen (siehe README). Geprüft ist bisher nur die Vorlage: Layout-Standbilder und ein Pipeline-Test mit Testton. Der Testton wurde nicht ausgeliefert und ist gelöscht.

| Prüfpunkt | Vorlage | V1 | V2 | V3 | V4 |
|---|---|---|---|---|---|
| Frame 1 zeigt Bild + Hook-Text; Musik ab Frame 1 | ✅ Text ab Frame 0 voll sichtbar; Ton startet bei 0 | ⏳ | ⏳ | ⏳ | ⏳ |
| Texte in Safe Zone (y 270–1250 bei 9:16) | ✅ Textblock auf Safe Zone begrenzt | ⏳ | ⏳ | ⏳ | ⏳ |
| Stumm verständlich (eingebrannter Text) | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| Steffi/Stimme spätestens ab 10 s | ❌ braucht VO oder Steffi-Bild | ❌ | ❌ | ❌ | ❌ |
| Kein Vorher/Nachher nebeneinander | ✅ Ausgangszustand nur 0–3 s, Vollbild | ⏳ | ⏳ | – | – |
| Ich-Form / 3. Person, keine Unterstellung | ✅ | ✅ | ✅ | ✅ | ✅ |
| Max. 7 Wörter je Einblendung | ✅ | ✅ | ✅ | ✅ | ✅ |
| Musiklizenz abgelegt; −14 LUFS ±1 | ✅ Pipeline-Test: −14,0 LUFS | ⏳ | ⏳ | ⏳ | ⏳ |
| Endkarte: «Erstgespräch buchen», Veltheim AG, steffi-voelker.com | ✅ | ✅ | ✅ | ✅ | ✅ |
| Schweizer Rechtschreibung, «Steffi Völker» | ✅ | ✅ | ✅ | ✅ | ✅ |
| H.264 · yuv420p · 30 fps · AAC 192k · faststart · < 30 MB | ✅ Test: 1,5 MB | ⏳ | ⏳ | ⏳ | ⏳ |
| Kontaktbogen (5 Frames) in `qa/contact/` | Skript bereit (`scripts/qa.sh`) | ⏳ | ⏳ | ⏳ | ⏳ |
| Logo-Farbe exakt aus Logo | ❌ Platzhalter #3D1F4E | | | | |

Messwerte schreibt `scripts/qa.sh` nach jedem Render nach `qa/measurements.md`. Der QA-Loop läuft so: rendern → `qa.sh` → Kontaktbögen sichten → korrigieren → erneut rendern, bis alle Punkte ✅ sind.
