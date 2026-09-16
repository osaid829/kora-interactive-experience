'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Chamber {
  id: string;
  name: string;
  nativeName: string;
  sqm: number;
  altitude: string;
  description: string;
  features: string[];
}

export function ArchitecturalSanctuaries() {
  const [activeTime, setActiveTime] = useState<'dawn' | 'noon' | 'dusk'>('dusk');
  const [selectedChamber, setSelectedChamber] = useState<number>(0);

  const chambers: Chamber[] = [
    {
      id: 'nilgiri-suite',
      name: 'Nilgiri Wind Suite',
      nativeName: 'གནམ་ལྷའི་ཁང་པ',
      sqm: 145,
      altitude: '3,840M',
      description: 'Cantilevered above the Kali Gandaki canyon. Monolithic rammed earth walls capture the afternoon sun, retaining warmth through sub-zero Himalayan nights.',
      features: ['Black Mustang Slate Hearth', 'Wild Cedar Sunken Bath', 'Floor-to-Ceiling Canyon Vista'],
    },
    {
      id: 'salt-chamber',
      name: 'Salt Route Sanctuary',
      nativeName: 'ཚྭ་ལམ་གནས་ཁང',
      sqm: 180,
      altitude: '3,840M',
      description: 'Built into ancient cavern contours. Hand-chiselled stone masonry creates absolute acoustic silence for deep meditative rest.',
      features: ['Open-Flame Fireplace', 'Private Herbal Steam Room', 'Astronomy Stargazing Skylight'],
    },
  ];

  const timeSettings = {
    dawn: {
      label: '06:00 — Alpine Dawn',
      filter: 'brightness(90%) contrast(110%) sepia(20%) hue-rotate(-15deg)',
      bgGrad: 'from-amber-950/40 via-surface to-background',
      accentColor: '#D4A359',
    },
    noon: {
      label: '12:00 — High Solar Peak',
      filter: 'brightness(105%) contrast(115%) saturate(105%)',
      bgGrad: 'from-slate-900/30 via-surface to-background',
      accentColor: '#EDE8DF',
    },
    dusk: {
      label: '19:00 — Mountain Dusk',
      filter: 'brightness(75%) contrast(125%) sepia(35%) hue-rotate(-25deg)',
      bgGrad: 'from-rose-950/50 via-surface to-background',
      accentColor: '#C97A47',
    },
  };

  const chamber = chambers[selectedChamber];

  return (
    <section
      id="architectural-sanctuaries"
      className="relative w-full py-28 sm:py-36 bg-surface border-b border-border/60 text-foreground overflow-hidden content-visibility-auto"
      aria-labelledby="architectural-sanctuaries-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-border/80">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent block mb-3" id="architectural-sanctuaries-eyebrow">
              04 / Spatial Design
            </span>
            <h2 id="architectural-sanctuaries-heading" className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
              Monolithic Living <br />
              <span className="italic text-sand font-normal">Chambers</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted font-sans leading-relaxed" id="architectural-sanctuaries-description">
            Rammed red clay. Black Mustang slate. Open-hearth cedar fires that burn through the winter mist.
          </p>
        </div>

        {/* Time of Day Sun Angle Interactive Controls */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/40" role="group" aria-labelledby="architectural-sanctuaries-eyebrow">
          <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-widest" role="status" aria-live="polite">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span>Diurnal Sun Position:</span>
          </div>

          <div className="inline-flex p-1 bg-background border border-border rounded-sm" role="tablist" aria-label="Time of day selection">
            {(['dawn', 'noon', 'dusk'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTime(t)}
                role="tab"
                aria-selected={activeTime === t}
                aria-controls={`time-panel-${t}`}
                className={`px-4 py-2 text-xs font-medium tracking-[0.18em] uppercase transition-all rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#171513] min-h-[44px] min-w-[70px] ${
                  activeTime === t
                    ? 'bg-accent text-background font-semibold shadow-sm'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-sand" role="status" aria-live="polite" id={`time-panel-${activeTime}`}>
            {timeSettings[activeTime].label}
          </div>
        </div>

        {/* Chamber Display Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-center">
          {/* Visual stage with reactive time-of-day lighting */}
          <div className="lg:col-span-7 relative" role="img" aria-label={`${chamber.name} chamber at ${timeSettings[activeTime].label}`}>
            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-border bg-background shadow-2xl group">
              <Image
                src="/assets/images/architectural-sanctuaries-01.webp"
                alt={chamber.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-all duration-700"
                style={{ filter: timeSettings[activeTime].filter }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs font-mono tracking-widest text-sand uppercase">
                <span>{chamber.name}</span>
                <span>{chamber.sqm} m² • {chamber.altitude}</span>
              </div>
            </div>

            {/* Chamber selection tabs */}
            <div className="flex gap-2 mt-4" role="tablist" aria-label="Chamber selection">
              {chambers.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedChamber(idx)}
                  role="tab"
                  aria-selected={selectedChamber === idx}
                  aria-controls={`chamber-panel-${c.id}`}
                  className={`flex-1 py-3 px-4 text-xs font-mono uppercase tracking-widest border transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#171513] min-h-[56px] ${
                    selectedChamber === idx
                      ? 'border-accent bg-background text-foreground'
                      : 'border-border bg-surface/50 text-muted hover:text-foreground'
                  }`}
                >
                  <span className="block text-[10px] text-accent mb-0.5">Suite 0{idx + 1}</span>
                  <span className="font-sans font-medium">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chamber details & floorplan features */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3" id={`chamber-panel-${chamber.id}`} role="tabpanel" aria-labelledby={`chamber-panel-${chamber.id}`}>
              <div className="flex items-center gap-3">
                <span className="font-serif text-2xl text-sand italic" aria-label={`Native name: ${chamber.nativeName}`}>{chamber.nativeName}</span>
                <span className="text-xs font-mono text-muted">/ {chamber.sqm} SQM / {chamber.altitude}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-foreground font-light">
                {chamber.name}
              </h3>
              <p className="text-sm text-muted leading-relaxed font-sans">
                {chamber.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/60">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-sand block" id="chamber-features-heading">
                Sanctuary Architectural Details
              </span>
              <ul className="space-y-3 font-sans text-xs text-foreground" aria-labelledby="chamber-features-heading">
                {chamber.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-background border border-border/80 rounded-sm">
              <span className="text-[11px] font-mono text-ochre uppercase tracking-widest block mb-1">
                Thermal & Acoustic Isolation
              </span>
              <p className="text-xs text-muted leading-relaxed">
                600mm hand-tamped loam exterior walls eliminate canyon wind resonance, maintaining an interior temperature of 21°C regardless of exterior blizzard conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
