'use client';

import React, { useState, useEffect } from 'react';
import { ownerConfig, siteConfig } from '@/config/site';

export function CreatorColophon() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(total > 0 && window.scrollY / total >= 0.85);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = `Hello Osaid, I saw your work at ${window.location.href} and would like to discuss hiring you for a similar project.`;
    const encoded = encodeURIComponent(message);
    window.open(`${ownerConfig.whatsappUrl}&text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = () => {
    const subject = `Project Inquiry - Portfolio Review`;
    const body = `Hello Osaid,\n\nI recently viewed your portfolio website and would like to discuss a potential project.\n\nPlease let me know your availability for a brief consultation.\n\nBest regards,\n[Your Name]`;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.open(`mailto:${ownerConfig.email}?subject=${encodedSubject}&body=${encodedBody}`);
  };

  return (
    <section
      id="creator-colophon"
      className="relative w-full py-28 sm:py-36 bg-[#0D0C0B] border-b border-border text-foreground overflow-hidden content-visibility-auto"
      aria-labelledby="creator-colophon-heading"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#171513]/60 to-[#0D0C0B] pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Message Card */}
        <div className="text-center space-y-8 py-12">
          <div className="space-y-4">
            <h2 id="creator-colophon-heading" className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
              Built by <span className="italic text-sand font-normal">Osaid</span>
            </h2>
            <p className="font-serif text-xl sm:text-2xl text-[#D4C7B3] italic" aria-label="Creator tagline">
              Crafting digital experiences that convert skepticism into action.
            </p>
          </div>

          {/* Objection-Resolution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              {
                objection: 'I do not need a website',
                response: 'You do not need a website—you need customers walking through your door. This experience converts every visitor into a warm lead.',
                icon: '🎯',
              },
              {
                objection: 'Websites are too expensive',
                response: 'This is a one-time investment that works 24/7. Compare the cost to a single month of advertising that reaches no one.',
                icon: '💎',
              },
              {
                objection: 'I already have a site',
                response: 'Most sites look like everyone else.s. This one stands out with Himalayan heritage and modern performance.',
                icon: '⚡',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#171513]/50 border border-[#2E2923] rounded-sm hover:border-[#C97A47]/50 transition-colors focus-within:ring-2 focus-within:ring-accent focus-within:outline-none"
              >
                <span className="text-3xl block mb-3" aria-hidden="true">{item.icon}</span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C97A47] block mb-2">
                  Objection
                </span>
                <p className="text-sm text-[#8E867A] font-sans italic mb-2">"{item.objection}"</p>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4A359] block mb-2">
                  Response
                </span>
                <p className="text-xs text-[#EDE8DF] leading-relaxed">
                  {item.response}
                </p>
              </div>
            ))}
          </div>

          {/* Direct Contact Section */}
          <div className="pt-12 pb-8 space-y-6">
            <p className="text-sm sm:text-base text-[#8E867A] max-w-2xl mx-auto leading-relaxed">
              I build websites that work as hard as you do. No templates. No generic templates. Just heritage craftsmanship meeting modern performance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-[#0D0C0B] font-semibold text-sm uppercase tracking-[0.2em] rounded-sm transition-all shadow-lg shadow-[#25D366]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0B] min-h-[56px] min-w-[180px]"
                aria-label="Contact Osaid on WhatsApp for project inquiry"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </button>

              <button
                type="button"
                onClick={handleEmailClick}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#171513] hover:bg-[#211E1A] border border-[#2E2923] text-[#EDE8DF] font-semibold text-sm uppercase tracking-[0.2em] rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97A47] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0B] min-h-[56px] min-w-[180px]"
                aria-label="Send direct email inquiry for project collaboration"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </button>
            </div>

            {/* Contact Info Display */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-mono" role="contentinfo">
              <a
                href={ownerConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C97A47] hover:text-[#E09462] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97A47] rounded"
              >
                +91 8789627278
              </a>
              <span className="text-[#8E867A]" aria-hidden="true">•</span>
              <a
                href={`mailto:${ownerConfig.email}`}
                className="text-[#C97A47] hover:text-[#E09462] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97A47] rounded"
              >
                {ownerConfig.email}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Brand Mark */}
        <div className="pt-16 pb-8 border-t border-[#2E2923] text-center">
          <span className="text-[#C97A47] text-xs font-mono tracking-[0.4em] uppercase block mb-4">
            Himalayan Heritage & Craft
          </span>
          <h3 className="font-serif text-2xl text-[#EDE8DF]">
            KORA <span className="italic text-[#D4A359]">སྐོར་ར</span>
          </h3>
          <p className="text-xs text-[#8E867A] mt-2 font-mono">
            Upper Mustang • Kathmandu Valley • Bhagalpur
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Trigger - Visible from 85% scroll depth */}
      <div
        className={`fixed bottom-20 right-4 sm:right-6 z-50 transition-all duration-500 transform ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
        aria-label="Quick WhatsApp contact"
      >
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0D0C0B] shadow-2xl shadow-[#25D366]/40 flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0B]"
          aria-label="Contact Osaid on WhatsApp"
          title="Contact Osaid on WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>
      </div>
    </section>
  );
}
