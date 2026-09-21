<div align="center">

# KORA

### The Architecture of Stillness

**A cinematic Himalayan hospitality concept exploring architecture, living craft, spatial storytelling, and immersive interaction on the web.**

<br />

[![Live Experience](https://img.shields.io/badge/ENTER_THE_EXPERIENCE-0D0C0B?style=for-the-badge&logo=vercel&logoColor=EDE8DF)](https://3d-interactive-website-ashen.vercel.app)

<br />

`CREATIVE DEVELOPMENT` · `3D EXPERIENCE` · `DIGITAL STORYTELLING` · `HOSPITALITY CONCEPT`

</div>

---

## KORA

**KORA (སྐོར་ར)** is a fictional high-Himalayan heritage sanctuary and living craft estate imagined across Upper Mustang and the Kathmandu Valley.

This project was built as a creative-development study in how a hospitality website can feel less like a booking interface and more like **entering a place**.

Instead of relying on conventional hotel-site patterns, KORA uses restrained typography, layered depth, 3D environments, scroll choreography, material-inspired color, and deliberate pacing to create a quieter and more architectural digital experience.

> **Concept project — not a real hotel or commercial hospitality brand.**

---

## The Idea

The project began with one question:

### What if a hospitality website felt like entering the property instead of browsing a brochure?

KORA explores that idea through a visual language inspired by:

- Himalayan stone and rammed earth
- high-altitude light and shadow
- handloom textiles and living craft
- monolithic architecture
- editorial luxury
- slow, cinematic interaction

The goal was not to add as many effects as possible.

The goal was to make **motion, 3D, typography, and interaction feel like parts of the same world**.

---

## Experience

### 01 / The Mountain Threshold

An immersive opening sequence introduces KORA through a spatial Himalayan environment and establishes the site's visual language immediately.

### 02 / Architecture of Stillness

Editorial typography, material-driven composition, and restrained motion frame the fictional sanctuary as an architectural object rather than a conventional hotel product.

### 03 / The Living Atelier

The project connects Himalayan hospitality with ideas of handloom craft, cashmere, silk, provenance, and tactile material storytelling.

### 04 / Spatial Light

3D lighting and scroll-driven transitions are used to suggest changing atmosphere and time rather than treating Three.js as decoration.

### 05 / Slow Interaction

Lenis and GSAP create a controlled browsing rhythm where motion guides attention without making body content difficult to read.

---

## Built Around Interaction

```text
SCROLL
   ↓
CAMERA / DEPTH
   ↓
LIGHT / TYPOGRAPHY / MATERIAL
   ↓
ATMOSPHERE
   ↓
STORY
```

KORA treats animation as part of the interface hierarchy.

Large transitions carry architectural weight, smaller interactions remain tactile, and structural elements stay visually stable so the experience never turns into a collection of disconnected effects.

---

## Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-111111?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-111111?style=for-the-badge&logo=typescript&logoColor=3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-111111?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4)

![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-111111?style=for-the-badge&logo=react&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-111111?style=for-the-badge&logo=greensock&logoColor=88CE02)
![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-111111?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

| Layer | Technology |
|---|---|
| Framework | Next.js 15 / App Router |
| Interface | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| 3D | Three.js + React Three Fiber + Drei |
| Motion | GSAP |
| Scroll Physics | Lenis |
| Deployment | Vercel |

---

## Design System

KORA's palette is taken from imagined Himalayan materials rather than generic UI colors.

| Token | Hex | Reference |
|---|---|---|
| Carbon Basalt | `#0D0C0B` | smoked mountain slate |
| Rammed Loam | `#171513` | packed earth |
| Raw Calico Silk | `#EDE8DF` | unbleached hand-spun silk |
| River Silt | `#8E867A` | glacial sediment |
| Madder Terracotta | `#C97A47` | natural dye |
| Himalayan Ochre | `#D4A359` | temple brass / beeswax |
| Glacial Sandstone | `#D4C7B3` | weathered stone |

Typography pairs **Cormorant Garamond** for the heritage/editorial voice with **Plus Jakarta Sans** for contemporary interface clarity.

---

## Design Principles

**Less interface. More atmosphere.**

The visual system removes unnecessary chrome so the experience remains focused on place, material, and story.

**Motion needs a reason.**

Animation establishes hierarchy, continuity, depth, or feedback. It is not added simply because the browser can animate something.

**Technology stays behind the experience.**

Three.js, R3F, GSAP, and Lenis are implementation tools. The visitor should remember KORA before remembering the stack.

**Whitespace is structural.**

Empty space is treated as part of the composition rather than unused screen area.

---

## Project Structure

```text
KORA
├── immersive 3D scenes
├── editorial storytelling
├── scroll-driven motion
├── material-inspired design system
├── responsive interaction
└── conversion layer / Built by Osaid
```

The concept is intentionally positioned between:

### luxury hospitality × architectural editorial × interactive exhibition

---

## Local Development

Clone the repository:

```bash
git clone https://github.com/osaid829/osaid-portfolio.git
cd osaid-portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

---

## Why I Built It

KORA was built to push beyond the kind of frontend project that can be described as simply a polished landing page.

I wanted to explore how **3D composition, motion systems, typography, visual identity, and normal web development could live inside one coherent experience**.

It is also a portfolio experiment in designing an entire fictional brand from the ground up — not only implementing screens, but defining the concept, visual direction, interaction language, and final frontend execution.

---

## Live Experience

<div align="center">

### [→ Enter KORA](https://3d-interactive-website-ashen.vercel.app)

For the intended experience, view the site on a modern desktop browser with hardware acceleration enabled.

</div>

---

## Status

```text
PROJECT      KORA
TYPE         Fictional Hospitality Concept
STATUS       Active
FOCUS        Creative Frontend / 3D
STACK        Next.js · R3F · GSAP · Lenis
DEPLOYMENT   Vercel
```

The project may continue to evolve as I experiment with stronger motion systems, 3D composition, shaders, responsive interaction, and performance.

---

<div align="center">

# KORA

**Digital spaces should be experienced, not just viewed.**

<br />

[Live Experience](https://3d-interactive-website-ashen.vercel.app) ·
[GitHub Profile](https://github.com/osaid829)

<br /><br />

Designed & built by **Osaid**

</div>
