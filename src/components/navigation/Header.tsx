'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { brandConfig, navigationItems, ownerConfig } from '@/config/site';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { AmbientAudio } from '@/components/ui/AmbientAudio';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero-threshold');
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navigationItems.map((item) => document.getElementById(item.sectionId));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(`#${targetId}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border/60 py-3.5 shadow-2xl shadow-black/40'
          : 'bg-gradient-to-b from-background/90 via-background/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <Link
          href="#hero-threshold"
          onClick={(e) => handleNavClick(e, 'hero-threshold')}
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          aria-label={`${brandConfig.name} - Return to top`}
        >
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.2em] text-foreground uppercase group-hover:text-accent transition-colors duration-300">
                {brandConfig.name}
              </span>
              <span className="font-serif text-sm text-sand/70 tracking-widest hidden sm:inline-block">
                {brandConfig.nativeScript}
              </span>
            </div>
            <span className="text-[10px] tracking-[0.25em] text-muted uppercase font-sans font-medium">
              Upper Mustang • 3,840m
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.sectionId}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.sectionId)}
                className={`relative py-1 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm ${
                  isActive ? 'text-foreground font-semibold' : 'text-muted hover:text-foreground'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent animate-pulse" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Header Right Actions: Audio + Conversion CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          <AmbientAudio />

          <a
            href={ownerConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium text-foreground bg-surface border border-border hover:border-accent/80 hover:bg-surface-raised hover:text-accent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            Commission
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface border-b border-border px-6 py-6 mt-3 space-y-4 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navigationItems.map((item) => (
              <a
                key={item.sectionId}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.sectionId)}
                className={`text-sm tracking-[0.2em] uppercase py-1.5 transition-colors duration-200 ${
                  activeSection === item.sectionId ? 'text-accent font-semibold' : 'text-muted hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-border/50 flex flex-col gap-3">
            <a
              href={ownerConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 text-xs tracking-[0.2em] uppercase font-semibold text-background bg-accent hover:bg-accent-light transition-colors rounded-sm"
            >
              Commission via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
