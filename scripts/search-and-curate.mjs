import fs from "fs";
import path from "path";

const PEXELS_KEY = process.env.PEXELS_KEY;
const HEADERS = {
  Authorization: PEXELS_KEY,
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Fetch with retry + backoff. The public Pexels demo key is shared, so
 *  burst requests intermittently 401 — treat those as rate-limit and retry. */
async function fetchRetry(url, headers, tries = 4) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    const res = await fetch(url, { headers });
    if (res.ok) return res;
    if (attempt === tries) return res;
    const delay = 600 * attempt + Math.floor(Math.random() * 400);
    console.error(`      ↻ HTTP ${res.status} (attempt ${attempt}/${tries}) — retrying in ${delay}ms`);
    await sleep(delay);
  }
  throw new Error("unreachable");
}

const SECTION_QUERIES = [
  {
    section: "hero-threshold",
    sectionName: "01 / The Mountain Threshold",
    queries: ["dark mountain peak fog", "himalaya mountain moody", "dramatic mountain ridge mist"],
    targetFile: "hero-threshold-01",
    paletteExpectation: "#0D0C0B, #8E867A, #D4C7B3"
  },
  {
    section: "manifesto-origin",
    sectionName: "02 / The Architecture of Stillness",
    queries: ["rammed earth texture", "dark stone wall architecture", "monolithic stone texture"],
    targetFile: "manifesto-origin-01",
    paletteExpectation: "#171513, #0D0C0B, #2E2923"
  },
  {
    section: "tactile-craft",
    sectionName: "03 / 12-Micron Cashmere & Wild Tussar",
    queries: ["spinning wheel yarn", "handloom weaving fabric", "raw silk yarn texture", "textile weave macro"],
    targetFile: "tactile-craft-01",
    paletteExpectation: "#EDE8DF, #C97A47, #D4A359"
  },
  {
    section: "architectural-sanctuaries",
    sectionName: "04 / Monolithic Living Chambers",
    queries: ["minimalist dark bedroom wood stone", "wabi sabi interior warm light", "luxury dark stone interior"],
    targetFile: "architectural-sanctuaries-01",
    paletteExpectation: "#171513, #D4A359, #EDE8DF"
  },
  {
    section: "botanical-gastronomy",
    sectionName: "05 / Highland Botanical Cellar",
    queries: ["dark tea ceremony pottery", "dried herbal tea dark background", "rustic ceramic dark table food"],
    targetFile: "botanical-gastronomy-01",
    paletteExpectation: "#C97A47, #D4A359, #0D0C0B"
  },
  {
    section: "sensory-rituals",
    sectionName: "06 / Mineral Spring & Sound Temple",
    queries: ["tibetan singing bowl bronze", "dark water ripple reflection", "steaming thermal bath dark"],
    targetFile: "sensory-rituals-01",
    paletteExpectation: "#D4A359, #0D0C0B, #8E867A"
  },
  {
    section: "curated-chronicles",
    sectionName: "07 / The Valley Field Notes",
    queries: ["misty mountain valley landscape", "artisan hands carving craft", "nepal mountain landscape morning"],
    targetFile: "curated-chronicles-01",
    paletteExpectation: "#D4C7B3, #8E867A, #C97A47"
  },
  {
    section: "reservation-sanctuary",
    sectionName: "08 / Begin the Pilgrimage",
    queries: ["stone steps mist mountain monastery", "minimalist stone architecture courtyard", "dark pathway mountain mist"],
    targetFile: "reservation-sanctuary-01",
    paletteExpectation: "#0D0C0B, #D4C7B3, #171513"
  },
  {
    section: "creator-colophon",
    sectionName: "09 / Built by Osaid",
    queries: ["dark metal texture minimalist", "architect desk dark mood", "precision metal craft tools"],
    targetFile: "creator-colophon-01",
    paletteExpectation: "#0D0C0B, #D4A359, #EDE8DF"
  }
];

async function searchPexels(query, perPage = 5) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
  const res = await fetchRetry(url, HEADERS);
  if (!res.ok) throw new Error(`Pexels API error: ${res.status}`);
  return await res.json();
}

async function searchPexelsVideos(query, perPage = 5) {
  const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
  const res = await fetchRetry(url, HEADERS);
  if (!res.ok) throw new Error(`Pexels Video API error: ${res.status}`);
  return await res.json();
}

async function run() {
  console.log("=== STEP 2: SEARCHING & CURATING KORA ASSETS ===\n");
  const curatedResults = [];

  for (const item of SECTION_QUERIES) {
    console.log(`\n----------------------------------------`);
    console.log(`Section: ${item.sectionName}`);
    let found = null;

    for (const q of item.queries) {
      console.log(`  Searching query: "${q}"...`);
      try {
        const data = await searchPexels(q, 4);
        if (data.photos && data.photos.length > 0) {
          // Select photo with best color/mood match
          const photo = data.photos[0];
          console.log(`    ✓ Match found: ID ${photo.id} by ${photo.photographer} | Avg Color: ${photo.avg_color}`);
          console.log(`      URL: ${photo.url}`);
          found = {
            section: item.section,
            sectionName: item.sectionName,
            targetFile: item.targetFile,
            photoId: photo.id,
            photographer: photo.photographer,
            pageUrl: photo.url,
            avgColor: photo.avg_color,
            alt: photo.alt,
            downloadUrl: photo.src.large2x || photo.src.large || photo.src.original,
            width: photo.width,
            height: photo.height,
            paletteExpectation: item.paletteExpectation
          };
          break;
        }
      } catch (err) {
        console.error(`    Error searching "${q}":`, err.message);
      }
    }

    if (found) {
      curatedResults.push(found);
    } else {
      console.warn(`    ⚠️ No photo found for section: ${item.sectionName}`);
    }
  }

  // Search for hero video
  console.log(`\n----------------------------------------`);
  console.log(`Searching Hero Orbit Video...`);
  const videoQueries = ["pottery wheel spinning slow motion", "spinning wheel yarn", "handloom spinning", "fabric silk flow dark", "rotating stone sculpture"];
  let heroVideo = null;

  for (const vq of videoQueries) {
    console.log(`  Searching video query: "${vq}"...`);
    try {
      const vdata = await searchPexelsVideos(vq, 3);
      if (vdata.videos && vdata.videos.length > 0) {
        const vid = vdata.videos[0];
        console.log(`    ✓ Hero video found: ID ${vid.id} | Duration: ${vid.duration}s`);
        console.log(`      URL: ${vid.url}`);
        // Find best quality video file (HD/1080p or 4K)
        const vfile = vid.video_files.find(f => f.quality === "hd" && f.width >= 1280) || vid.video_files[0];
        heroVideo = {
          videoId: vid.id,
          photographer: vid.user.name,
          pageUrl: vid.url,
          duration: vid.duration,
          width: vfile.width,
          height: vfile.height,
          downloadUrl: vfile.link
        };
        break;
      }
    } catch (err) {
      console.error(`    Error searching video "${vq}":`, err.message);
    }
  }

  // Save curated plan to json
  const plan = { images: curatedResults, video: heroVideo };
  fs.writeFileSync("/Users/osaid/3d-interactive-website/scripts/curation-manifest.json", JSON.stringify(plan, null, 2));
  console.log(`\n✓ Curation manifest written to scripts/curation-manifest.json`);
}

run();
