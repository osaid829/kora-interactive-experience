'use client';

import React from 'react';
import Image from 'next/image';
import { brandConfig } from '@/config/site';

export function ManifestoOrigin() {
  const materials = [
    {
      name: 'Rammed Loam Walls',
      provenance: 'Upper Mustang River Terraces',
      thermal: '48-hour diurnal thermal lag for alpine sub-zero retention',
      depth: '600mm monolithic cross-section',
    },
    {
      name: 'Black Basalt & Chiselled Slate',
      provenance: 'Kali Gandaki River Gorge (3,200m)',
      thermal: 'High-density mineral ground with sound dampening',
      depth: 'Hand-split 45mm flagstones',
    },
    {
      name: 'Wild Himalayan Cedar',
      provenance: 'Old-Growth Fallen Timber from High Passes',
      thermal: 'Aromatic cedar resin aging to silver patina',
      depth: 'Interlocking mortarless joinery',
    },
  ];

  return (
    <section
      id="manifesto-origin"
      className="relative w-full py-28 sm:py-36 bg-surface border-b border-border/60 text-foreground overflow-hidden content-visibility-auto"
      aria-labelledby="manifesto-origin-heading"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2E292315_1px,transparent_1px),linear-gradient(to_bottom,#2E292315_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-border/80">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent block mb-3" id="manifesto-origin-eyebrow">
              02 / Origin & Soil
            </span>
            <h2 id="manifesto-origin-heading" className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
              The Architecture <br />
              <span className="italic text-sand font-normal">of Stillness</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted font-sans leading-relaxed" id="manifesto-origin-description">
            We did not build upon the mountain. We allowed the ancient salt corridor to carve its own quiet monolithic sanctuary.
          </p>
        </div>

        {/* Core Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 items-center">
          {/* Left Column: Image with architectural callout */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-border bg-background shadow-2xl group" role="img" aria-label="Rammed earth architecture of KORA sanctuary">
              <Image
                src="/assets/images/manifesto-origin-01.webp"
                alt="Rammed Earth Architecture of KORA - Monolithic loam walls at 3,840m altitude in Upper Mustang"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-[11px] font-mono tracking-widest text-sand uppercase">
                <span>Mustang Salt Basin</span>
                <span>Altitude: 3,840M</span>
              </div>
            </div>

            <div className="p-6 bg-background/50 border border-border/60 rounded-sm">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-ochre block mb-2">
                Pillars of Grounded Construction
              </span>
              <p className="text-xs text-muted leading-relaxed font-sans">
                Every stone is set without chemical binders. Mortarless joinery allows the structures to breathe, flexing micro-milimeters with Himalayan seismic cycles while remaining immovable over generations.
              </p>
            </div>
          </div>

          {/* Right Column: Origin Story & Specs */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-light leading-snug">
                &ldquo;A sanctuary conceived along the ancient trade corridor connecting the high salt passes to the lush handloom valleys.&rdquo;
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
                {brandConfig.originStory}
              </p>
            </div>

            {/* Locations breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {brandConfig.locations.map((loc) => (
                <div
                  key={loc.region}
                  className="p-5 bg-background border border-border rounded-sm hover:border-accent/60 transition-colors focus-within:ring-2 focus-within:ring-accent focus-within:outline-none"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs font-semibold text-foreground tracking-wider uppercase font-sans">
                      {loc.region}
                    </span>
                    <span className="text-xs font-mono text-accent">{loc.altitude}</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{loc.description}</p>
                </div>
              ))}
            </div>

            {/* Geological Material Manifest Table */}
            <div className="space-y-3 pt-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-sand block" id="manifesto-manifest-heading">
                Geological Material Manifest
              </span>
              <div className="divide-y divide-border/60 border-t border-b border-border/60" role="table" aria-labelledby="manifesto-manifest-heading">
                {materials.map((mat) => (
                  <div key={mat.name} className="py-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-xs" role="row">
                    <span className="font-medium text-foreground font-sans" role="cell">{mat.name}</span>
                    <span className="text-muted font-mono text-[11px]" role="cell">{mat.provenance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
