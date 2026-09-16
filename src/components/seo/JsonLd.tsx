'use client';

import React from 'react';
import { siteConfig, brandConfig, ownerConfig } from '@/config/site';

export function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brandConfig.name,
    alternateName: 'ཀོ་ར་',
    description: brandConfig.positioning,
    url: siteConfig.metadataBase,
    logo: `${siteConfig.metadataBase}/favicon.ico`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: ownerConfig.phone.replace('+', ''),
        contactType: 'sales',
        areaServed: 'NP',
        availableLanguage: ['English', 'Nepali'],
      },
    ],
    sameAs: [
      ownerConfig.whatsappUrl,
    ],
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Osaid Web Design & Creative Engineering',
    description: 'Digital experience design for Himalayan heritage brands and luxury craft businesses.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kathmandu',
      addressCountry: 'NP',
    },
    telephone: ownerConfig.phone.replace('+', ''),
    email: ownerConfig.email,
    url: siteConfig.metadataBase,
    priceRange: '$$',
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Osaid',
    jobTitle: 'Freelance Web Designer & Creative Engineer',
    description: 'Specializing in high-performance interactive websites for heritage brands and luxury crafts.',
    url: siteConfig.metadataBase,
    sameAs: [
      ownerConfig.whatsappUrl,
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brandConfig.name,
    alternateName: 'KORA Himalayan Heritage Sanctuary',
    description: brandConfig.positioning,
    url: siteConfig.metadataBase,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.metadataBase}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const aggregateOfferSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    lowPrice: 850,
    highPrice: 1200,
    priceCurrency: 'USD',
    offerCount: '12',
    offerDescription: 'KORA Sanctuary suite bookings - Upper Mustang Himalayan heritage experience',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            professionalServiceSchema,
            personSchema,
            websiteSchema,
            aggregateOfferSchema,
          ],
        }),
      }}
    />
  );
}
