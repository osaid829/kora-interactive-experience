'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Ingredient {
  id: string;
  name: string;
  altitude: string;
  provenance: string;
  notes: string;
  category: string;
}

export function BotanicalGastronomy() {
  const [selectedIngredient, setSelectedIngredient] = useState<number>(0);

  const ingredients: Ingredient[] = [
    {
      id: 'sea-buckthorn',
      name: 'Wild Himalayan Sea Buckthorn',
      altitude: '3,600M',
      provenance: 'Thorong La Ridge Glacial Riverbeds',
      notes: 'High acidity, intense natural citrus oils, cold-pressed and reduced over slow cedar wood embers.',
      category: 'Glaze & Acid',
    },
    {
      id: 'puerh-tea',
      name: '25-Year Fermented High-Pass Pu-erh',
      altitude: '2,900M',
      provenance: 'Historic Salt Route Cellar Archives',
      notes: 'Deep earthy minerality, notes of damp forest stone, smoked juniper, and dried mountain plums.',
      category: 'Vintage Tea',
    },
    {
      id: 'buckwheat',
      name: 'Hand-Ground Highland Buckwheat',
      altitude: '3,400M',
      provenance: 'Upper Mustang Stone Mill Co-ops',
      notes: 'Nutty, dense, gluten-free heirloom grain milled between hand-hewn river boulders.',
      category: 'Heirloom Grain',
    },
    {
      id: 'mountain-honey',
      name: 'Wild Cliff Honey & Smoked Juniper',
      altitude: '3,100M',
      provenance: 'Annapurna Forest Cliff Collectives',
      notes: 'Raw unpasteurized cliff honey infused with slow-roasted highland juniper needle smoke.',
      category: 'Sweet & Smoke',
    },
  ];

  const current = ingredients[selectedIngredient];

  return (
    <section
      id="botanical-gastronomy"
      className="relative w-full py-28 sm:py-36 bg-background border-b border-border/60 text-foreground overflow-hidden content-visibility-auto"
      aria-labelledby="botanical-gastronomy-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-border/80">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent block mb-3" id="botanical-gastronomy-eyebrow">
              05 / Alpine Gastronomy
            </span>
            <h2 id="botanical-gastronomy-heading" className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
              Highland Botanical <br />
              <span className="italic text-sand font-normal">Cellar & Hearth</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted font-sans leading-relaxed" id="botanical-gastronomy-description">
            Smoked sea buckthorn glaze, hand-ground buckwheat, and twenty-year fermented vintage Pu-erh from the border ridges.
          </p>
        </div>

        {/* Content Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 items-center">
          {/* Left Column: Interactive Botanical Inspector */}
          <div className="lg:col-span-6 space-y-6" role="group" aria-labelledby="botanical-gastronomy-eyebrow">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-sand block" id="terroir-heading">
              Foraged Terroir Directory
            </span>

            <div className="space-y-3" role="tablist" aria-label="Ingredient selection">
              {ingredients.map((ing, idx) => (
                <button
                  key={ing.id}
                  type="button"
                  onClick={() => setSelectedIngredient(idx)}
                  role="tab"
                  aria-selected={selectedIngredient === idx}
                  aria-controls={`ingredient-panel-${ing.id}`}
                  className={`w-full p-5 text-left rounded-sm border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0B] min-h-[80px] ${
                    selectedIngredient === idx
                      ? 'bg-surface border-accent shadow-lg shadow-black/40'
                      : 'bg-surface/40 border-border hover:border-border/80 hover:bg-surface/70'
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-semibold text-foreground font-sans">{ing.name}</span>
                    <span className="text-xs font-mono text-accent">{ing.altitude}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted">
                    <span className="font-mono text-[11px]">{ing.provenance}</span>
                    <span className="text-[10px] tracking-wider uppercase text-sand/80">{ing.category}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected detail panel */}
            <div className="p-6 bg-surface border border-accent/40 rounded-sm" id={`ingredient-panel-${current.id}`} role="tabpanel" aria-labelledby={`ingredient-panel-${current.id}`}>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ochre block mb-1" id="tasting-notes-heading">
                Tasting Notes & Preparation
              </span>
              <p className="text-xs text-foreground font-serif italic text-base sm:text-lg leading-relaxed mb-2" aria-labelledby="tasting-notes-heading">
                &ldquo;{current.notes}&rdquo;
              </p>
              <span className="text-[11px] font-mono text-muted block">
                Harvested strictly at optimal solar altitude for peak aromatic concentration.
              </span>
            </div>
          </div>

          {/* Right Column: Imagery with overlay */}
          <div className="lg:col-span-6" role="img" aria-label={`Botanical cellar display for ${current.name}`}>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-border bg-surface shadow-2xl group">
              <Image
                src="/assets/images/botanical-gastronomy-01.webp"
                alt={`Wild Himalayan botanical ingredients for ${current.name} - Foraged at ${current.altitude}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent" aria-hidden="true" />

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent block">
                  Cellar Philosophy
                </span>
                <p className="font-serif text-xl sm:text-2xl text-foreground font-light">
                  &ldquo;We cook exclusively over fallen Himalayan cedar and river stones.&rdquo;
                </p>
                <span className="text-xs font-mono text-sand block">
                  Zero refined sugars. 100% mountain terroir ferments.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
