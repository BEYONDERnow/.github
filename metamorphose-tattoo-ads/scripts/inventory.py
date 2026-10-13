"""Erzeugt assets/inventory.csv aus allen Bildern/Videos in assets/. Thema, Ausgangszustand, Hook-Eignung und Notiz
werden nach der Sichtprüfung von Hand ergänzt (vorbelegt aus dem Dateinamen). Aufruf: python3 -I scripts/inventory.py"""
import csv, json, pathlib, subprocess

root = pathlib.Path(__file__).resolve().parent.parent
rows = []
guess = {"narben": "Narbe", "cover": "Cover-up", "seelentier": "Seelentier", "seelen": "Seelentattoo", "studio": "Atelier", "logo": "Marke"}
for p in sorted((root / "assets").rglob("*")):
    if p.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp", ".mp4", ".mov"}:
        continue
    info = json.loads(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                                      "-of", "json", str(p)], capture_output=True, text=True).stdout or "{}")
    s = (info.get("streams") or [{}])[0]
    w, h = s.get("width", 0), s.get("height", 0)
    name = p.name.lower()
    thema = next((v for k, v in guess.items() if k in name), "")
    rows.append({
        "Datei": str(p.relative_to(root)), "Quelle": p.parent.name, "Thema": thema,
        "Typ": "Video" if p.suffix.lower() in {".mp4", ".mov"} else "Foto", "Auflösung": f"{w}x{h}",
        "Ausgangszustand": "ja" if name in {"narben1.jpg", "coverup1.jpg"} else "nein",
        "Hook-Eignung (1-5)": "", "Notiz": "ZU KLEIN (<1080 px)" if min(w, h) and min(w, h) < 1080 else "",
    })
with open(root / "assets/inventory.csv", "w", newline="", encoding="utf-8") as f:
    wr = csv.DictWriter(f, fieldnames=list(rows[0].keys()) if rows else ["Datei"])
    wr.writeheader(); wr.writerows(rows)
print(f"{len(rows)} Einträge")
