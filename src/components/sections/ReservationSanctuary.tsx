'use client';

import React, { useState } from 'react';
import { ownerConfig } from '@/config/site';

interface RoomOption {
  id: string;
  name: string;
  nativeName: string;
  altitude: string;
  sqm: number;
  guests: number;
  price: string;
  features: string[];
}

export function ReservationSanctuary() {
  const [selectedRoom, setSelectedRoom] = useState<string>('nilgiri-suite');
  const [partySize, setPartySize] = useState<number>(2);
  const [arrivalSeason, setArrivalSeason] = useState<string>('Autumn 2027');

  const rooms: RoomOption[] = [
    {
      id: 'nilgiri-suite',
      name: 'Nilgiri Wind Suite',
      nativeName: 'གནམ་ལྷའི་ཁང་པ',
      altitude: '3,840M',
      sqm: 145,
      guests: 2,
      price: '$850 / night',
      features: ['Canyon Cantilever', 'Black Slate Hearth', 'Cedar Sunken Bath'],
    },
    {
      id: 'salt-chamber',
      name: 'Salt Route Sanctuary',
      nativeName: 'ཚྭ་ལམ་གནས་ཁང',
      altitude: '3,840M',
      sqm: 180,
      guests: 4,
      price: '$1,200 / night',
      features: ['Open-Flame Fireplace', 'Herbal Steam Room', 'Astronomy Skylight'],
    },
    {
      id: 'high-plateau-cottage',
      name: 'High Plateau Cottage',
      nativeName: 'མཚོ་ཕྲིན་གླིང་ངོས',
      altitude: '3,920M',
      sqm: 120,
      guests: 2,
      price: '$720 / night',
      features: ['Alpine Ridge Vista', 'Private Sauna', 'Fire Pit Terraces'],
    },
  ];

  const selected = rooms.find((r) => r.id === selectedRoom) || rooms[0];

  const handleWhatsApp = () => {
    const text = `Hello Osaid, I would like to inquire about reserving ${selected.name} for ${partySize} guest(s) during ${arrivalSeason} at KORA.`;
    window.open(`${ownerConfig.whatsappUrl}&text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleEmail = () => {
    const sub = `Sanctuary Inquiry: ${selected.name} (${arrivalSeason})`;
    const body = `Hello Osaid,\n\nI wish to inquire about availability at KORA:\n- Sanctuary: ${selected.name}\n- Party: ${partySize} guest(s)\n- Target Season: ${arrivalSeason}\n\nPlease share booking details and calendar availability.\n\nThank you.`;
    window.open(`mailto:${ownerConfig.email}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <section
      id="reservation-sanctuary"
      className="relative w-full py-28 sm:py-36 bg-[#0D0C0B] border-b border-border/60 text-foreground overflow-hidden content-visibility-auto"
      aria-labelledby="reservation-sanctuary-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-border/80">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent block mb-3" id="reservation-eyebrow">
              08 / Private Inquiries
            </span>
            <h2 id="reservation-sanctuary-heading" className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
              Sanctuary <br />
              <span className="italic text-sand font-normal">Reservation Portal</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted font-sans leading-relaxed" id="reservation-description">
            Strict capacity limit of 12 guests estate-wide to preserve absolute mountain stillness.
          </p>
        </div>

        {/* Room Selection & Inquiry Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16">
          {/* Room Selector */}
          <div className="lg:col-span-5 space-y-4" role="group" aria-labelledby="reservation-eyebrow">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-sand block" id="select-chamber">
              Select Chamber
            </span>

            <div className="space-y-3" role="tablist" aria-label="Chamber selection">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setSelectedRoom(room.id)}
                  role="tab"
                  aria-selected={selectedRoom === room.id}
                  aria-controls={`room-panel-${room.id}`}
                  className={`w-full p-5 text-left rounded-sm border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0B] min-h-[80px] ${
                    selectedRoom === room.id
                      ? 'bg-[#171513] border-accent shadow-lg shadow-black/50'
                      : 'bg-[#171513]/40 border-border hover:border-border/80'
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-semibold text-foreground font-sans">{room.name}</span>
                    <span className="text-xs font-mono text-accent">{room.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted font-mono">
                    <span>{room.altitude}</span>
                    <span aria-hidden="true">•</span>
                    <span>{room.sqm} m²</span>
                    <span aria-hidden="true">•</span>
                    <span>Up to {room.guests} Guests</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-5 bg-[#171513]/60 border border-border/80 rounded-sm" id={`room-panel-${selected.id}`} role="tabpanel" aria-labelledby={`room-panel-${selected.id}`}>
              <span className="text-[11px] font-mono text-sand uppercase tracking-widest block mb-2" id="included-amenities">
                Included Amenities
              </span>
              <ul className="space-y-1.5 text-xs text-muted" aria-labelledby="included-amenities">
                {selected.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form & Direct Contact Triggers */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 bg-[#171513] border border-border rounded-sm space-y-6">
              <div className="flex justify-between items-baseline pb-4 border-b border-border/60">
                <h3 className="font-serif text-2xl text-foreground font-light">{selected.name}</h3>
                <span className="text-xs font-mono text-accent">{selected.price}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="party-size" className="text-xs font-mono uppercase tracking-widest text-sand block">
                    Party Size
                  </label>
                  <select
                    id="party-size"
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full p-3 bg-[#0D0C0B] border border-border rounded-sm text-foreground text-xs font-mono focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                  >
 {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} Guest{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="arrival-season" className="text-xs font-mono uppercase tracking-widest text-sand block">
                    Season Window
                  </label>
                  <select
                    id="arrival-season"
                    value={arrivalSeason}
                    onChange={(e) => setArrivalSeason(e.target.value)}
                    className="w-full p-3 bg-[#0D0C0B] border border-border rounded-sm text-foreground text-xs font-mono focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="Autumn 2027">Autumn High Salt Crossing (Sept–Nov)</option>
                    <option value="Winter 2027">Sub-Zero Solitude (Dec–Feb)</option>
                    <option value="Spring 2028">Rhododendron Thaw (Mar–May)</option>
                    <option value="Monsoon 2028">Loom & Cellar Season (Jun–Aug)</option>
                  </select>
                </div>
              </div>

              {/* Direct Booking Triggers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-3 p-4 bg-[#25D366] hover:bg-[#20bd5a] text-[#0D0C0B] font-semibold text-xs uppercase tracking-[0.2em] rounded-sm transition-all shadow-lg shadow-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0B] min-h-[56px]"
                  aria-label="Inquire about booking on WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Inquire on WhatsApp
                </button>

                <button
                  type="button"
                  onClick={handleEmail}
                  className="flex items-center justify-center gap-3 p-4 bg-[#0D0C0B] hover:bg-[#211E1A] border border-border text-foreground font-semibold text-xs uppercase tracking-[0.2em] rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97A47] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0B] min-h-[56px]"
                  aria-label="Send direct email inquiry"
                >
                  Direct Email Inquiry
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 text-xs font-mono text-muted pt-2 border-t border-border/40" role="status" aria-live="polite">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" aria-hidden="true" />
                <span>Quarterly Calendar Open • Immediate Owner Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
