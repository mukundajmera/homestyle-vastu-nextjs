import { ImageResponse } from 'next/og';
import { BRAND_NAME, PERSON_NAME, PERSON_TITLE } from '@/lib/site';

export const runtime = 'nodejs';

export const alt = `${BRAND_NAME} - Vastu & Feng Shui Consultations`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAF8F5',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          fontFamily: 'sans-serif',
          color: '#2B2623',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 16, background: '#B05A07', display: 'flex' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 80px 0 96px',
            flex: 1,
          }}
        >
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 5, color: '#9E4225', fontWeight: 700 }}>
            VASTU SHASTRA · FENG SHUI · JAIPUR
          </div>
          <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, marginTop: 24, letterSpacing: -2, lineHeight: 1.05 }}>
            {BRAND_NAME}
          </div>
          <div style={{ display: 'flex', fontSize: 36, marginTop: 24, color: '#554336', maxWidth: 640 }}>
            Guidance for the spaces where you live and work
          </div>
          <div style={{ display: 'flex', marginTop: 44, fontSize: 26, fontWeight: 700, color: '#B05A07' }}>
            {PERSON_TITLE}: {PERSON_NAME}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 400 }}>
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="150" stroke="#C86142" strokeOpacity="0.45" strokeWidth="2" />
            <circle cx="160" cy="160" r="128" stroke="#C86142" strokeWidth="2" />
            <rect x="100" y="100" width="120" height="120" fill="#FFFFFF" stroke="#C86142" strokeOpacity="0.6" strokeWidth="2" />
            <path d="M140 100V220M180 100V220M100 140H220M100 180H220" stroke="#C86142" strokeOpacity="0.5" strokeWidth="2" />
            <rect x="140" y="140" width="40" height="40" fill="#D97706" fillOpacity="0.3" stroke="#D97706" strokeWidth="3" />
            <path d="M160 40L170 160L160 148L150 160L160 40Z" fill="#B05A07" />
            <path d="M160 280L150 160L160 172L170 160L160 280Z" fill="#4A5D4E" />
            <circle cx="160" cy="160" r="6" fill="#2B2623" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
