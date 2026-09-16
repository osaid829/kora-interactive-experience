'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ownerConfig } from '@/config/site';
import { useSmoothScroll, useReducedMotion } from '@/components/providers/SmoothScrollProvider';

export function TactileCraftScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const reducedMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const framesRef = useRef<(ImageBitmap | HTMLImageElement)[]>([]);
  const progressRef = useRef<number>(0);

  // Progressive loading of 60 WebP frames with createImageBitmap off-thread decoding
  useEffect(() => {
    let isCancelled = false;
    const totalFrames = 60;

    const loadFrame = async (index: number) => {
      const frameNum = String(index + 1).padStart(3, '0');
      const url = `/assets/frames/frame-${frameNum}.webp`;

      try {
        const response = await fetch(url);
        const blob = await response.blob();
        if (isCancelled) return;

        if (typeof createImageBitmap !== 'undefined') {
          const bitmap = await createImageBitmap(blob);
          if (!isCancelled) framesRef.current[index] = bitmap;
        } else {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(blob);
          await img.decode();
          if (!isCancelled) framesRef.current[index] = img;
        }
      } catch {
        const img = document.createElement('img');
        img.src = url;
        if (!isCancelled) framesRef.current[index] = img;
      }

      setLoadedCount((c) => {
        const newCount = c + 1;
        setLoadProgress(Math.round((newCount / totalFrames) * 100));
        if (newCount === totalFrames) return totalFrames;
        return newCount;
      });
    };

    // Load first frame for LCP immediately
    loadFrame(0);

    // Parallel load remaining frames
    const batchLoad = (start: number, end: number) => {
      for (let i = start; i < end; i++) {
        loadFrame(i);
      }
    };

    batchLoad(1, 16);
    batchLoad(16, 31);
    batchLoad(31, 46);
    batchLoad(46, 60);

    return () => {
      isCancelled = true;
    };
  }, []);

  // Frame rendering to canvas with rAF batching
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const frame = framesRef.current[frameIdx];
    if (!frame) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const fw = (frame as ImageBitmap).width || (frame as HTMLImageElement).naturalWidth || 1080;
    const fh = (frame as ImageBitmap).height || (frame as HTMLImageElement).naturalHeight || 606;

    const scale = Math.max(cw / fw, ch / fh);
    const sw = fw * scale;
    const sh = fh * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.drawImage(frame as CanvasImageSource, sx, sy, sw, sh);
  }, []);

  // Scroll-scrubbing canvas rendering
  useEffect(() => {
    if (reducedMotion || loadedCount < 10) return;

    const handleScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const height = sec.offsetHeight;
      progressRef.current = Math.max(0, Math.min(1, -rect.top / (height - window.innerHeight || 1)));
      const frameIdx = Math.min(59, Math.floor(progressRef.current * 60));
      drawFrame(frameIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial render
    drawFrame(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [drawFrame, loadedCount, reducedMotion]);

  const handleCommissionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo('#creator-colophon');
  };

  return (
    <section
      ref={sectionRef}
      id="tactile-craft-scrub"
      className="relative w-full py-36 bg-[#0D0C0B] border-b border-border/60 overflow-hidden"
      aria-label="12-Micron Cashmere & Wild Tussar - The Living Atelier"
    >
      {/* Pinned scroll area background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#171513]/50 to-[#0D0C0B] pointer-events-none" />

      {/* Canvas Frame Sequence */}
      <canvas
        ref={canvasRef}
        width={1080}
        height={606}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 mix-blend-screen pointer-events-none"
        aria-label="60-frame canvas sequence of spinning thread craft"
      />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 lg:py-32 space-y-16">
          {/* Header */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent block">
              03 / The Living Atelier
            </span>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-foreground">
              <span className="block">12-Micron Cashmere</span>
              <span className="block text-[#D4A359]/90">& Wild Tussar</span>
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-[#D4C7B3] leading-relaxed">
              &ldquo;Thread spun so fine it floats on breath. Woven on 300-year-old pit looms in Kathmandu Valley.&rdquo;
            </p>
          </div>

          {/* Specification Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 bg-[#171513]/60 border border-[#2E2923] rounded-sm backdrop-blur-sm">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-medium text-[#EDE8DF] uppercase tracking-widest font-sans">Tension</span>
                <span className="text-xs font-mono text-[#C97A47]">300-year-old</span>
              </div>
              <p className="text-[11px] text-[#8E867A] leading-relaxed">
                Pedal-less wooden pit looms with tension calibrated by master weavers using muscle memory passed through five generations.
              </p>
            </div>

            <div className="p-6 bg-[#171513]/60 border border-[#2E2923] rounded-sm backdrop-blur-sm">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-medium text-[#EDE8DF] uppercase tracking-widest font-sans">Micron</span>
                <span className="text-xs font-mono text-[#C97A47]">12-Micron</span>
              </div>
              <p className="text-[11px] text-[#8E867A] leading-relaxed">
                Cashmere fibres measuring 12 microns in diameter — finer than human hair, yielding silkier handfeel and superior drape.
              </p>
            </div>

            <div className="p-6 bg-[#171513]/60 border border-[#2E2923] rounded-sm backdrop-blur-sm">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-medium text-[#EDE8DF] uppercase tracking-widest font-sans">Dye</span>
                <span className="text-xs font-mono text-[#C97A47]">Organic Madder</span>
              </div>
              <p className="text-[11px] text-[#8E867A] leading-relaxed">
                Wild madder root extraction using 48-hour fermentation vats, yielding earthy terracotta that deepens with age.
              </p>
            </div>
          </div>

          {/* Loading Progress */}
          <div className="pt-12">
            <div className="flex items-center justify-between mb-4 text-[11px] font-mono uppercase tracking-widest text-[#8E867A]">
              <span>Asset Loading</span>
              <span>{loadedCount < 60 ? `${loadProgress}%` : '100% Ready'}</span>
            </div>
            <div className="h-1.5 w-full max-w-md bg-[#171513] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  loadedCount >= 60 ? 'bg-[#C97A47]' : 'bg-[#D4A359] animate-pulse'
                }`}
                style={{ width: `${loadedCount >= 60 ? 100 : loadProgress}%` }}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <a
              href={ownerConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCommissionClick}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#C97A47] hover:bg-[#E09462] text-[#0D0C0B] font-medium text-sm uppercase tracking-[0.2em] transition-all duration-300 rounded-sm shadow-lg shadow-[#C97A47]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97A47]"
            >
              Commission Artisan Craft
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
