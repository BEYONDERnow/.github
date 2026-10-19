# Skill swissai-erklaervideo

Stand: 2026-10-19. Dokumentation zum Skill, seiner Ablage und dem Update-Ablauf.

## Was der Skill macht

Macht aus einem swissAI-Blogartikel ein Erklärvideo im swissAI-Design: Effekte, Soundeffekte, Musik, Untertitel, Titelbild und LinkedIn-Texte. Drei Modi:

| Modus | Wann | Timing aus |
|---|---|---|
| Mit Stimme | Chris hat das Sprechskript aufgenommen | Aufnahme (`prep_audio.py`) |
| Text-Modus | Keine Aufnahme, schnell oder serienmässig | Skript (`prep_text.py`) |
| Auto-Modus | Blogvideos in Serie, ohne Stimme | `spec.json` + `make.py` |

Ausgabe: MP4 in 4:5 lang und kurz, 9:16 kurz, 16:9 lang, Titelbilder, SRT-Untertitel, Sprechskript, Posts und YouTube-Text. Synthetische Stimmen sind abgelehnt: echte Stimme oder Text-Modus.

## Inhalt

```
swissai-erklaervideo/
  SKILL.md                 Ablauf, Modi, goldene Regeln
  references/              auto-modus, klangprofile, effekte, text-modus,
                           storyboard-api, design-system, audio,
                           aufnahme-leitfaden, linkedin-texte, setup, learnings
  scripts/                 engine, build, make, auto_story, audio_fx,
                           prep_audio, prep_text, setup.sh
  assets/                  logo-verlauf.svg, beispiel/storyboard.py
```

## Wo der Skill liegt

| Ort | Pfad | Zweck |
|---|---|---|
| BEYONDERnow/claude-marketplace | `plugins/beyonder-skills/skills/swissai-erklaervideo/` | Quelle für Plugin `beyonder-skills`, direkt dort gepflegt |
| BEYONDERnow/claude-marketplace | `dist/zips/swissai-erklaervideo.zip` | Upload-Zip für claude.ai und Desktop |
| BEYONDERnow/swissai | `swissai-erklaervideo/` | Unterordner im swissai-Repo |

Einen eigenen swissAI Marketplace gibt es nicht. Der Skill kommt über den BEYONDER Marketplace (`beyonder`, Plugin `beyonder-skills`) zu den Nutzern.

## Verlauf

- 2026-10-13: Erstversion in beide Repos (claude-marketplace#3, swissai#1).
- 2026-10-13: Update mit Auto-Modus (`make.py`, `auto_story.py`) und Klangprofilen (claude-marketplace#4, swissai#2). Ein Merge-Konflikt in `dist/manifest.json` und dem Zip wurde durch Neuaufbau aus dem Skill-Ordner gelöst.

## Skill aktualisieren

1. Neues Zip in einen leeren Ordner entpacken, Inhalt auf Secrets prüfen.
2. In claude-marketplace: Ordner unter `plugins/beyonder-skills/skills/` ersetzen, Zip aus dem Ordner neu bauen (genau ein `SKILL.md`, keine `.zip`/`.skill` darin), Hash im `dist/manifest.json` setzen (Algorithmus wie `scripts/mirror-skills.sh`), `CHANGELOG.md` ergänzen.
3. In swissai: Unterordner ersetzen, `CHANGELOG.md` ergänzen.
4. Je Repo Branch pushen, PR öffnen, mergen.
5. claude.ai/Desktop: Zip aus `dist/zips/` hochladen, danach `bash scripts/changed-skills.sh --mark`. Claude-Code-Sessions: `/reload-plugins`.

## Stolpersteine

- **Doppelte Kopie:** Der stündliche Mirror spiegelt das swissai-Repo nach `skills/swissai/`. Der Skill liegt dadurch zusätzlich verschachtelt unter `skills/swissai/swissai-erklaervideo/`. Er zieht die neue Version erst nach einem Merge in swissai und dem nächsten Mirror-Lauf nach. Wer das nicht will, nimmt ihn aus swissai heraus.
- **Generierte Dateien:** `dist/manifest.json` und die Zips ändert auch der Mirror. Konflikte dort nicht von Hand mergen, sondern neu erzeugen.
- **Werkzeuge:** In der Cloud-Umgebung fehlt `rsync`, stattdessen `cp -r`.
- **Flache Klone:** Remote-Tracking für neue Branches fehlt, dann `git push -u` oder den Branch-Ref explizit holen.
