"""Generate contact portraits for one figure.

    python3 scripts/gen-portraits.py sushi [id ...]

Reads scripts/portraits/<figure>.json ({contact id: subject}), asks an image
model on OpenRouter for each, and writes public/portraits/<figure>/<id>.webp
(320px square). Every portrait shares STYLE so the set stays consistent.
"""
import base64, io, json, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from PIL import Image

MODEL = "google/gemini-3.1-flash-image"
STYLE = (
    "Square avatar portrait, head and shoulders, subject centered and facing the viewer, face in the upper middle, "
    "plain warm aged-silk background. Style: refined Chinese gongbi painting, fine ink outlines, soft mineral colors "
    "on silk, elegant and clean. No text, no seal, no border, no frame."
)

def generate(subject: str) -> bytes:
    body = {"model": MODEL, "modalities": ["image", "text"],
            "messages": [{"role": "user", "content": f"{STYLE} Subject: {subject}."}]}
    req = urllib.request.Request("https://openrouter.ai/api/v1/chat/completions", data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json"})
    msg = json.load(urllib.request.urlopen(req, timeout=240))["choices"][0]["message"]
    return base64.b64decode(msg["images"][0]["image_url"]["url"].split(",", 1)[1])

def main():
    figure, only = sys.argv[1], set(sys.argv[2:])
    root = Path(__file__).resolve().parent.parent
    subjects = json.loads((root / f"scripts/portraits/{figure}.json").read_text())
    out = root / f"public/portraits/{figure}"
    out.mkdir(parents=True, exist_ok=True)

    def one(item):
        cid, subject = item
        im = Image.open(io.BytesIO(generate(subject))).convert("RGB")
        s = min(im.size)
        im = im.crop(((im.width - s) // 2, (im.height - s) // 2, (im.width + s) // 2, (im.height + s) // 2))
        im.resize((320, 320), Image.LANCZOS).save(out / f"{cid}.webp", quality=82)
        return cid

    todo = [(k, v) for k, v in subjects.items() if not only or k in only]
    with ThreadPoolExecutor(6) as pool:
        for cid in pool.map(one, todo):
            print("wrote", out / f"{cid}.webp")

main()
