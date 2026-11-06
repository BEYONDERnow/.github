"""Liest die dominante, nicht-transparente Farbe aus dem Logo (Dunkellila). Aufruf: python3 -I scripts/logo_color.py public/img/logo-dunkellila.png"""
import sys
from collections import Counter
from PIL import Image

img = Image.open(sys.argv[1]).convert("RGBA")
px = [p[:3] for p in img.getdata() if p[3] > 200 and sum(p[:3]) < 600]
r, g, b = Counter(px).most_common(1)[0][0]
print(f"#{r:02X}{g:02X}{b:02X}")
