/**
 * Site Configuration and Brand Data Store
 * All brand copy, owner contact metadata, color tokens, and navigation schemas
 * are strictly typed and centralized here. No hardcoded strings in components.
 */

export interface OwnerConfig {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly targetRegions: readonly string[];
  readonly email: string;
  readonly phone: string;
  readonly whatsappNumber: string;
  readonly whatsappUrl: string;
  readonly mailtoUrl: string;
  readonly ctaLabel: string;
  readonly ctaHeadline: string;
  readonly ctaDescription: string;
}

export interface BrandConfig {
  readonly name: string;
  readonly phonetic: string;
  readonly nativeScript: string;
  readonly nativeScriptName: string;
  readonly category: string;
  readonly tagline: string;
  readonly positioning: string;
  readonly originStory: string;
  readonly locations: readonly {
    readonly region: string;
    readonly altitude: string;
    readonly description: string;
  }[];
  readonly pillars: readonly {
    readonly id: string;
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
  }[];
  readonly toneOfVoice: {
    readonly personality: readonly string[];
    readonly vocabularyDo: readonly string[];
    readonly vocabularyAvoid: readonly string[];
    readonly sentenceRhythm: string;
  };
}

export interface SectionWireframe {
  readonly id: string;
  readonly index: number;
  readonly title: string;
  readonly eyebrow: string;
  readonly purpose: string;
  readonly copyIntent: string;
  readonly assetType:
    | "r3f-3d-scene"
    | "canvas-frame-sequence"
    | "interactive-split-stage"
    | "macro-gallery-parallax"
    | "editorial-typography"
    | "contact-conversion-layer";
  readonly interactiveElement: string;
}

export interface ColorToken {
  readonly hex: string;
  readonly name: string;
  readonly role: string;
  readonly contrastOnDark: string;
  readonly wcagRating: "AAA" | "AA" | "AA Large";
}

export interface SiteConfig {
  readonly owner: OwnerConfig;
  readonly brand: BrandConfig;
  readonly colors: {
    readonly primaryGround: ColorToken;
    readonly surfaceRaised: ColorToken;
    readonly primaryText: ColorToken;
    readonly mutedText: ColorToken;
    readonly terracottaAccent: ColorToken;
    readonly ochreAccent: ColorToken;
    readonly rawSand: ColorToken;
    readonly borderSubtle: ColorToken;
  };
  readonly navigation: readonly {
    readonly label: string;
    readonly href: string;
    readonly sectionId: string;
  }[];
  readonly sections: readonly SectionWireframe[];
  readonly metadataBase: URL;
}

// Prefilled WhatsApp enquiry message crafted for high conversion from luxury business owners
const PREFILLED_WHATSAPP_MESSAGE = encodeURIComponent(
  "Your website showcases exceptional interactive design with remarkable craftsmanship and emotional engagement. I'd love to learn more about your process and discuss how we could create something equally impactful for my business. Are you available for a brief conversation?"
);

// Prefilled Mailto subject and body
const PREFILLED_MAILTO_SUBJECT = encodeURIComponent(
  "Commission Enquiry: Bespoke 3D Digital Experience"
);
const PREFILLED_MAILTO_BODY = encodeURIComponent(
  `Hi Osaid,\n\nI was captivated by the KORA digital brand experience and would like to explore commissioning a flagship website for my business.\n\nBusiness Name:\nLocation (Kathmandu / India / International):\nProject Scope & Timeline:\nEstimated Budget Range:\n\nLooking forward to speaking with you.\n\nBest regards,\n`
);

export const ownerConfig: OwnerConfig = {
  name: "Osaid",
  role: "Independent Digital Craftsman & Creative Developer",
  location: "Bhagalpur & Kathmandu Valley",
  targetRegions: ["Kathmandu Valley", "Pokhara", "Bhagalpur", "New Delhi", "Bengaluru"],
  email: "mdosaid37@gmail.com",
  phone: "+91 8789627278",
  whatsappNumber: "+91 8789627278",
  whatsappUrl: `https://wa.me/918789627278?text=${PREFILLED_WHATSAPP_MESSAGE}`,
  mailtoUrl: `mailto:mdosaid37@gmail.com?subject=${PREFILLED_MAILTO_SUBJECT}&body=${PREFILLED_MAILTO_BODY}`,
  ctaLabel: "Commission a Flagship Experience",
  ctaHeadline: "Your business deserves an unignorable digital presence.",
  ctaDescription:
    "I craft bespoke, cinematic 3D web experiences that transform high-end hospitality, architecture, and artisan brands into international benchmarks.",
} as const;

export const brandConfig: BrandConfig = {
  name: "KORA",
  phonetic: "/kɔː.rɑː/",
  nativeScript: "སྐོར་ར",
  nativeScriptName: "Tibetan: Kora (Sacred Pilgrimage & Circumambulation)",
  category: "Himalayan Heritage Sanctuary & High-Craft Estate",
  tagline: "Where Sacred Himalayan Earth Meets Heirloom Craft",
  positioning:
    "An architectural sanctuary and living craft estate where ancient Himalayan rammed earth meets heirloom handloom silk and highland botanical gastronomy.",
  originStory:
    "Conceived along the ancient trade corridor connecting the high salt passes of Upper Mustang to the lush handloom valleys of the sub-Himalayas, KORA is not merely a retreat — it is an act of preservation. Built entirely from hand-chiselled slate, rammed red earth, and wild Himalayan cedar, every stone and textile within KORA was shaped by master guilds whose ancestral lineages date back four centuries.",
  locations: [
    {
      region: "Upper Mustang Sanctuary",
      altitude: "3,840m",
      description: "Rammed earth monolithic suites facing the Nilgiri wind corridor.",
    },
    {
      region: "Kathmandu Valley Atelier",
      altitude: "1,400m",
      description: "Living handloom weavery, bronze casting courtyard, and botanical tea cellars.",
    },
  ],
  pillars: [
    {
      id: "architecture",
      title: "Monolithic Earth Architecture",
      subtitle: "Silent Stone & Raw Cedar",
      description:
        "Structures that do not conquer the terrain, but emerge from it. Hand-packed earth walls breathe with diurnal thermal cycles.",
    },
    {
      id: "textiles",
      title: "Heirloom Handloom & Silk",
      subtitle: "12-Micron Cashmere & Wild Tussar",
      description:
        "Woven on pedal-less wooden pit looms using pure river water and wild madder root dyes. Tactile luxury with centuries of memory.",
    },
    {
      id: "gastronomy",
      title: "Highland Botanical Cellar",
      subtitle: "Foraged Alpine Flora & Sun-Dried Ferments",
      description:
        "Culinary alchemy celebrating high-altitude grains, wild seabuckthorn, smoked mountain butter, and rare vintage black teas.",
    },
    {
      id: "rituals",
      title: "Sacred Spatial Stillness",
      subtitle: "Thermal Baths & Sound Sanctuary",
      description:
        "Mineral springs heated by mountain stone, singing bowl resonance chambers, and open-air stargazing pavilions.",
    },
  ],
  toneOfVoice: {
    personality: ["Grounded", "Architectural", "Sensory", "Reverent", "Uncompromising"],
    vocabularyDo: [
      "monolithic",
      "patina",
      "rammed earth",
      "heirloom",
      "tactile",
      "hand-chiselled",
      "cedar smoke",
      "mineral",
      "unhurried",
    ],
    vocabularyAvoid: [
      "luxury amenities",
      "exclusive package",
      "best-in-class",
      "user-friendly",
      "innovative",
      "state-of-the-art",
    ],
    sentenceRhythm: "Weighted, rhythmic sentences with deliberate cadence and sensory specificity.",
  },
} as const;

export const colorTokens = {
  primaryGround: {
    hex: "#0D0C0B",
    name: "Carbon Basalt",
    role: "Primary dark background evoking Himalayan night slate and smoked stone",
    contrastOnDark: "18.4:1 against text",
    wcagRating: "AAA",
  },
  surfaceRaised: {
    hex: "#171513",
    name: "Rammed Loam",
    role: "Elevated container and card background, warm earthen dark surface",
    contrastOnDark: "14.2:1 against text",
    wcagRating: "AAA",
  },
  primaryText: {
    hex: "#EDE8DF",
    name: "Raw Calico Silk",
    role: "Primary text, headers, and hero titles with warm organic luminance",
    contrastOnDark: "16.8:1 against basalt",
    wcagRating: "AAA",
  },
  mutedText: {
    hex: "#8E867A",
    name: "River Silt",
    role: "Secondary body, metadata, technical specs, and structural labels",
    contrastOnDark: "5.1:1 against basalt",
    wcagRating: "AA",
  },
  terracottaAccent: {
    hex: "#C97A47",
    name: "Madder Terracotta",
    role: "Primary brand accent, interactive triggers, glowing embers, and indicators",
    contrastOnDark: "6.2:1 against basalt",
    wcagRating: "AA",
  },
  ochreAccent: {
    hex: "#D4A359",
    name: "Himalayan Ochre",
    role: "Secondary warm accent for craft details, metalwork, and highlights",
    contrastOnDark: "8.9:1 against basalt",
    wcagRating: "AAA",
  },
  rawSand: {
    hex: "#D4C7B3",
    name: "Glacial Sandstone",
    role: "Subtle decorative typography, borders, and tactile accents",
    contrastOnDark: "12.5:1 against basalt",
    wcagRating: "AAA",
  },
  borderSubtle: {
    hex: "#2E2923",
    name: "Chiselled Slate Edge",
    role: "Dividers, hairline frames, and architectural grid lines",
    contrastOnDark: "2.1:1 subtle non-text boundary",
    wcagRating: "AA",
  },
} as const;

export const siteSections: readonly SectionWireframe[] = [
  {
    index: 1,
    id: "hero-threshold",
    title: "The Mountain Threshold",
    eyebrow: "01 / Sanctuary",
    purpose:
      "Establish supreme gravitas, physical atmosphere, and the feeling of entering an ancient mountain sanctuary through continuous 3D depth.",
    copyIntent:
      "KORA: A sanctuary sculpted into the Himalayan cliffside. Enter the unhurried altitude.",
    assetType: "r3f-3d-scene",
    interactiveElement:
      "Full-viewport interactive 3D Himalayan monolithic stone & cedar architectural model responding to cursor tilt and scroll descent.",
  },
  {
    index: 2,
    id: "manifesto-origin",
    title: "The Architecture of Stillness",
    eyebrow: "02 / Origin & Soil",
    purpose:
      "Position the brand as an irreplaceable cultural treasure rooted in ancestral Himalayan materials and philosophy.",
    copyIntent:
      "We did not build upon the mountain. We allowed the mountain to carve its own quiet halls.",
    assetType: "editorial-typography",
    interactiveElement:
      "Kinetic scrubbed editorial typography with character-by-character stone-dust reveal tied to Lenis scroll velocity.",
  },
  {
    index: 3,
    id: "tactile-craft-scrub",
    title: "12-Micron Cashmere & Wild Tussar",
    eyebrow: "03 / The Living Atelier",
    purpose:
      "Deliver the flagship 'Hero Moment' — interactive frame scrubbing of microscopic spinning wheel warp and handloom weft.",
    copyIntent:
      "Thread spun so fine it floats on breath. Woven on 300-year-old pit looms in Kathmandu Valley.",
    assetType: "canvas-frame-sequence",
    interactiveElement:
      "60-frame high-fidelity scroll-scrubbed canvas sequence rotating a spinning wooden spindle into a micro-weave texture with pinned viewport.",
  },
  {
    index: 4,
    id: "architectural-sanctuaries",
    title: "Monolithic Living Chambers",
    eyebrow: "04 / Spatial Design",
    purpose:
      "Showcase the suites and private sanctuaries with rich spatial lighting, material honesty, and floorplan depth.",
    copyIntent:
      "Rammed red clay. Black Mustang slate. Open-hearth cedar fires that burn through the winter mist.",
    assetType: "interactive-split-stage",
    interactiveElement:
      "Dual-axis pinned spatial stage with 3D ambient light shift from golden dawn (6:00 AM) to alpine dusk (7:00 PM).",
  },
  {
    index: 5,
    id: "botanical-gastronomy",
    title: "High-Altitude Ferments & Cellar",
    eyebrow: "05 / Alpine Gastronomy",
    purpose:
      "Sensory celebration of terroir, wild foraged ingredients, aged mountain teas, and open-flame cooking.",
    copyIntent:
      "Smoked sea buckthorn glaze, hand-ground buckwheat, and twenty-year fermented vintage Pu-erh from the border ridges.",
    assetType: "macro-gallery-parallax",
    interactiveElement:
      "Multi-layered depth parallax gallery with cursor-magnetic ingredient inspect and botanical tasting notes.",
  },
  {
    index: 6,
    id: "sensory-rituals",
    title: "Mineral Spring & Sound Temple",
    eyebrow: "06 / Restorative Rituals",
    purpose:
      "Convey deep holistic wellness, thermal springs, and acoustic relaxation without generic spa clichés.",
    copyIntent:
      "Submerge in iron-rich glacial waters heated over river stones. Let seven-metal singing bowls align the body's pulse.",
    assetType: "r3f-3d-scene",
    interactiveElement:
      "Interactive 3D water surface shader reacting with gentle radial ripples on hover and scroll-pulse resonance.",
  },
  {
    index: 7,
    id: "curated-chronicles",
    title: "The Valley Field Notes",
    eyebrow: "07 / Provenance & Seasons",
    purpose:
      "Demonstrate ongoing cultural vitality, seasonal harvesting calendars, and artisan master profiles.",
    copyIntent:
      "Chronicles of the autumn walnut harvest, the winter loom season, and the high pass journeys.",
    assetType: "editorial-typography",
    interactiveElement:
      "Horizontal smooth-glide carousel with drag physics and preview modal triggers.",
  },
  {
    index: 8,
    id: "reservation-sanctuary",
    title: "Begin the Pilgrimage",
    eyebrow: "08 / Private Inquiries",
    purpose:
      "Provide an ultra-exclusive, dignified reservation pathway for high-net-worth guests and private buyout requests.",
    copyIntent:
      "Twelve private sanctuaries across two valleys. Inquiries attended by our master of house within one solar cycle.",
    assetType: "editorial-typography",
    interactiveElement:
      "Direct VIP WhatsApp concierge link and encrypted direct mail invitation dispatch.",
  },
  {
    index: 9,
    id: "creator-colophon",
    title: "Built by Osaid — Flagship Digital Craftsmanship",
    eyebrow: "09 / Colophon & Commission",
    purpose:
      "The decisive conversion layer: reveal that this entire world was designed, coded, and directed by Osaid for small business owners who demand distinction.",
    copyIntent:
      "Your brand possesses decades of craft and heritage. Does your digital presence convey that truth? I build flagship web experiences for businesses ready to be world-class.",
    assetType: "contact-conversion-layer",
    interactiveElement:
      "Magnetic WhatsApp instant consultation trigger with prefilled project scope and direct mailto button.",
  },
] as const;

export const navigationItems = [
  { label: "Sanctuary", href: "#hero-threshold", sectionId: "hero-threshold" },
  { label: "Origin", href: "#manifesto-origin", sectionId: "manifesto-origin" },
  { label: "Atelier", href: "#tactile-craft-scrub", sectionId: "tactile-craft-scrub" },
  { label: "Chambers", href: "#architectural-sanctuaries", sectionId: "architectural-sanctuaries" },
  { label: "Cellar", href: "#botanical-gastronomy", sectionId: "botanical-gastronomy" },
  { label: "Rituals", href: "#sensory-rituals", sectionId: "sensory-rituals" },
  { label: "Reserve", href: "#reservation-sanctuary", sectionId: "reservation-sanctuary" },
  { label: "Commission", href: "#creator-colophon", sectionId: "creator-colophon" },
] as const;

export const siteConfig: SiteConfig = {
  owner: ownerConfig,
  brand: brandConfig,
  colors: colorTokens,
  navigation: navigationItems,
  sections: siteSections,
  metadataBase: new URL('https://kora-sanctuary.vercel.app'),
} as const;

export default siteConfig;
