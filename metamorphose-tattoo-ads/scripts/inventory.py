"""Erzeugt assets/inventory.csv aus allen Bildern in assets/website_all und assets/selected.
Thema, Ausgangszustand, Hook-Eignung und Notizen stammen aus der Sichtprüfung (13.10.2026).
Aufruf: python3 -I scripts/inventory.py"""
import csv, pathlib
from PIL import Image

root = pathlib.Path(__file__).resolve().parent.parent

def theme(name: str) -> str:
    n = name.lower()
    rules = [
        ("pexels", "Stock (nicht Steffi)"), ("logo", "Marke"), ("studio", "Atelier"), ("atelier", "Atelier"),
        ("steffi", "Steffi"), ("eyco", "Steffi"), ("202235", "Atelier"),
        ("narbe", "Narbe"), ("narben", "Narbe"), ("koi", "Narbe"), ("verbrennung", "Narbe"),
        ("coverup", "Cover-up"), ("cover_", "Cover-up"), ("20251206", "Cover-up/Prozess"), ("20251207", "Cover-up/Prozess"),
        ("banner5", "Prozess"), ("prozess", "Prozess"),
        ("picture-1600", "Tattoo-Design"), ("pferdfrau", "Tattoo-Design"), ("wolf3", "Tattoo-Design"), ("design_", "Tattoo-Design"),
        ("seelentier", "Seelentier"), ("tier_", "Seelentier"), ("seelen", "Seelentattoo"),
    ]
    cover = {"adlergross-kopie", "anglerfisch", "dexter", "kira", "leopard", "loewe-kopie.webp", "lotus", "mandala",
             "panther", "pfotenabdruck", "pharon", "qualle", "stier", "teufel", "wikingerarm"}
    if n.startswith("2026_04") and any(c in n for c in cover):
        return "Cover-up (Galerie mit eingeklebtem Vorher-Bild)"
    for k, v in rules:
        if k in n:
            return v
    return "Seelentier/Seelentattoo (Galerie)" if n.startswith("2026_03") else ""

hook = {"narbe_brandnarbe.jpg": 5, "narbe_phoenix.jpg": 4, "narbe_koi.jpg": 4, "cover_stencil.jpg": 5, "cover_leopard.jpg": 5,
        "tier_kira.jpg": 5, "tier_dexter.jpg": 4, "cover_loewe.jpg": 4, "tier_adler.jpg": 4, "steffi_portrait.jpg": 4,
        "design_pferdfrau.jpg": 4, "design_wolf.jpg": 4, "prozess_nadel.jpg": 3, "cover_linework.jpg": 3}
notes = {
    "2026_02": "Website-Original nur 150x150 → unbrauchbar",
    "2026_03": "Galerie-Komposit mit Rahmen, Wasserzeichen und Titel; 600 px",
    "2026_04_Narbe": "Komposit mit eingeklebtem Vorher-Bild → nur Ausschnitt verwenden",
    "selected": "Ausschnitt aus scripts/crops.py (ohne Vorher-Einsatz, Wasserzeichen, Titel); hochskaliert",
}
rows = []
for d in ["assets/website_all", "assets/selected"]:
    for p in sorted((root / d).glob("*")):
        if p.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        w, h = Image.open(p).size
        n = p.name
        note = notes["selected"] if d.endswith("selected") else next((v for k, v in notes.items() if n.startswith(k)), "")
        if n.startswith("2026_04") and "Cover-up" in theme(n):
            note = "Komposit mit eingeklebtem Vorher-Bild (Vorher/Nachher nebeneinander) → nur Ausschnitt verwenden"
        if "pexels" in n:
            note = "Stockfoto der Website, nicht Steffis Arbeit → nicht verwenden"
        rows.append({
            "Datei": f"{d}/{n}", "Quelle": "steffi-voelker.com" if "website" in d else "Ausschnitt",
            "Thema": theme(n), "Typ": "Foto", "Auflösung": f"{w}x{h}",
            "Ausgangszustand": "ja" if any(k in n.lower() for k in ["brandnarbe", "stencil", "coverup1", "narben1"]) else "nein",
            "Hook-Eignung (1-5)": hook.get(n, ""),
            "Notiz": (note + ("; ZU KLEIN (<1080 px)" if min(w, h) < 1080 and d.endswith("website_all") else "")).strip("; "),
        })
with open(root / "assets/inventory.csv", "w", newline="", encoding="utf-8") as f:
    wr = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    wr.writeheader(); wr.writerows(rows)
print(f"{len(rows)} Einträge")
