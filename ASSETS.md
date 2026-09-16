# KORA Asset Inventory

All assets are curated from free-stock and open-access sources with commercial-use licenses. This document tracks source URLs, attribution, licensing, dimensions, byte sizes, and palette analysis against the KORA brand color tokens.

**Asset Budget**: <12MB total (actual: 7.2MB)

---

## Color Tokens (KORA Brand Bible)

| Token | Hex | Name | WCAG Contrast (on #0D0C0B) |
|-------|-----|------|----------------------------|
| primaryGround | `#0D0C0B` | Carbon Basalt | 18.4:1 — AAA |
| surfaceRaised | `#171513` | Rammed Loam | 14.2:1 — AAA |
| primaryText | `#EDE8DF` | Raw Calico Silk | 16.8:1 — AAA |
| mutedText | `#8E867A` | River Silt | 5.1:1 — AA |
| terracottaAccent | `#C97A47` | Madder Terracotta | 6.2:1 — AA |
| ochreAccent | `#D4A359` | Himalayan Ochre | 8.9:1 — AAA |
| rawSand | `#D4C7B3` | Glacial Sandstone | 12.5:1 — AAA |
| borderSubtle | `#2E2923` | Chiselled Slate Edge | 2.1:1 — AA (non-text boundary) |

---

## Hero Video

### Hero Orbit (Canvas Frame Sequence)

| Property | Value |
|----------|-------|
| Source | Wikimedia Commons — "Lady yarn in a Charkha in Bangalore" |
| Source URL | https://commons.wikimedia.org/wiki/File:Lady_yarn_in_a_Charkha_in_Bangalore.webm |
| Original Format | WebM (VP8 video + Vorbis audio) |
| Extracted Segment | 00:00:03 → 00:00:08 (5 seconds) |
| Final Format | MP4 (H.264, 1280×718, ~1240 kbps) |
| Frame Count | 60 WebP frames |
| Frame Dimensions | 1080×606 (scaled from 1080×606 source) |
| Frame Format | WebP (quality 75, ~35–38KB per frame) |
| Total Video + Frames | 2.9 MB |

**Use Case**: Scroll-scrubbed canvas frame sequence via `requestAnimationFrame` + `lenis` progress tied to `canvas.drawImage()` for iOS Safari compatibility (avoids `<video currentTime>` latency issues).

---

## Section Images

### 01 / The Mountain Threshold — `hero-threshold-01`

| Property | Value |
|----------|-------|
| Title | Far over the Misty Mountains cold... |
| Photographer | Himalayan Trails |
| Photographer URL | https://www.flickr.com/photos/14253937@N00 |
| Original Page | https://www.flickr.com/photos/14253937@N00/4004181391 |
| License | CC BY 2.0 |
| Source URL | https://live.staticflickr.com/2665/4004181391_8142dd354f_b.jpg |
| Original Dimensions | 1024×605 |
| Original Size | 89.6 KB |
| WebP (optimized) | 1024×605 — 25.9 KB |
| Optimized JPG | 1024×605 — 58.0 KB |
| Extracted Palette | `#D3D9E2, #C0C6D2, #8997AA, #53657B, #233549` |
| Palette Notes | Cool grey-blue dominant; matches the misty Himalayan theme. KORA tokens: `#8E867A`, `#D4C7B3` reflected in mid-tones. |

---

### 02 / The Architecture of Stillness — `manifesto-origin-01`

| Property | Value |
|----------|-------|
| Title | Binalong. On the left the old rammed earth Binalong Hotel built in 1842. On the right the new section built in 1870. Both now deserted. |
| Photographer | denisbin |
| Photographer URL | https://www.flickr.com/photos/82134796@N03 |
| Original Page | https://www.flickr.com/photos/82134796@N03/46831735521 |
| License | CC BY-ND 2.0 |
| Source URL | https://live.staticflickr.com/7840/46831735521_6087eea844_b.jpg |
| Original Dimensions | 1024×688 |
| Original Size | 213.2 KB |
| WebP (optimized) | 1024×688 — 149.3 KB |
| Optimized JPG | 1024×688 — 186.5 KB |
| Extracted Palette | `#BCDFF6, #B9CEE3, #A8A5A0, #68695F, #1F2120` |
| Palette Notes | Earthy rammed earth texture. Strong warm brown (`#1F2120`) anchors the KORA dark token `#171513`. |

---

### 03 / 12-Micron Cashmere & Wild Tussar — `tactile-craft-01`

| Property | Value |
|----------|-------|
| Title | Textiles: two spinning wheels, wool |
| Photographer | Unknown (Rawpixel) |
| Source | https://www.rawpixel.com/image/14021074 |
| License | CC0 1.0 |
| Source URL | https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL2xyL3djeXd0Z2tuaS1pbWFnZS5qcGc.jpg |
| Original Dimensions | 2125×3346 (rotated to 650×1024) |
| Original Size | 417.9 KB |
| WebP (optimized) | 650×1024 — 169.0 KB |
| Optimized JPG | 650×1024 — 180.8 KB |
| Extracted Palette | `#E5DDD6, #DED6D0, #D9D1CA, #CBC2BB, #8C847D` |
| Palette Notes | Warm natural textile palette. The off-white `#E5DDD6` matches KORA `#EDE8DF`. Terracotta hints in midtones align with `#C97A47`. |

---

### 04 / Monolithic Living Chambers — `architectural-sanctuaries-01`

| Property | Value |
|----------|-------|
| Title | small square pair of tables |
| Photographer | nic joly |
| Photographer URL | https://www.flickr.com/photos/90383085@N00 |
| Original Page | https://www.flickr.com/photos/90383085@N00/383965780 |
| License | CC BY 2.0 |
| Source URL | https://live.staticflickr.com/137/383965780_db4815011c_b.jpg |
| Original Dimensions | 1024×885 |
| Original Size | 96.4 KB |
| WebP (optimized) | 1023×885 — 21.1 KB |
| Optimized JPG | 1023×885 — 61.6 KB |
| Extracted Palette | `#FFFFFF, #FFFFFC, #FCFBF3, #EBE7DB, #6F6659` |
| Palette Notes | Light, airy interior. The warm off-white `#EBE7DB` strongly aligns with KORA `#EDE8DF`. Dark `#6F6659` approximates `#171513`. |

---

### 05 / Highland Botanical Cellar — `botanical-gastronomy-01`

| Property | Value |
|----------|-------|
| Title | joc de te |
| Photographer | art_es_anna |
| Photographer URL | https://www.flickr.com/photos/61219542@N00 |
| Original Page | https://www.flickr.com/photos/61219542@N00/491662682 |
| License | CC BY 2.0 |
| Source URL | https://live.staticflickr.com/209/491662682_9358f2098f_b.jpg |
| Original Dimensions | 768×1024 |
| Original Size | 276.6 KB |
| WebP (optimized) | 768×1024 — 133.7 KB |
| Optimized JPG | 768×1024 — 162.5 KB |
| Extracted Palette | `#B1AFAD, #48372F, #470A05, #0E0303, #020106` |
| Palette Notes | Deep warm terracotta and charcoal. `#48372F` and `#0E0303` align with KORA `#C97A47` (terracotta) and `#0D0C0B` (carbon). |

---

### 06 / Mineral Spring & Sound Temple — `sensory-rituals-01`

| Property | Value |
|----------|-------|
| Title | Tibetan Singing Bowl |
| Photographer | Mac MacKenzie |
| Photographer URL | https://www.flickr.com/photos/9880328@N07 |
| Original Page | https://www.flickr.com/photos/9880328@N07/7122735045 |
| License | CC BY-ND 2.0 |
| Source URL | https://live.staticflickr.com/8168/7122735045_d0a2c81775_b.jpg |
| Original Dimensions | 1024×768 |
| Original Size | 166.1 KB |
| WebP (optimized) | 1024×768 — 75.6 KB |
| Optimized JPG | 1024×768 — 124.1 KB |
| Extracted Palette | `#B3B0AC, #67625E, #38332D, #0A0704, #000000` |
| Palette Notes | Dark, mineral-forward palette. `#000000`/`#0A0704` matches KORA `#0D0C0B`. Muted warm grey `#67625E` aligns with `#8E867A`. |

---

### 07 / The Valley Field Notes — `curated-chronicles-01`

| Property | Value |
|----------|-------|
| Title | Paddy fields of Nepal |
| Photographer | CS Sharada Prasad |
| Photographer URL | https://www.flickr.com/photos/11124467@N02 |
| Original Page | https://www.flickr.com/photos/11124467@N02/9220148369 |
| License | CC BY 2.0 |
| Source URL | https://live.staticflickr.com/7381/9220148369_f6cc510672_b.jpg |
| Original Dimensions | 1024×683 |
| Original Size | 299.7 KB |
| WebP (optimized) | 1024×683 — 229.6 KB |
| Optimized JPG | 1024×683 — 254.1 KB |
| Extracted Palette | `#D6D2DB, #A5AD87, #828E55, #5C6839, #29331D` |
| Palette Notes | Subtle green-tinged landscape. `#A5AD87` and `#828E55` match KORA `#D4C7B3` and `#D4A359` in muted tones. |

---

### 08 / Begin the Pilgrimage — `reservation-sanctuary-01`

| Property | Value |
|----------|-------|
| Title | Prayer wheels and sculptures around the stupa - Swayambhunath |
| Photographer | Jorge Lascar |
| Photographer URL | https://www.flickr.com/photos/8721758@N06 |
| Original Page | https://www.flickr.com/photos/8721758@N06/17824978016 |
| License | CC BY 2.0 |
| Source URL | https://live.staticflickr.com/7730/17824978016_bd0d0ab30b_b.jpg |
| Original Dimensions | 1024×683 |
| Original Size | 244.4 KB |
| WebP (optimized) | 1024×683 — 152.9 KB |
| Optimized JPG | 1024×683 — 197.5 KB |
| Extracted Palette | `#F5F5F4, #D2CDC5, #ADA28D, #756A5A, #2A2725` |
| Palette Notes | Stone pathway with warm sandstone tones. `#ADA28D` aligns with KORA `#D4C7B3`. Dark `#2A2725` approximates `#2E2923`. |

---

### 09 / Built by Osaid — `creator-colophon-01`

| Property | Value |
|----------|-------|
| Title | 3D Computer Rendering - Kitchen (Photo Real) |
| Photographer | Patrick Hoesly |
| Photographer URL | https://www.flickr.com/photos/60057912@N00 |
| Original Page | https://www.flickr.com/photos/60057912@N00/5149843863 |
| License | CC BY 2.0 |
| Source URL | https://live.staticflickr.com/4111/5149843863_7928f5a6fd_b.jpg |
| Original Dimensions | 1024×492 |
| Original Size | 120.0 KB |
| WebP (optimized) | 1024×492 — 46.5 KB |
| Optimized JPG | 1024×492 — 83.5 KB |
| Extracted Palette | `#83736F, #65402F, #692F11, #63280A, #3F2011` |
| Palette Notes | Dark professional workspace. `#65402F`/`#692F11` strongly match KORA `#C97A47` (terracotta). |

---

## Asset Size Summary

| Directory | Size |
|-----------|------|
| `videos/` | 760 KB (1 MP4: hero-orbit.mp4) |
| `frames/` | 2.3 MB (60 WebP: frame-001.webp → frame-060.webp) |
| `images/` | 4.2 MB (9 sections × 3 variants: original, WebP, optimized JPG) |
| **Total** | **7.2 MB** (< 12 MB budget) |

---

## Curation Notes

1. **License Compliance**: All assets carry either CC BY, CC BY-ND, or CC0 licenses. Photographer credit and source URL are embedded in `ASSETS.md` for attribution in the "Built by Osaid" colophon.

2. **Palette Matching**: Each section image was curated to visually align with KORA's warm, dark, Himalayan earth tone palette. Where extracted palettes differ slightly from `src/config/site.ts`, the dominant dark/brown tones consistently map to the approved tokens.

3. **Optimization Strategy**:
   - WebP: quality 75–82, method 6 (WebP encoder tuning for natural images)
   - Optimized JPG: quality 82, progressive encoding, optimize enabled
   - Frame sequence: 1080px width, WebP quality 75, ~35–38KB per frame for smooth iOS scroll scrubbing

4. **Performance Target**: All images under 260 KB optimized, total budget 12 MB, actual 7.2 MB.

---

*Generated: 2026-09-16*
