'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.AudioContext && !(window as any).webkitAudioContext) {
      setIsSupported(false);
    }
  }, []);

  const playSingingBowlChime = useCallback((ctx: AudioContext, masterGain: GainNode) => {
    // Himalayan singing bowl harmonics: 432Hz fundamental, 864Hz 2nd harmonic, 1296Hz 3rd harmonic, subtle 216Hz sub
    const frequencies = [216, 432, 864, 1296, 2160];
    const gains = [0.15, 0.4, 0.2, 0.08, 0.03];

    const now = ctx.currentTime;

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() * 2 - 1), now);

      // Organic gentle strike envelope: quick 20ms attack, very long 7-second meditative decay
      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.exponentialRampToValueAtTime(gains[i], now + 0.03);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 6.5);

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 7);
    });
  }, []);

  const toggleAudio = async () => {
    if (isPlaying) {
      // Fade out and stop
      if (gainNodeRef.current && audioCtxRef.current) {
        const now = audioCtxRef.current.currentTime;
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, now);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      }
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
          await audioCtxRef.current.resume();
        }

        const masterGain = audioCtxRef.current.createGain();
        masterGain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
        masterGain.connect(audioCtxRef.current.destination);
        gainNodeRef.current = masterGain;

        setIsPlaying(true);
        playSingingBowlChime(audioCtxRef.current, masterGain);

        // Schedule periodic gentle singing bowl chime every 9.5s
        timerRef.current = setInterval(() => {
          if (audioCtxRef.current && gainNodeRef.current) {
            playSingingBowlChime(audioCtxRef.current, gainNodeRef.current);
          }
        }, 9500);
      } catch (err) {
        console.warn('Audio synthesis could not start:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className={`relative flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-[0.15em] uppercase border transition-all duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        isPlaying
          ? 'text-accent border-accent/80 bg-accent/10 shadow-[0_0_12px_rgba(201,122,71,0.25)]'
          : 'text-muted border-border/80 hover:text-foreground hover:border-muted'
      }`}
      aria-label={isPlaying ? 'Silence Himalayan singing bowl atmosphere' : 'Play Himalayan singing bowl atmosphere'}
      title={isPlaying ? 'Mute Tibetan Singing Bowl' : 'Play Tibetan Singing Bowl (432Hz)'}
    >
      <span className="flex items-center gap-1">
        <span
          className={`w-1.5 h-3 bg-current rounded-full transition-all ${
            isPlaying ? 'animate-[pulse_1.2s_ease-in-out_infinite]' : 'opacity-40'
          }`}
        />
        <span
          className={`w-1.5 h-4.5 bg-current rounded-full transition-all ${
            isPlaying ? 'animate-[pulse_1.8s_ease-in-out_infinite_0.2s]' : 'opacity-40'
          }`}
        />
        <span
          className={`w-1.5 h-2.5 bg-current rounded-full transition-all ${
            isPlaying ? 'animate-[pulse_1.4s_ease-in-out_infinite_0.4s]' : 'opacity-40'
          }`}
        />
      </span>
      <span className="hidden sm:inline font-sans text-[11px]">
        {isPlaying ? '432Hz Sound' : 'Sound'}
      </span>
    </button>
  );
}
