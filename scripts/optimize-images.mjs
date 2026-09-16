import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const IMAGES_DIR = "/Users/osaid/3d-interactive-website/public/assets/images";
const MANIFEST_PATH = "/Users/osaid/3d-interactive-website/scripts/curation-manifest.json";

async function optimize() {
  console.log("=== OPTIMIZING SECTION HERO IMAGES ===\n");

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  const pythonScript = `
import os
import sys
import json
from PIL import Image

images_dir = "${IMAGES_DIR}"
manifest_path = "${MANIFEST_PATH}"

with open(manifest_path, "r") as f:
    data = json.load(f)

updated_images = []

for item in data.get("images", []):
    orig_rel = item["localOriginal"]
    orig_path = os.path.join("/Users/osaid/3d-interactive-website/public", orig_rel.lstrip("/"))

    if not os.path.exists(orig_path):
        print(f"Warning: {orig_path} does not exist", file=sys.stderr)
        continue

    base_name = item["sectionId"]
    webp_name = f"{base_name}.webp"
    jpg_opt_name = f"{base_name}.opt.jpg"
    webp_path = os.path.join(images_dir, webp_name)
    jpg_opt_path = os.path.join(images_dir, jpg_opt_name)

    img = Image.open(orig_path)
    # Convert RGBA/P to RGB if needed
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    orig_w, orig_h = img.size

    # Target max width 1600px for web hero display
    max_w = 1600
    if orig_w > max_w:
        new_h = int(orig_h * (max_w / orig_w))
        img_resized = img.resize((max_w, new_h), Image.Resampling.LANCZOS)
    else:
        img_resized = img.copy()

    # Save optimized WebP
    img_resized.save(webp_path, "WEBP", quality=82, method=6)
    webp_size = os.path.getsize(webp_path)

    # Save optimized fallback JPEG
    img_resized.save(jpg_opt_path, "JPEG", quality=82, optimize=True)
    jpg_size = os.path.getsize(jpg_opt_path)

    print(f"✓ {base_name}:")
    print(f"   Original: {orig_w}x{orig_h} ({item.get('filesizeOriginalBytes', 0)/1024:.1f} KB)")
    print(f"   WebP:     {img_resized.width}x{img_resized.height} ({webp_size/1024:.1f} KB)")
    print(f"   Opt JPG:  {img_resized.width}x{img_resized.height} ({jpg_size/1024:.1f} KB)")

    item["webpPath"] = f"/assets/images/{webp_name}"
    item["webpSizeBytes"] = webp_size
    item["optimizedJpgPath"] = f"/assets/images/{jpg_opt_name}"
    item["optimizedJpgSizeBytes"] = jpg_size
    item["renderWidth"] = img_resized.width
    item["renderHeight"] = img_resized.height

    updated_images.append(item)

data["images"] = updated_images
with open(manifest_path, "w") as f:
    json.dump(data, f, indent=2)

print("\\n✓ Curation manifest updated with optimization stats.")
`;

  fs.writeFileSync("/tmp/optimize-images.py", pythonScript);
  execSync("python3 /tmp/optimize-images.py", { stdio: "inherit" });
}

optimize().catch(console.error);
