"""Lädt die freigegebenen Videos ins Meta-Werbekonto und legt die Anzeigen PAUSIERT an.

Voraussetzungen
  - META_ACCESS_TOKEN: System-User-Token mit ads_management für das Werbekonto (Umgebungsvariable)
  - Videos in out/ (falls nicht vorhanden: npm run render:all)

Vorgehen
  1. Sucht die Vorlage-Anzeige (Name enthält «N1», aktive Neukunden-Kampagne) und übernimmt deren
     Creative-Aufbau: Facebook-Seite, Instagram-Konto, Sofortformular, Call-to-Action («Angebot einholen»).
  2. Lädt je Anzeige das 9:16-Video (und das 4:5-Video für Feed-Platzierungen) hoch, plus Vorschaubild.
  3. Erstellt Creative + Anzeige mit status=PAUSED in der jeweiligen Anzeigengruppe.

Standard ist ein Probelauf ohne Änderungen. Erst --apply schreibt ins Konto.
  python3 -I scripts/meta_upload.py            # Probelauf: zeigt Vorlage, Anzeigengruppen und Plan
  python3 -I scripts/meta_upload.py --apply    # lädt hoch und legt alle Anzeigen pausiert an
"""
import argparse, json, os, pathlib, subprocess, sys, time, urllib.parse, urllib.request, uuid

API = "https://graph.facebook.com/v21.0"
VIDEO_API = "https://graph-video.facebook.com/v21.0"
ACCOUNT = "act_321782065041931"
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "out"

# Ziel-Anzeigengruppen (Briefing Abschnitt 10). Treffer über Namensteile; bei Mehrdeutigkeit bricht das Skript ab.
TARGETS = {
    "neukunden": {"campaign_contains": "Neukunden Video", "adset_contains": None},
    "retargeting": {"campaign_contains": None, "adset_contains": "AS | RT | Video R1 R2"},
}

COPY = {
    "V1_Narbe": ("Eine Narbe erzählt eine Geschichte. Steffi entwirft ein Motiv, das diese Geschichte weiterschreibt – individuell für deine Haut. Über 12 Jahre Erfahrung, Atelier in Veltheim AG.", "Narben-Tattoo, individuell entworfen"),
    "V2_Coverup": ("Manche Tattoos gehören zu einem früheren Lebensabschnitt. Ein Cover-up darf mehr sein als wegmachen: Steffi entwirft ein neues Motiv, das zu dir passt.", "Cover-up, neu entworfen"),
    "V3_Seelentier": ("Ein Seelentier ist Begleiter, Lehrer, Haltgeber. Darum kopiert Steffi kein Foto. Sie hört die Geschichte und entwirft ein Tattoo mit Blick und Charakter.", "Seelentier-Tattoo statt Fotokopie"),
    "V4_Seelentattoo": ("Keine Fotokopie. Jedes Tattoo entsteht aus Gespräch, Zuhören und deiner Geschichte. Über 12 Jahre Erfahrung, ohne Laufkundschaft, in Veltheim AG.", "Ein Tattoo, das nur zu dir gehört"),
}

# Einsatzplan: V2/V3 Neukunden-Test, V1/V4 Retargeting. V1/V2 in der sicheren Variante «ohne» (alle Hooks)
# plus Hook A «mit» Ausgangszustand als zusätzlicher Test.
PLAN = []
for vid, target in [("V2_Coverup", "neukunden"), ("V3_Seelentier", "neukunden"), ("V1_Narbe", "retargeting"), ("V4_Seelentattoo", "retargeting")]:
    starts = ["ohne"] if vid in ("V1_Narbe", "V2_Coverup") else [""]
    for hook in "ABC":
        for st in starts:
            PLAN.append({"video": vid, "hook": hook, "start": st, "target": target})
    if vid in ("V1_Narbe", "V2_Coverup"):
        PLAN.append({"video": vid, "hook": "A", "start": "mit", "target": target})


def fname(item, fmt):
    suffix = f"_{item['start']}" if item["start"] else ""
    return f"MT_{item['video']}_Hook{item['hook']}_{fmt}{suffix}.mp4"


def ad_name(item):
    suffix = f" {item['start']}" if item["start"] else ""
    return f"MT {item['video'].replace('_', ' ')} Hook {item['hook']}{suffix}"


def token():
    t = os.environ.get("META_ACCESS_TOKEN")
    if not t:
        sys.exit("META_ACCESS_TOKEN fehlt. Bitte als Secret/Umgebungsvariable der Cloud-Umgebung hinterlegen.")
    return t


def get(path, **params):
    params["access_token"] = token()
    with urllib.request.urlopen(f"{API}/{path}?{urllib.parse.urlencode(params)}", timeout=60) as r:
        return json.load(r)


def post(path, base=API, files=None, **fields):
    fields["access_token"] = token()
    if files:
        boundary = uuid.uuid4().hex
        body = b""
        for k, v in fields.items():
            body += f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode()
        for k, p in files.items():
            body += f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"; filename=\"{p.name}\"\r\nContent-Type: application/octet-stream\r\n\r\n".encode()
            body += p.read_bytes() + b"\r\n"
        body += f"--{boundary}--\r\n".encode()
        req = urllib.request.Request(f"{base}/{path}", data=body, headers={"Content-Type": f"multipart/form-data; boundary={boundary}"})
    else:
        data = urllib.parse.urlencode({k: (json.dumps(v) if isinstance(v, (dict, list)) else v) for k, v in fields.items()}).encode()
        req = urllib.request.Request(f"{base}/{path}", data=data)
    try:
        with urllib.request.urlopen(req, timeout=600) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"Meta-API-Fehler bei {path}: {e.read().decode()[:800]}")


def all_pages(path, **params):
    res = get(path, **params)
    items = res.get("data", [])
    while res.get("paging", {}).get("next"):
        with urllib.request.urlopen(res["paging"]["next"], timeout=60) as r:
            res = json.load(r)
        items += res.get("data", [])
    return items


def find_template():
    ads = all_pages(f"{ACCOUNT}/ads", fields="id,name,effective_status,adset_id,campaign{name},creative{id}", limit=200)
    cands = [a for a in ads if "N1" in a["name"] and "Neukunden" in a.get("campaign", {}).get("name", "")]
    if not cands:
        sys.exit("Vorlage-Anzeige «N1» in der Neukunden-Kampagne nicht gefunden.")
    a = sorted(cands, key=lambda x: x["effective_status"] != "ACTIVE")[0]
    cr = get(a["creative"]["id"], fields="object_story_spec,asset_feed_spec,instagram_user_id,actor_id,degrees_of_freedom_spec")
    return a, cr


def find_adsets():
    sets = all_pages(f"{ACCOUNT}/adsets", fields="id,name,status,campaign{name}", limit=200)
    found = {}
    for key, rule in TARGETS.items():
        hits = [s for s in sets
                if (not rule["campaign_contains"] or rule["campaign_contains"] in s.get("campaign", {}).get("name", ""))
                and (not rule["adset_contains"] or rule["adset_contains"] in s["name"])]
        if len(hits) != 1:
            sys.exit(f"Anzeigengruppe für «{key}» nicht eindeutig ({len(hits)} Treffer): {[h['name'] for h in hits]}")
        found[key] = hits[0]
    return found


def thumbnail(video_file):
    png = OUT / "tmp" / (video_file.stem + "_thumb.jpg")
    png.parent.mkdir(exist_ok=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "0.5", "-i", str(video_file), "-frames:v", "1", "-q:v", "2", str(png)], check=True)
    return png


def wait_ready(video_id):
    for _ in range(90):
        st = get(video_id, fields="status")["status"]["video_status"]
        if st == "ready":
            return
        if st == "error":
            sys.exit(f"Video {video_id} wurde von Meta abgelehnt.")
        time.sleep(10)
    sys.exit(f"Video {video_id} nach 15 Minuten nicht verarbeitet.")


def build_creative(tmpl, item, vid916, vid45, img_hash):
    body, title = COPY[item["video"]]
    oss = tmpl.get("object_story_spec") or {}
    page_id = oss.get("page_id") or tmpl.get("actor_id")
    ig = oss.get("instagram_user_id") or tmpl.get("instagram_user_id")
    vd = oss.get("video_data") or {}
    cta = vd.get("call_to_action") or {"type": "GET_QUOTE"}
    if "value" in cta:
        cta = {"type": cta["type"], "value": {k: v for k, v in cta["value"].items() if k in ("lead_gen_form_id", "link")}}
    # Platzierungs-Anpassung: 4:5 im Feed, 9:16 in Stories und Reels.
    afs = {
        "videos": [{"video_id": vid45, "thumbnail_hash": img_hash, "adlabels": [{"name": "feed45"}]},
                   {"video_id": vid916, "thumbnail_hash": img_hash, "adlabels": [{"name": "vertical916"}]}],
        "bodies": [{"text": body}],
        "titles": [{"text": title}],
        "call_to_action_types": [cta["type"]],
        "link_urls": [{"website_url": "https://steffi-voelker.com/"}],
        "ad_formats": ["SINGLE_VIDEO"],
        "optimization_type": "PLACEMENT",
        "asset_customization_rules": [
            {"customization_spec": {"publisher_platforms": ["facebook", "instagram"], "facebook_positions": ["feed", "video_feeds", "marketplace"], "instagram_positions": ["stream", "explore"]},
             "video_label": {"name": "feed45"}, "priority": 1},
            {"customization_spec": {"publisher_platforms": ["facebook", "instagram"], "facebook_positions": ["story", "facebook_reels"], "instagram_positions": ["story", "reels"]},
             "video_label": {"name": "vertical916"}, "priority": 2},
        ],
    }
    story = {"page_id": page_id}
    if ig:
        story["instagram_user_id"] = ig
    fields = {"name": ad_name(item), "object_story_spec": story, "asset_feed_spec": afs}
    if "value" in cta and cta["value"].get("lead_gen_form_id"):
        afs["call_to_actions"] = [cta]
    return fields


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="wirklich hochladen und Anzeigen pausiert anlegen")
    args = ap.parse_args()

    missing = [fname(i, f) for i in PLAN for f in ("916", "45") if not (OUT / fname(i, f)).exists()]
    print(f"Plan: {len(PLAN)} Anzeigen, {len(PLAN) * 2} Videos")
    for i in PLAN:
        print(f"  {i['target']:12s} {ad_name(i)}")
    if missing:
        sys.exit(f"{len(missing)} Videodateien fehlen in out/ – zuerst: npm run render:all")

    tmpl_ad, tmpl = find_template()
    adsets = find_adsets()
    print(f"\nVorlage: {tmpl_ad['name']} ({tmpl_ad['id']}) · CTA/Formular aus Creative {tmpl_ad['creative']['id']}")
    print(json.dumps({k: v for k, v in tmpl.items() if k != "id"}, ensure_ascii=False, indent=1)[:1500])
    for k, s in adsets.items():
        print(f"Anzeigengruppe {k}: {s['name']} ({s['id']}, Status {s['status']})")
    if not args.apply:
        print("\nProbelauf beendet. Mit --apply werden die Anzeigen PAUSIERT angelegt.")
        return

    log = []
    for item in PLAN:
        f916, f45 = OUT / fname(item, "916"), OUT / fname(item, "45")
        v916 = post(f"{ACCOUNT}/advideos", base=VIDEO_API, files={"source": f916}, name=f916.stem)["id"]
        v45 = post(f"{ACCOUNT}/advideos", base=VIDEO_API, files={"source": f45}, name=f45.stem)["id"]
        wait_ready(v916); wait_ready(v45)
        img = post(f"{ACCOUNT}/adimages", files={"filename": thumbnail(f916)})["images"]
        img_hash = next(iter(img.values()))["hash"]
        creative = post(f"{ACCOUNT}/adcreatives", **build_creative(tmpl, item, v916, v45, img_hash))["id"]
        ad = post(f"{ACCOUNT}/ads", name=ad_name(item), adset_id=adsets[item["target"]]["id"],
                  creative={"creative_id": creative}, status="PAUSED")["id"]
        log.append({**item, "video_916": v916, "video_45": v45, "creative": creative, "ad": ad, "status": "PAUSED"})
        print(f"✓ {ad_name(item)} → Anzeige {ad} (pausiert)")
    (ROOT / "qa/meta_upload_log.json").write_text(json.dumps(log, ensure_ascii=False, indent=1))
    print(f"\n{len(log)} Anzeigen pausiert angelegt. Protokoll: qa/meta_upload_log.json")


if __name__ == "__main__":
    main()
