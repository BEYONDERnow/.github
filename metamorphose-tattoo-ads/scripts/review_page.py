"""Erzeugt qa/review/index.html (Freigabe-Seite) aus out/*.mp4 und den Messwerten.
Aufruf: python3 -I scripts/review_page.py"""
import json, pathlib, re, subprocess, html

root = pathlib.Path(__file__).resolve().parent.parent
out = root / "out"

VIDEOS = [
    {"id": "V1_Narbe", "title": "Narbentattoo", "slot": "Retargeting",
     "hooks": {"A": "«Die Narbe bleibt.»", "B": "Bild-Hook: Makro (Narbe bzw. Koi) + «Die Narbe bleibt.»", "C": "«Was, wenn eine Narbe Kunst wird?»"},
     "start": {"mit": "Brandnarbe 0–3 s sichtbar", "ohne": "nur Prozess und Ergebnis"},
     "primary": "Eine Narbe erzählt eine Geschichte. Steffi entwirft ein Motiv, das diese Geschichte weiterschreibt – individuell für deine Haut. Über 12 Jahre Erfahrung, Atelier in Veltheim AG.",
     "headline": "Narben-Tattoo, individuell entworfen", "music": "Possible Dreams – Eugenio Mininni (Mixkit #599)"},
    {"id": "V2_Coverup", "title": "Cover-up", "slot": "Neukunden-Test",
     "hooks": {"A": "«Ein Cover-up darf mehr sein als wegmachen.»", "B": "«Ein Tattoo aus einem früheren Leben?»", "C": "«Was passiert mit einem alten Tattoo?»"},
     "start": {"mit": "Stencil über altem Tattoo 0–3 s", "ohne": "Leopardenauge, nur Ergebnis"},
     "primary": "Manche Tattoos gehören zu einem früheren Lebensabschnitt. Ein Cover-up darf mehr sein als wegmachen: Steffi entwirft ein neues Motiv, das zu dir passt.",
     "headline": "Cover-up, neu entworfen", "music": "Miss You – Eugenio Mininni (Mixkit #592)"},
    {"id": "V3_Seelentier", "title": "Seelentier", "slot": "Neukunden-Test",
     "hooks": {"A": "«Ein Seelentier ist kein Haustier.»", "B": "Bild-Hook: Dexter-Makro + «Ein Seelentier ist kein Haustier.»", "C": "«Wie tätowiert man einen Blick?»"},
     "start": {},
     "primary": "Ein Seelentier ist Begleiter, Lehrer, Haltgeber. Darum kopiert Steffi kein Foto. Sie hört die Geschichte und entwirft ein Tattoo mit Blick und Charakter.",
     "headline": "Seelentier-Tattoo statt Fotokopie", "music": "Piano Reflections – Ahjay Stelino (Mixkit #22)"},
    {"id": "V4_Seelentattoo", "title": "Keine Fotokopie", "slot": "Retargeting",
     "hooks": {"A": "Löwe + «Ich tätowiere keine Fotos.»", "B": "Steffi-Porträt + «Ich tätowiere keine Fotos.»", "C": "«Was bleibt von einem Menschen?»"},
     "start": {},
     "primary": "Keine Fotokopie. Jedes Tattoo entsteht aus Gespräch, Zuhören und deiner Geschichte. Über 12 Jahre Erfahrung, ohne Laufkundschaft, in Veltheim AG.",
     "headline": "Ein Tattoo, das nur zu dir gehört", "music": "Silent Descent – Eugenio Mininni (Mixkit #614)"},
]

def measure(f):
    r = subprocess.run(["ffmpeg", "-nostats", "-i", str(f), "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    i = re.findall(r"I:\s+(-?[\d.]+) LUFS", r)[-1]
    p = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", r)[-1]
    return float(i), float(p)

items = []
for f in sorted(out.glob("MT_*.mp4")):
    parts = f.stem.split("_")  # MT V2 Coverup HookA 916 [mit]
    vid = f"{parts[1]}_{parts[2]}"
    lufs, tp = measure(f)
    items.append({"file": f.name, "video": vid, "hook": parts[3][-1], "format": parts[4], "start": parts[5] if len(parts) > 5 else "",
                  "mb": round(f.stat().st_size / 1048576, 1), "lufs": lufs, "tp": tp})
(root / "qa/review").mkdir(parents=True, exist_ok=True)
data = json.dumps({"videos": VIDEOS, "items": items}, ensure_ascii=False)
tpl = (root / "scripts/review_template.html").read_text()
(root / "qa/review/index.html").write_text(tpl.replace("/*DATA*/null", data))
(root / "qa/review/items.json").write_text(json.dumps(items, ensure_ascii=False, indent=1))
print(len(items), "Videos")
