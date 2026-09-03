import { ImageResponse } from 'next/og';
 
export const alt = 'توێژینەوەی زانستی - سەرچاوەی توێژەران';
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
          background: 'linear-gradient(135deg, #0A2540 0%, #00A8CC 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '40px 80px',
            borderRadius: '40px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#00A8CC', marginRight: '20px' }}>
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
            <h1
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                margin: 0,
                color: 'white',
              }}
            >
              توێژینەوەی زانستی
            </h1>
          </div>
          <p
            style={{
              fontSize: '36px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
              marginTop: '10px',
              textAlign: 'center',
            }}
          >
            سەرچاوەی باوەڕپێکراوی توێژەران و خوێندکاران
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
