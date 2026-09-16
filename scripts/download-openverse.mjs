import fs from "fs";
import path from "path";

async function downloadImage(url, outputPath) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(outputPath, buffer);
    return { success: true, size: buffer.length };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function searchOpenverse(query, pageSize = 5) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=${pageSize}&license_type=commercial`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    }
  });
  if (!res.ok) throw new Error(`Openverse API error: ${res.status}`);
  return await res.json();
}

const SECTIONS = [
  {
    id: "hero-threshold-01",
    sectionName: "01 / The Mountain Threshold",
    queries: ["himalaya mountain mist", "himalayas mountain peak", "mountain fog landscape", "dramatic mountain peak"],
    paletteExpectation: "#0D0C0B, #8E867A, #D4C7B3"
  },
  {
    id: "manifesto-origin-01",
    sectionName: "02 / The Architecture of Stillness",
    queries: ["rammed earth", "stone wall texture", "ancient stone monastery", "himalayan stone architecture"],
    paletteExpectation: "#171513, #0D0C0B, #2E2923"
  },
  {
    id: "tactile-craft-01",
    sectionName: "03 / 12-Micron Cashmere & Wild Tussar",
    queries: ["spinning wheel wool", "handloom weaving", "loom weaving textile", "spinning yarn thread"],
    paletteExpectation: "#EDE8DF, #C97A47, #D4A359"
  },
  {
    id: "architectural-sanctuaries-01",
    sectionName: "04 / Monolithic Living Chambers",
    queries: ["minimalist interior stone wood", "traditional nepali house interior", "rustic stone bedroom wood", "japanese wabi sabi interior"],
    paletteExpectation: "#171513, #D4A359, #EDE8DF"
  },
  {
    id: "botanical-gastronomy-01",
    sectionName: "05 / Highland Botanical Cellar",
    queries: ["tea ceremony pottery", "ceramic bowl tea dark", "dried herbal tea herbs", "rustic ceramic dark table"],
    paletteExpectation: "#C97A47, #D4A359, #0D0C0B"
  },
  {
    id: "sensory-rituals-01",
    sectionName: "06 / Mineral Spring & Sound Temple",
    queries: ["tibetan singing bowl", "singing bowl bronze", "thermal bath steam", "dark water reflection ripple"],
    paletteExpectation: "#D4A359, #0D0C0B, #8E867A"
  },
  {
    id: "curated-chronicles-01",
    sectionName: "07 / The Valley Field Notes",
    queries: ["nepal mountain valley village", "kathmandu valley landscape", "mustang nepal landscape", "himalayan valley landscape"],
    paletteExpectation: "#D4C7B3, #8E867A, #C97A47"
  },
  {
    id: "reservation-sanctuary-01",
    sectionName: "08 / Begin the Pilgrimage",
    queries: ["buddhist monastery stone steps", "ancient mountain monastery nepal", "tibet monastery courtyard stone", "stone path mountain mist"],
    paletteExpectation: "#0D0C0B, #D4C7B3, #171513"
  },
  {
    id: "creator-colophon-01",
    sectionName: "09 / Built by Osaid",
    queries: ["architecture workspace desk dark", "architectural drawing drafting room", "architect studio desk", "architectural drafting room dark"],
    paletteExpectation: "#0D0C0B, #D4A359, #EDE8DF"
  }
];

async function run() {
  console.log("=== CURATING AND DOWNLOADING KORA ASSETS ===\n");
  const imagesDir = "/Users/osaid/3d-interactive-website/public/assets/images";
  fs.mkdirSync(imagesDir, { recursive: true });

  const curatedList = [];

  for (const item of SECTIONS) {
    console.log(`\n----------------------------------------`);
    console.log(`Section: ${item.sectionName}`);
    let success = false;

    for (const q of item.queries) {
      console.log(`  Searching query: "${q}"...`);
      try {
        const data = await searchOpenverse(q, 3);
        if (data.results && data.results.length > 0) {
          for (const photo of data.results) {
            const imgUrl = photo.url;
            if (!imgUrl) continue;

            const ext = imgUrl.split(".").pop().split("?")[0] || "jpg";
            const sanitizedExt = ["jpg", "jpeg", "png", "webp"].includes(ext.toLowerCase()) ? ext.toLowerCase() : "jpg";
            const filename = `${item.id}.original.${sanitizedExt}`;
            const targetPath = path.join(imagesDir, filename);

            console.log(`    Attempting download: ${photo.title || "Untitled"} by ${photo.creator || "Unknown"}`);
            console.log(`    URL: ${imgUrl}`);

            const dl = await downloadImage(imgUrl, targetPath);
            if (dl.success && dl.size > 20000) {
              console.log(`    ✓ Saved ${filename} (${(dl.size / 1024).toFixed(1)} KB) | ${photo.width || "N/A"}x${photo.height || "N/A"}`);
              curatedList.push({
                sectionId: item.id,
                sectionName: item.sectionName,
                title: photo.title || "Untitled",
                creator: photo.creator || "Unknown",
                creatorUrl: photo.creator_url || "",
                landingUrl: photo.foreign_landing_url || photo.url,
                sourceUrl: imgUrl,
                license: photo.license,
                licenseVersion: photo.license_version,
                licenseUrl: photo.license_url,
                localOriginal: `/assets/images/${filename}`,
                filesizeOriginalBytes: dl.size,
                width: photo.width,
                height: photo.height,
                paletteExpectation: item.paletteExpectation
              });
              success = true;
              break;
            } else {
              console.log(`    ⚠️ Downloaded file too small or failed (${dl.size} bytes). Trying next candidate.`);
            }
          }
          if (success) break;
        }
      } catch (err) {
        console.error(`    Error searching "${q}":`, err.message);
      }
    }

    if (!success) {
      console.warn(`    ⚠️ Could not find suitable image for ${item.sectionName}`);
    }
  }

  // Write curation JSON
  const manifestPath = "/Users/osaid/3d-interactive-website/scripts/curation-manifest.json";
  fs.writeFileSync(manifestPath, JSON.stringify({ images: curatedList }, null, 2));
  console.log(`\n✓ Curated ${curatedList.length}/${SECTIONS.length} images. Manifest written to scripts/curation-manifest.json`);
}

run();
