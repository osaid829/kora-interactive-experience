import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const VIDEO_URL = "https://upload.wikimedia.org/wikipedia/commons/0/09/Lady_yarn_in_a_Charkha_in_Bangalore.webm";
const VIDEO_ORIGINAL_PATH = "/Users/osaid/3d-interactive-website/public/assets/videos/hero-orbit.original.webm";
const VIDEO_MP4_PATH = "/Users/osaid/3d-interactive-website/public/assets/videos/hero-orbit.mp4";
const FRAMES_DIR = "/Users/osaid/3d-interactive-website/public/assets/frames";
const PNG_FRAMES_DIR = "/Users/osaid/3d-interactive-website/public/assets/frames/png";

async function run() {
  console.log("=== DOWNLOADING AND PROCESSING HERO VIDEO & FRAMES ===\n");

  fs.mkdirSync("/Users/osaid/3d-interactive-website/public/assets/videos", { recursive: true });
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
  fs.mkdirSync(PNG_FRAMES_DIR, { recursive: true });

  console.log("1. Downloading source video...");
  const res = await fetch(VIDEO_URL, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });
  if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(VIDEO_ORIGINAL_PATH, buf);
  console.log(`✓ Saved original video (${(buf.length / 1024 / 1024).toFixed(2)} MB)`);

  console.log("\n2. Trimming to 5s loop and encoding to optimized H.264 MP4...");
  execSync(
    `ffmpeg -y -ss 00:00:03 -i "${VIDEO_ORIGINAL_PATH}" -t 5 -c:v libx264 -crf 24 -preset slow -an -movflags +faststart -vf "scale=1280:-2" "${VIDEO_MP4_PATH}"`,
    { stdio: "inherit" }
  );

  const mp4Stat = fs.statSync(VIDEO_MP4_PATH);
  console.log(`✓ Created web MP4: ${(mp4Stat.size / 1024).toFixed(1)} KB`);

  console.log("\n3. Extracting 60 PNG frames with ffmpeg...");
  execSync(
    `ffmpeg -y -i "${VIDEO_MP4_PATH}" -vf "fps=12,scale=1080:-1" "${PNG_FRAMES_DIR}/frame-%03d.png"`,
    { stdio: "inherit" }
  );

  const pngFrames = fs.readdirSync(PNG_FRAMES_DIR).filter(f => f.endsWith(".png"));
  console.log(`✓ Extracted ${pngFrames.length} PNG frames`);

  console.log("\n4. Converting PNG frames to WebP with Python...");
  const convertScript = `
import os
import sys
from PIL import Image

png_dir = "${PNG_FRAMES_DIR}"
webp_dir = "${FRAMES_DIR}"

if not os.path.exists(webp_dir):
    os.makedirs(webp_dir)

for f in sorted(os.listdir(png_dir)):
    if f.endswith(".png"):
        png_path = os.path.join(png_dir, f)
        webp_path = os.path.join(webp_dir, f.replace(".png", ".webp"))
        try:
            img = Image.open(png_path)
            # Scale to 1080 width for optimized file size
            if img.width > 1080:
                new_height = int(img.height * (1080 / img.width))
                img = img.resize((1080, new_height), Image.Resampling.LANCZOS)
            img.save(webp_path, "WEBP", quality=75, method=6)
            size_kb = os.path.getsize(webp_path) / 1024
            print(f"  {f} -> {size_kb:.1f} KB")
        except Exception as e:
            print(f"  Error: {f} - {e}", file=sys.stderr)
`;
  fs.writeFileSync("/tmp/png-to-webp.py", convertScript);
  execSync("python3 /tmp/png-to-webp.py", { stdio: "inherit" });

  const webpFrames = fs.readdirSync(FRAMES_DIR).filter(f => f.endsWith(".webp"));
  console.log(`✓ Created ${webpFrames.length} WebP frames`);

  let totalFrameBytes = 0;
  for (const f of webpFrames) {
    totalFrameBytes += fs.statSync(path.join(FRAMES_DIR, f)).size;
  }
  console.log(`✓ Total frames size: ${(totalFrameBytes / 1024 / 1024).toFixed(2)} MB`);

  // Cleanup PNG frames (they're intermediate)
  console.log("\n5. Cleaning up intermediate PNG frames...");
  for (const f of pngFrames) {
    fs.unlinkSync(path.join(PNG_FRAMES_DIR, f));
  }
  fs.rmdirSync(PNG_FRAMES_DIR);
  console.log("✓ Cleanup complete");
}

run().catch(console.error);
