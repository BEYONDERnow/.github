"""Schneidet aus den Website-Galeriebildern saubere Ausschnitte (ohne eingeklebte Vorher-Bilder,
Wasserzeichen-Leiste und Titel) und skaliert sie für 1080 px Breite (Lanczos + leichtes Unsharp).
Aufruf: python3 -I scripts/crops.py   → assets/selected/"""
import pathlib
from PIL import Image, ImageFilter

root = pathlib.Path(__file__).resolve().parent.parent
src = root / "assets/website_all"
dst = root / "assets/selected"
dst.mkdir(exist_ok=True)

# Name: (Quelldatei, (links, oben, rechts, unten)) in Originalpixeln
CROPS = {
    # Narbe
    "narbe_brandnarbe.jpg": ("2026_04_Verbrennung_Elefant.webp", (770, 300, 1240, 1240)),  # Ausgangszustand
    "narbe_brand_tattoo.jpg": ("2026_04_Verbrennung_Elefant.webp", (120, 300, 735, 1030)),
    "narbe_phoenix.jpg": ("2026_04_Narbe_Tattoo.webp", (170, 0, 770, 1030)),
    "narbe_koi.jpg": ("2026_04_Schnitte_Koi.webp", (120, 0, 640, 1030)),
    # Cover-up
    "cover_stencil.jpg": ("2026_04_20251206_1554032.webp", None),  # Stencil über altem Tattoo (Ausgangszustand + Prozess)
    "cover_linework.jpg": ("2026_04_20251207_085201.webp", None),
    "cover_leopard.jpg": ("2026_04_leopard1-Kopie.webp", (120, 240, 940, 1030)),
    "cover_loewe.jpg": ("2026_04_loewe-Kopie.webp", (120, 240, 870, 1030)),
    "cover_panther.jpg": ("2026_04_panther-Kopie.webp", (150, 200, 830, 1030)),
    # Seelentier
    "tier_kira.jpg": ("2026_04_kira-q-Kopie.webp", (120, 280, 740, 1030)),
    "tier_dexter.jpg": ("2026_04_dexter-q-Kopie.webp", (150, 240, 840, 1030)),
    "tier_adler.jpg": ("2026_04_adlergross-Kopie.webp", (120, 180, 760, 1030)),
    # Seelentattoo / Design
    "design_wolf.jpg": ("2026_04_wolf3.webp", (130, 40, 815, 1030)),
    "design_pferdfrau.jpg": ("2026_04_pferdfrau.webp", (790, 0, 1240, 1240)),
    # Prozess, Atelier, Steffi
    "prozess_nadel.jpg": ("2026_04_Banner5-scaled.webp", (380, 0, 1780, 1334)),
    "steffi_portrait.jpg": ("2024_10_Steffi_Voelker.jpg", None),
    "atelier_lounge.jpg": ("2024_10_Studio2.jpg", None),
    "atelier_sessel.jpg": ("2024_10_Studio3.jpg", None),
    "atelier_liege.jpg": ("2024_10_Studio4.jpg", None),
}

for name, (f, box) in CROPS.items():
    im = Image.open(src / f).convert("RGB")
    if box:
        im = im.crop(box)
    # auf mind. 1080 px kurze Seite hochskalieren (max. Faktor 2,2), danach leicht nachschärfen
    s = min(2.2, max(1.0, 1080 / min(im.size)))
    if s > 1.0:
        im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
        im = im.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
    im.save(dst / name, quality=93)
    print(f"{name:26s} {im.width}x{im.height}  (Faktor {s:.2f})")
