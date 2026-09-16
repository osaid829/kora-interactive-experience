import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const MANIFEST_PATH = "/Users/osaid/3d-interactive-website/scripts/curation-manifest.json";

async function analyzePalettes() {
  const pythonScript = `
import json
from PIL import Image
from collections import Counter

manifest_path = "${MANIFEST_PATH}"

with open(manifest_path, "r") as f:
    data = json.load(f)

def rgb_to_hex(r, g, b):
    return f"#{r:02X}{g:02X}{b:02X}"

for item in data.get("images", []):
    webp_path = "/Users/osaid/3d-interactive-website/public" + item["webpPath"]
    img = Image.open(webp_path).convert("RGB")
    # Resize small for fast color quantization
    img_small = img.resize((64, 64))
    pixels = list(img_small.getdata())

    # Quantize to 8-color palette
    quantized = img_small.quantize(colors=5)
    palette = quantized.getpalette()[:15] # 5 RGB triplets

    dominant_hexes = []
    for i in range(0, len(palette), 3):
        r, g, b = palette[i], palette[i+1], palette[i+2]
        dominant_hexes.append(rgb_to_hex(r, g, b))

    item["extractedPalette"] = dominant_hexes
    print(f"{item['sectionId']}: {', '.join(dominant_hexes)}")

with open(manifest_path, "w") as f:
    json.dump(data, f, indent=2)

print("\\n✓ Palette extraction completed.")
`;

  fs.writeFileSync("/tmp/palette-extractor.py", pythonScript);
  execSync("python3 /tmp/palette-extractor.py", { stdio: "inherit" });
}

analyzePalettes().catch(console.error);
