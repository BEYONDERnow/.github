# Setup-Anleitung: BEYONDERnow Claude Code Skills

Diese Anleitung erklärt die vollständige Einrichtung des Skills-Systems auf einem neuen Rechner.

---

## 1. Voraussetzungen

Folgende Tools müssen installiert sein:

| Tool | Installation | Wozu |
|---|---|---|
| **Claude Code** | `npm install -g @anthropic-ai/claude-code` | Claude Code CLI |
| **GitHub CLI** | `brew install gh && gh auth login` | Repos klonen und verwalten |
| **git** | vorinstalliert auf macOS | Versionskontrolle |
| **Homebrew** | `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` | Package Manager |
| **bash 5.x** | `brew install bash` | Auto-Watcher benötigt bash 5 |
| **fswatch** | `brew install fswatch` | Dateiänderungen überwachen |

---

## 2. Repos klonen

Alle Skills werden in `~/Developer/BEYONDERnow/skills/` geklont:

```bash
# Verzeichnis erstellen
mkdir -p ~/Developer/BEYONDERnow/skills

# Alle Skill-Repos klonen (inkl. beyonder Monorepo)
gh repo list BEYONDERnow --limit 50 --json name --jq '.[].name' | \
  grep -v "^\." | \
  while read name; do
    echo "Klone: $name"
    git clone git@github.com:BEYONDERnow/$name.git ~/Developer/BEYONDERnow/skills/$name
  done
```

**Struktur danach:**
- `skills/beyonder/` – Monorepo mit 7 BEYONDER Skills als Unterordner
- `skills/swissai/` – Einzelrepo
- `skills/<tooling-skill>/` – je ein Einzelrepo (17 Stück)

---

## 3. Symlinks setzen

Skills werden als Symlinks in das Plugin-Verzeichnis von Claude Code eingebunden:

```bash
# Plugin-Verzeichnis erstellen
mkdir -p ~/.claude/plugins/marketplaces/beyonder/plugins/beyonder-skills/skills

# Symlinks setzen (relink-skills.sh)
~/Developer/BEYONDERnow/scripts/relink-skills.sh
```

Das `relink-skills.sh`-Script erkennt automatisch Einzelrepos und das BEYONDER Monorepo:
- Ordner mit `SKILL.md` direkt → Einzelrepo, 1 Symlink
- Ordner ohne `SKILL.md` → Monorepo, 1 Symlink pro Unterordner

**Danach Claude Code neu starten** – neue Skills werden beim Start geladen.

---

## 4. Auto-Watcher (LaunchAgent)

Der Auto-Watcher überwacht alle Skill-Ordner und committed/pusht Änderungen automatisch.

### Watcher einrichten

```bash
# watch-skills.sh kopieren (liegt in ~/Developer/BEYONDERnow/scripts/)
# LaunchAgent Plist installieren
cp ~/Developer/BEYONDERnow/scripts/ch.beyonder.skills-watcher.plist \
   ~/Library/LaunchAgents/ch.beyonder.skills-watcher.plist

# Watcher starten
launchctl load ~/Library/LaunchAgents/ch.beyonder.skills-watcher.plist
```

### Watcher-Status prüfen

```bash
# Status
launchctl list | grep skills-watcher

# Logs
tail -f ~/Developer/BEYONDERnow/logs/watcher.log
tail -f ~/Developer/BEYONDERnow/logs/watcher.err
```

### Watcher neu laden (nach Änderungen an der Plist)

```bash
launchctl unload ~/Library/LaunchAgents/ch.beyonder.skills-watcher.plist
launchctl load ~/Library/LaunchAgents/ch.beyonder.skills-watcher.plist
```

**Hinweis:** Der Watcher hat einen 30-Sekunden-Debounce – Änderungen werden erst nach 30s Inaktivität committed.

---

## 5. Neuen Skill erstellen

```bash
# 1. Skill-Ordner erstellen
mkdir -p ~/Developer/BEYONDERnow/skills/<skill-name>
# SKILL.md erstellen (mit YAML-Frontmatter: name, description)

# 2. Git-Repo initialisieren und auf GitHub pushen
cd ~/Developer/BEYONDERnow/skills/<skill-name>
git init && git add -A && git commit -m "Initial commit"
gh repo create BEYONDERnow/<skill-name> --private --source=. --remote=origin --push

# 3. Symlink setzen
ln -sfn ~/Developer/BEYONDERnow/skills/<skill-name> \
  ~/.claude/plugins/marketplaces/beyonder/plugins/beyonder-skills/skills/<skill-name>

# 4. Claude Code neu starten
```

Für detaillierte Skill-Erstellungsanleitung: Skill `skill-creator` oder `skill-development` verwenden.

---

## 6. Team-Zugriff einrichten

### Schreibzugriff für Teammitglieder

1. GitHub → **BEYONDERnow Organisation** → Settings → Teams
2. Team **"skills-editors"** erstellen (falls nicht vorhanden)
3. Alle Skill-Repos dem Team zuweisen (oder Org-weite Berechtigung)
4. Person zum Team hinzufügen

### Pro Person (einmalig, nach Schritt 1–3)

```bash
# Alle Skills klonen (Schritt 2 dieser Anleitung)
# Symlinks setzen (Schritt 3)
# watch-skills.sh + LaunchAgent installieren (Schritt 4)
```

### Workflow-Regeln

- Direkt auf `main` committen (kein PR-Overhead bei kleinen Änderungen)
- Auto-Watcher committed nach 30s Inaktivität automatisch
- Bei Merge-Konflikt: `git pull --rebase` vor nächster Änderung
- Skill löschen: Repo auf GitHub archivieren, Symlink entfernen

---

## 7. Troubleshooting

### Skills werden in Claude Code nicht angezeigt

```bash
# Symlinks prüfen
ls -la ~/.claude/plugins/marketplaces/beyonder/plugins/beyonder-skills/skills/

# Marketplace-Registrierung prüfen
cat ~/.claude/plugins/known_marketplaces.json

# Claude Code neu starten (Pflicht nach Änderungen)
```

### Watcher committed nicht

```bash
# Status prüfen
launchctl list | grep skills-watcher

# Fehler-Log prüfen
cat ~/Developer/BEYONDERnow/logs/watcher.err

# fswatch installiert?
which fswatch || brew install fswatch

# bash 5.x installiert?
/opt/homebrew/bin/bash --version || brew install bash

# Watcher neu laden
launchctl unload ~/Library/LaunchAgents/ch.beyonder.skills-watcher.plist
launchctl load ~/Library/LaunchAgents/ch.beyonder.skills-watcher.plist
```

### Merge-Konflikt beim Auto-Push

```bash
cd ~/Developer/BEYONDERnow/skills/<skill-name>
git pull --rebase origin main
git push origin main
```

### Skill geändert, Claude sieht es nicht

Skills werden beim **Session-Start** geladen. Claude Code neu starten um Änderungen zu sehen.

---

## Skills synchronisieren (alle auf einmal)

```bash
# Alle Skills pullen (updates holen)
~/Developer/BEYONDERnow/scripts/sync-skills.sh pull

# Alle Skills pushen
~/Developer/BEYONDERnow/scripts/sync-skills.sh push "Update Skills"

# Status aller Skills anzeigen
~/Developer/BEYONDERnow/scripts/sync-skills.sh status
```
