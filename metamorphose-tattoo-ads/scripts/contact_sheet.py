"""Kontaktbogen: python3 -I scripts/contact_sheet.py out.png cols file1 file2 ..."""
import sys
from PIL import Image, ImageDraw, ImageOps

out, cols, files = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
W, H = 300, 330
rows = (len(files) + cols - 1) // cols
sheet = Image.new("RGB", (cols * W, rows * H), "white")
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    try:
        im = Image.open(f); im.seek(0); im = ImageOps.exif_transpose(im.convert("RGB"))
        label = f"{f.split('/')[-1][:34]} {im.width}x{im.height}"
        im.thumbnail((W - 6, H - 36))
        x, y = (i % cols) * W, (i // cols) * H
        sheet.paste(im, (x + (W - im.width) // 2, y + 3))
        d.text((x + 4, y + H - 28), label, fill="black")
    except Exception as e:
        print("skip", f, e)
sheet.save(out)
