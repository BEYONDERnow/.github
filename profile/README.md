# BEYONDERnow – Claude Code Skills

**Claude Code Skills** sind modulare Wissenspakete, die Claude Code um spezialisiertes Know-how erweitern. Dieses GitHub-Profil enthält **25 Skills** der [BEYONDER AG](https://beyonder.ch) und der [Swiss AI Association (swissAI)](https://swissai.ch).

---

## Was ist das?

Claude Code kann durch Skills mit domänenspezifischem Wissen und Workflows erweitert werden. Skills werden via Symlink lokal installiert und aktivieren sich automatisch wenn der Kontext passt.

**Repo-Struktur:** BEYONDER Skills sind in einem Monorepo [`beyonder`](https://github.com/BEYONDERnow/beyonder) zusammengefasst. swissAI und alle Tooling-Skills haben je ein eigenes Repo.

Setup-Anleitung: **[SETUP.md](SETUP.md)**

---

## Skills nach Kategorie

### BEYONDER – Strategie, Design & Texte

Alle 7 BEYONDER Skills im Monorepo: **[BEYONDERnow/beyonder](https://github.com/BEYONDERnow/beyonder)**

| Skill | Beschreibung |
|---|---|
| beyonder-brand-voice | Tonalität, Hook-Formeln und Copy-Frameworks für alle BEYONDER-Texte |
| beyonder-strategy | Positionierung, ICP, Offer-Architektur und Kommunikationsleitplanken |
| brand-guidelines | Corporate Design Guidelines v5.0 – Farben, Typografie, Logos |
| hubspot-offerte | Professionelle Verkaufsofferten mit HubSpot-Integration |
| social-posts-carousel | LinkedIn-Karussells nach BEYONDER Corporate Design |
| writing-rules | Hookify-Regeln für Claude Code Automatisierungen |
| frontend-design | Distinctive, production-grade Frontend-Interfaces |

### swissAI – Swiss AI Association

| Skill | Beschreibung |
|---|---|
| [swissai](https://github.com/BEYONDERnow/swissai) | Strategisches Wissen für Partnerschaften, Kommunikation und Community |

### Claude Code Tooling – Allgemein

| Skill | Beschreibung |
|---|---|
| [agent-development](https://github.com/BEYONDERnow/agent-development) | Agents erstellen: Frontmatter, System Prompts, Triggerbedingungen |
| [claude-automation-recommender](https://github.com/BEYONDERnow/claude-automation-recommender) | Codebase analysieren und passende Automations empfehlen |
| [claude-md-improver](https://github.com/BEYONDERnow/claude-md-improver) | CLAUDE.md-Dateien auditieren und verbessern |
| [command-development](https://github.com/BEYONDERnow/command-development) | Slash Commands: Frontmatter, Argumente, Patterns |
| [example-skill](https://github.com/BEYONDERnow/example-skill) | Referenz-Template für Skill-Struktur und Format |
| [find-skills](https://github.com/BEYONDERnow/find-skills) | Skills aus dem Open Agent Skills Ecosystem finden |
| [google-sheets](https://github.com/BEYONDERnow/google-sheets) | Google Sheets lesen/schreiben via API und curl |
| [hook-development](https://github.com/BEYONDERnow/hook-development) | Plugin Hooks: PreToolUse, PostToolUse, Stop, SessionStart |
| [mcp-integration](https://github.com/BEYONDERnow/mcp-integration) | Model Context Protocol Server in Plugins integrieren |
| [playground](https://github.com/BEYONDERnow/playground) | Interaktive HTML-Playgrounds mit Live-Preview erstellen |
| [plugin-settings](https://github.com/BEYONDERnow/plugin-settings) | Plugin-Konfiguration in .local.md-Dateien speichern |
| [plugin-structure](https://github.com/BEYONDERnow/plugin-structure) | Plugin-Architektur, Verzeichnisstruktur und Manifests |
| [remotion-best-practices](https://github.com/BEYONDERnow/remotion-best-practices) | React-basierte Video-Animationen mit Remotion |
| [skill-creator](https://github.com/BEYONDERnow/skill-creator) | Skills erstellen, testen, evaluieren und benchmarken |
| [skill-development](https://github.com/BEYONDERnow/skill-development) | Effektive Skills mit Progressive Disclosure erstellen |
| [skill-tester](https://github.com/BEYONDERnow/skill-tester) | Skill-Qualität validieren und bewerten |
| [stripe-best-practices](https://github.com/BEYONDERnow/stripe-best-practices) | Stripe Payments, Subscriptions, Webhooks und Connect |

---

## Quick-Setup (3 Schritte)

```bash
# 1. Alle Skill-Repos klonen
gh repo list BEYONDERnow --limit 50 --json name --jq '.[].name' | \
  grep -v "^\." | \
  while read name; do
    git clone git@github.com:BEYONDERnow/$name.git ~/Developer/BEYONDERnow/skills/$name
  done

# 2. Symlinks setzen (auto-erkennt Einzelrepos und Monorepo)
~/Developer/BEYONDERnow/scripts/relink-skills.sh

# 3. Claude Code neu starten
```

Vollständige Anleitung (inkl. Auto-Watcher und Team-Setup): **[SETUP.md](SETUP.md)**
