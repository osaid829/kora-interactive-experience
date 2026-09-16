'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SeasonData {
  id: string;
  season: string;
  months: string;
  solarPeriod: string;
  altitude: string;
  tempRange: string;
  highlight: string;
  experience: string;
  image: string;
}

export function CuratedChronicles() {
  const [activeSeason, setActiveSeason] = useState<number>(0);

  const seasons: SeasonData[] = [
    {
      id: 'autumn',
      season: 'Autumn High Salt Crossing',
      months: 'September — November',
      solarPeriod: 'Equinox of Clear Skies',
      altitude: '3,840M Upper Mustang',
      tempRange: '4°C to 18°C',
      highlight: 'Wild Himalayan Sea Buckthorn Harvest & Cashmere Combing',
      experience: 'Crystal clear visibility extending across 8,000m peaks of Dhaulagiri and Annapurna. Herds descend from high alpine pastures with summer-grown 12-micron underfleece.',
      image: '/assets/images/curated-chronicles-01.webp',
    },
    {
      id: 'winter',
      season: 'Sub-Zero Solitude',
      months: 'December — February',
      solarPeriod: 'Deep Winter Hibernation',
      altitude: '3,840M Upper Mustang',
      tempRange: '-15°C to 6°C',
      highlight: 'Snow Leopard Tracking & 432Hz Sound Chamber Immersion',
      experience: 'Absolute silence settles over the canyon. Monolithic loam walls radiate stored daytime heat while open cedar hearths burn continuously through starlit frost.',
      image: '/assets/images/manifesto-origin-01.webp',
    },
    {
      id: 'spring',
      season: 'Rhododendron Thaw',
      months: 'March — May',
      solarPeriod: 'Alpine Spring Rebirth',
      altitude: '2,900M Border Ridges',
      tempRange: '8°C to 22°C',
      highlight: 'Wild Cliff Honey Foraging & River Mineral Extraction',
      experience: 'Glacial streams unlock with mineral-rich runoff. Foraging collectives ascend high cliff faces for raw unpasteurized medicinal honey.',
      image: '/assets/images/botanical-gastronomy-01.webp',
    },
    {
      id: 'monsoon',
      season: 'Loom & Cellar Season',
      months: 'June — August',
      solarPeriod: 'Valley Monsoon Weaving',
      altitude: '1,400M Kathmandu Valley',
      tempRange: '18°C to 28°C',
      highlight: '25-Year Vintage Pu-erh Fermentation & 300-Year Pit Looms',
      experience: 'Warm monsoon mists provide optimal ambient humidity for spinning ultra-fine silk warps and fermenting vintage mountain tea bricks.',
      image: '/assets/images/architectural-sanctuaries-01.webp',
    },
  ];

  const current = seasons[activeSeason];

  return (
    <section
      id="curated-chronicles"
      className="relative w-full py-28 sm:py-36 bg-background border-b border-border/60 text-foreground overflow-hidden content-visibility-auto"
      aria-labelledby="curated-chronicles-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-border/80">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent block mb-3" id="curated-chronicles-eyebrow">
              07 / Seasonal Ephemera
            </span>
            <h2 id="curated-chronicles-heading" className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
              Curated Himalayan <br />
              <span className="italic text-sand font-normal">Chronicles</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted font-sans leading-relaxed" id="curated-chronicles-description">
            The mountain is never static. Four distinct micro-climates dictate our harvest rhythms, architectural fires, and textile weaving.
          </p>
        </div>

        {/* Season Nav Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-12 pb-10" role="tablist" aria-label="Season selection">
          {seasons.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSeason(idx)}
              role="tab"
              aria-selected={activeSeason === idx}
              aria-controls={`season-panel-${idx}`}
              className={`p-4 text-left border rounded-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0B] min-h-[60px] min-w-[100px] ${
                activeSeason === idx
                  ? 'bg-surface border-accent shadow-md'
                  : 'bg-surface/30 border-border hover:border-border/80 hover:bg-surface/60'
              }`}
            >
              <span className="text-[10px] font-mono text-accent block mb-1">0{idx + 1} / Season</span>
              <h3 className="text-xs sm:text-sm font-semibold text-foreground font-sans truncate">{s.season}</h3>
              <span className="text-[11px] font-mono text-muted block mt-1">{s.months}</span>
            </button>
          ))}
        </div>

        {/* Active Season Chronicle Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6" role="img" aria-label={`Seasonal display for ${current.season}`}>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-border bg-surface shadow-2xl group" style={{ aspectRatio: '4 / 3' }}>
              <Image
                src={current.image}
                alt={`${current.season} - ${current.altitude} Himalayan seasonal landscape`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs font-mono tracking-widest text-sand uppercase">
                <span>{current.solarPeriod}</span>
                <span>{current.tempRange}</span>
              </div>
            </div>
          </div>

          {/* Narrative & Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2" id={`season-panel-${activeSeason}`} role="tabpanel" aria-labelledby={`season-panel-${activeSeason}`}>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-ochre block" id="season-altitude">
                {current.altitude}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-foreground font-light" aria-labelledby="season-altitude">
                {current.season}
              </h3>
              <p className="text-xs font-mono text-sand">
                Solar Timing: {current.months}
              </p>
            </div>

            <p className="text-sm sm:text-base text-muted leading-relaxed font-sans" id="season-experience">
              {current.experience}
            </p>

            {/* Micro Highlight Card */}
            <div className="p-5 bg-surface border border-accent/40 rounded-sm space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent block">
                Seasonal Terroir Activity
              </span>
              <p className="text-xs sm:text-sm text-foreground font-medium font-sans" aria-labelledby="season-altitude">
                {current.highlight}
              </p>
            </div>

            {/* Season Specs */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/60 text-xs font-mono">
              <div>
                <span className="text-muted block text-[10px] uppercase">Atmospheric Condition</span>
                <span className="text-sand">{current.solarPeriod}</span>
              </div>
              <div>
                <span className="text-muted block text-[10px] uppercase">Thermal Range</span>
                <span className="text-sand">{current.tempRange}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
