'use client';

import React from 'react';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Header } from '@/components/navigation/Header';
import { HeroThreshold } from '@/components/sections/HeroThreshold';
import { ManifestoOrigin } from '@/components/sections/ManifestoOrigin';
import { TactileCraftScrub } from '@/components/sections/TactileCraftScrub';
import { ArchitecturalSanctuaries } from '@/components/sections/ArchitecturalSanctuaries';
import { BotanicalGastronomy } from '@/components/sections/BotanicalGastronomy';
import { SensoryRituals } from '@/components/sections/SensoryRituals';
import { CuratedChronicles } from '@/components/sections/CuratedChronicles';
import { ReservationSanctuary } from '@/components/sections/ReservationSanctuary';
import { CreatorColophon } from '@/components/sections/CreatorColophon';
import { FloatingWhatsApp } from '@/components/navigation/FloatingWhatsApp';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main className="relative w-full flex flex-col">
        <HeroThreshold />
        <ManifestoOrigin />
        <section aria-labelledby="tactile-craft-scrub" className="cv-auto">
          <TactileCraftScrub />
        </section>
        <section aria-labelledby="architectural-sanctuaries" className="cv-auto">
          <ArchitecturalSanctuaries />
        </section>
        <section aria-labelledby="botanical-gastronomy" className="cv-auto">
          <BotanicalGastronomy />
        </section>
        <section aria-labelledby="sensory-rituals" className="cv-auto">
          <SensoryRituals />
        </section>
        <section aria-labelledby="curated-chronicles" className="cv-auto">
          <CuratedChronicles />
        </section>
        <section aria-labelledby="reservation-sanctuary" className="cv-auto">
          <ReservationSanctuary />
        </section>
        <section aria-labelledby="creator-colophon" className="cv-auto">
          <CreatorColophon />
        </section>
      </main>
      <FloatingWhatsApp />
    </SmoothScrollProvider>
  );
}
