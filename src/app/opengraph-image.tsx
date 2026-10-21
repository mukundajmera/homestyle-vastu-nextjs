import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'Homestyle Vastu - Vastu & Feng Shui Consultations';
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
          background: '#f3ede3',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: '#334436',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'rgba(233, 189, 101, 0.3)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: 'rgba(153, 169, 141, 0.3)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          Homestyle Vastu
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#897966',
            textAlign: 'center',
          }}
        >
          Vastu & Feng Shui for Homes, Businesses and More
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            fontWeight: 'bold',
            color: '#087A3A',
          }}
        >
          Consultant: Sanjay Jain
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
