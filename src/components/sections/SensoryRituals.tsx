'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const DynamicWaterScene = dynamic(() => import('@/components/three/WaterScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[450px] flex items-center justify-center bg-surface/80 border border-border">
      <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
        <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" aria-hidden="true" />
        <span className="text-xs font-mono tracking-widest text-muted uppercase">
          Initializing 3D Fluid Geometry...
        </span>
      </div>
    </div>
  ),
});

export function SensoryRituals() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeRitual, setActiveRitual] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const rituals = [
    {
      title: 'Geothermal Lithium Immersion',
      temp: '41°C',
      element: 'Sub-Alpine Fissure Spring',
      desc: 'Mineral water emerging from 2,000m tectonic granite faults, naturally enriched with bioavailable lithium and magnesium to recalibrate the nervous system.',
    },
    {
      title: '432Hz Standing Wave Sound Bath',
      temp: 'Acoustic',
      element: '7-Metal Hand-Beaten Singing Bowls',
      desc: 'High-altitude acoustic resonance tuned to 432Hz. Vibrations travel through geothermal water baths, dissolving somatic muscular tension.',
    },
    {
      title: 'Highland Cedar Herbal Steam',
      temp: '48°C',
      element: 'Wild Juniper & Rhododendron Resins',
      desc: 'Aromatic mountain steam infused with slow-harvested cedar needle oils to open respiratory pathways and clear alpine fatigue.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="sensory-rituals"
      className="relative w-full py-28 sm:py-36 bg-surface border-b border-border/60 text-foreground overflow-hidden content-visibility-auto"
      aria-labelledby="sensory-rituals-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-border/80">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent block mb-3" id="sensory-rituals-eyebrow">
              06 / Sensory Sanctuary
            </span>
            <h2 id="sensory-rituals-heading" className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
              Mineral Spring & <br />
              <span className="italic text-sand font-normal">Sound Temple</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted font-sans leading-relaxed" id="sensory-rituals-description">
            Geothermal waters emerging through Himalayan faultlines at 41°C. Copper immersion tubs and resonant standing waves.
          </p>
        </div>

        {/* 3D Simulation & Ritual Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 items-center">
          {/* Left Column: Interactive 3D WebGL Fluid Canvas */}
          <div className="lg:col-span-7 space-y-4" role="img" aria-label="Geothermal Sanctuary Bath with interactive fluid surface">
            <div className="relative aspect-[16/11] rounded-sm overflow-hidden border border-border bg-background shadow-2xl" style={{ aspectRatio: '16 / 11' }}>
              {isInView ? (
                <DynamicWaterScene />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/images/sensory-rituals-01.webp"
                    alt="Geothermal Sanctuary Bath with copper immersion tub at 41°C"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-xs" aria-hidden="true" />
                </div>
              )}

              {/* Cursor Interaction Overlay Hint */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-sand bg-surface/90 px-3 py-1.5 rounded-xs border border-border">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" aria-hidden="true" />
                  Three.js 432Hz Fluid Surface
                </span>
                <span className="text-[10px] font-mono tracking-wider text-muted/80 bg-background/80 px-2.5 py-1 rounded-xs">
                  Hover to Disperse Waves
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-muted px-1" role="status" aria-live="polite">
              <span>Geothermal Core: 41.2°C Constant</span>
              <span className="text-accent">Mineral Total: 2,400 mg/L</span>
            </div>
          </div>

          {/* Right Column: Ritual Protocols */}
          <div className="lg:col-span-5 space-y-6" role="group" aria-labelledby="sensory-rituals-eyebrow">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-sand block" id="ritual-protocols-heading">
              Restorative Sanctuary Protocols
            </span>

            <div className="space-y-4" role="tablist" aria-label="Ritual protocol selection">
              {rituals.map((ritual, idx) => (
                <button
                  key={ritual.title}
                  type="button"
                  onClick={() => setActiveRitual(idx)}
                  role="tab"
                  aria-selected={activeRitual === idx}
                  aria-controls={`ritual-panel-${idx}`}
                  className={`w-full p-5 text-left rounded-sm border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#171513] min-h-[100px] ${
                    activeRitual === idx
                      ? 'bg-background border-accent shadow-lg shadow-black/50'
                      : 'bg-background/40 border-border hover:border-border/80 hover:bg-background/70'
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-sm font-semibold text-foreground font-sans">{ritual.title}</h3>
                    <span className="text-xs font-mono text-accent">{ritual.temp}</span>
                  </div>
                  <span className="text-[11px] font-mono text-sand block mb-2">{ritual.element}</span>
                  <p className="text-xs text-muted leading-relaxed font-sans" id={`ritual-panel-${idx}`} role="tabpanel" aria-labelledby={`ritual-panel-${idx}`}>
                    {ritual.desc}
                  </p>
                </button>
              ))}
            </div>

            <div className="p-5 bg-background/70 border border-border/80 rounded-sm">
              <span className="text-[11px] font-mono text-ochre uppercase tracking-widest block mb-1">
                Zero Electromagnetic Radiation
              </span>
              <p className="text-xs text-muted leading-relaxed">
                The entire subterranean thermal bath is architecturally shielded against high-frequency electromagnetic interference, returning circadian brainwaves to natural delta rhythms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
