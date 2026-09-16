'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { brandConfig, ownerConfig } from '@/config/site';
import { useSmoothScroll, useReducedMotion } from '@/components/providers/SmoothScrollProvider';

export function HeroThreshold() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const reducedMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const framesRef = useRef<(ImageBitmap | HTMLImageElement)[]>([]);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Intersection observer to defer frame loading until section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Progressive preloading of 60 WebP frames with createImageBitmap off-thread decoding
  useEffect(() => {
    if (!isIntersecting) return;

    let isCancelled = false;
    const totalFrames = 60;
    const loadedBitmaps: (ImageBitmap | HTMLImageElement)[] = new Array(totalFrames);
    let loadedCount = 0;

    const loadFrame = async (index: number) => {
      const frameNum = String(index + 1).padStart(3, '0');
      const url = `/assets/frames/frame-${frameNum}.webp`;

      try {
        const response = await fetch(url);
        const blob = await response.blob();
        if (isCancelled) return;

        if (typeof createImageBitmap !== 'undefined') {
          const bitmap = await createImageBitmap(blob);
          if (!isCancelled) loadedBitmaps[index] = bitmap;
        } else {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(blob);
          await img.decode();
          if (!isCancelled) loadedBitmaps[index] = img;
        }
      } catch {
        // Fallback placeholder image element
        const img = document.createElement('img');
        img.src = url;
        if (!isCancelled) loadedBitmaps[index] = img;
      }

      loadedCount++;
      if (!isCancelled) {
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          framesRef.current = loadedBitmaps;
          setFramesLoaded(true);
        }
      }
    };

    // Load first frame immediately for LCP
    loadFrame(0).then(() => {
      // Load remaining frames asynchronously
      for (let i = 1; i < totalFrames; i++) {
        loadFrame(i);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [isIntersecting]);

  // Frame rendering to canvas
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const frame = framesRef.current[frameIdx];
    if (!frame) return;

    // Cover canvas maintaining aspect ratio
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

  // Scroll listener for hero frame scrubbing
  useEffect(() => {
    if (reducedMotion || !isIntersecting) return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const sec = sectionRef.current;
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        const height = sec.offsetHeight;
        const progress = Math.max(0, Math.min(1, -rect.top / (height - window.innerHeight || 1)));
        const frameIdx = Math.min(59, Math.floor(progress * 60));
        drawFrame(frameIdx);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial draw
    drawFrame(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [drawFrame, reducedMotion, framesLoaded, isIntersecting]);

  return (
    <section
      ref={sectionRef}
      id="hero-threshold"
      className="relative w-full min-h-screen bg-background flex flex-col justify-between overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border/40"
      aria-labelledby="hero-threshold-heading"
      role="banner"
    >
      {/* Preload LCP asset */}
      <link
        rel="preload"
        as="image"
        href="/assets/images/hero-threshold-01.webp"
        fetchPriority="high"
      />

      {/* Background Ambience Layer with fallback image for LCP */}
      <div className="absolute inset-0 z-0 opacity-40" aria-hidden="true">
        <div className="relative aspect-[16/9] w-full h-full">
          <Image
            src="/assets/images/hero-threshold-01.webp"
            alt="Himalayan Mountain Range Threshold at 3,840m altitude"
            fill
            priority
            sizes="100vw"
            className="object-cover mix-blend-luminosity filter brightness-50 contrast-125"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" aria-hidden="true" />
      </div>

      {/* Frame sequence canvas layer with explicit dimensions for CLS */}
      <canvas
        ref={canvasRef}
        width={1080}
        height={606}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 mix-blend-screen pointer-events-none"
        role="img"
        aria-label="60-frame canvas sequence of mountain terrain animation"
        style={{ aspectRatio: '1080 / 606' }}
      />

      {/* Top Coordinate and Altitude Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap justify-between items-center gap-4 text-xs font-mono uppercase tracking-[0.25em] text-muted">
        <div className="flex items-center gap-2" aria-label="Active connection indicator">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span>Sanctuary Coordinates</span>
        </div>
        <div className="flex items-center gap-6" role="status" aria-live="polite">
          <span className="text-sand">Mustang: 29.18°N 83.95°E • 3,840M</span>
          <span className="hidden md:inline text-muted/60" aria-hidden="true">|</span>
          <span className="hidden md:inline text-sand">Kathmandu: 27.71°N 85.32°E • 1,400M</span>
        </div>
      </div>

      {/* Main Hero Typography Stack */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-16 text-center space-y-8">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-border/80 bg-surface/60 backdrop-blur-md rounded-full">
          <span className="text-xs uppercase tracking-[0.3em] text-ochre font-medium font-sans">
            {brandConfig.category}
          </span>
        </div>

        <h1 id="hero-threshold-heading" className="font-serif text-6xl sm:text-8xl md:text-9xl font-light tracking-[0.08em] uppercase text-foreground leading-none">
          {brandConfig.name}
          <span className="block font-serif text-3xl sm:text-5xl md:text-6xl text-sand/80 font-normal tracking-widest mt-3">
            {brandConfig.nativeScript}
          </span>
        </h1>

        <p className="font-serif italic text-2xl sm:text-3xl text-sand max-w-3xl mx-auto leading-relaxed" aria-label="KORA Sanctuary tagline">
          &ldquo;{brandConfig.tagline}&rdquo;
        </p>

        <p className="font-sans text-sm sm:text-base text-muted max-w-2xl mx-auto tracking-wide leading-relaxed" aria-label="KORA positioning statement">
          {brandConfig.positioning}
        </p>

        {/* CTA Button Group */}
        <div className="pt-6 flex flex-wrap justify-center items-center gap-4" role="group" aria-label="Primary navigation actions">
          <a
            href="#tactile-craft-scrub"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#tactile-craft-scrub');
            }}
            className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-light text-background font-semibold text-xs uppercase tracking-[0.25em] transition-all duration-300 rounded-sm shadow-lg shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0B] min-w-[140px] min-h-[56px]"
          >
            Explore Living Atelier
          </a>
          <a
            href={ownerConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-surface hover:bg-surface-raised border border-border hover:border-accent text-foreground font-medium text-xs uppercase tracking-[0.25em] transition-all duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0B] min-w-[140px] min-h-[56px]"
            aria-label="Contact Osaid on WhatsApp for direct commission"
          >
            Direct Commission
          </a>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-between items-end text-[11px] font-mono tracking-widest uppercase text-muted">
        <div className="flex items-center gap-2" role="status" aria-live="polite">
          <span>Asset Decoders: {framesLoaded ? '100% Ready (60 Frames)' : `${loadProgress}% Decoded`}</span>
        </div>
        <div className="flex items-center gap-2 text-sand" aria-label="Scroll instruction">
          <span>Scroll to Descend</span>
          <span aria-hidden="true">↓</span>
        </div>
      </div>
    </section>
  );
}
