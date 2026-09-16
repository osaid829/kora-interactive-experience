import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#0D0C0B',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          <h1
            style={{
              fontSize: '90px',
              fontWeight: 300,
              color: '#EDE8DF',
              fontFamily: 'sans-serif',
              textAlign: 'center',
              margin: 0,
              lineHeight: 1,
            }}
          >
            {siteConfig.brand.name}
          </h1>
          <p
            style={{
              fontSize: '48px',
              fontStyle: 'italic',
              color: '#D4C7B3',
              fontFamily: 'sans-serif',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {siteConfig.brand.positioning}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginTop: '20px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                color: '#C97A47',
                fontFamily: 'monospace',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Sanctuary & Atelier
            </span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            fontSize: '20px',
            color: '#8E867A',
            fontFamily: 'monospace',
            opacity: 0.7,
          }}
        >
          kora-sanctuary.vercel.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
