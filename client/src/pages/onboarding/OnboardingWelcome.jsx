import { useNavigate } from 'react-router-dom';

// Circles based on exact Figma positions (relative to 414x736 frame)
// Figma frame origin y=-1128, so relative_y = figma_y - (-1128) = figma_y + 1128
const CIRCLES = [
  { x: 78,  y: 122, size: 129, color: '#eff6f5' }, // Ellipse 20 - large mint
  { x: 181, y: 251, size: 71,  color: '#ebe9cf' }, // Ellipse 21 - yellow
  { x: 43,  y: 235, size: 51,  color: '#f4d2bc' }, // Ellipse 23 - orange
  { x: 238, y: 159, size: 77,  color: '#ebcfde' }, // Ellipse 19 - pink
  { x: 217, y: 101, size: 42,  color: '#f4d2bc' }, // Ellipse 19 - orange small
  { x: 47,  y: 105, size: 35,  color: '#cfebd4' }, // Ellipse 18 - green small
  { x: 322, y: 151, size: 35,  color: '#cfebd4' }, // Ellipse 24 - green
  { x: 271, y: 276, size: 35,  color: '#dfcfeb' }, // Ellipse 22 - purple
  { x: 252, y: 326, size: 18,  color: '#eff6f5' }, // Ellipse 26 - teal tiny
];

function BookIllustration() {
  return (
    <svg
      viewBox="0 0 385 96"
      width="100%"
      style={{ maxWidth: 320, display: 'block', margin: '0 auto' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow / glow under book */}
      <ellipse cx="192" cy="90" rx="140" ry="8" fill="#c8e6e2" opacity="0.5" />

      {/* Left page */}
      <path
        d="M192 8 C160 4 80 8 12 22 C8 23 6 26 8 28 L16 82 C14 84 16 86 20 85 C76 72 152 68 192 72 Z"
        fill="#b8ddd8"
      />
      {/* Right page */}
      <path
        d="M192 8 C224 4 304 8 372 22 C376 23 378 26 376 28 L368 82 C370 84 368 86 364 85 C308 72 232 68 192 72 Z"
        fill="#c8e8e3"
      />

      {/* Left page lines */}
      <line x1="40"  y1="34" x2="180" y2="28" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
      <line x1="38"  y1="46" x2="178" y2="40" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
      <line x1="36"  y1="58" x2="176" y2="53" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
      <line x1="36"  y1="70" x2="140" y2="65" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>

      {/* Right page lines */}
      <line x1="204" y1="28" x2="344" y2="34" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
      <line x1="206" y1="40" x2="346" y2="46" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
      <line x1="208" y1="53" x2="348" y2="58" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
      <line x1="244" y1="65" x2="348" y2="70" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>

      {/* Spine */}
      <path
        d="M188 6 C186 6 184 8 184 10 L184 74 C184 76 186 78 188 78 L196 78 C198 78 200 76 200 74 L200 10 C200 8 198 6 196 6 Z"
        fill="#377b8a"
      />

      {/* Left cover flap */}
      <path
        d="M8 26 C8 24 10 22 12 22 L16 24 L20 82 L16 84 C14 84 12 82 12 80 Z"
        fill="#377b8a"
      />
      {/* Right cover flap */}
      <path
        d="M376 26 C376 24 374 22 372 22 L368 24 L364 82 L368 84 C370 84 372 82 372 80 Z"
        fill="#377b8a"
      />

      {/* Left bookmark ribbon */}
      <path d="M20 22 L20 52 L24 48 L28 52 L28 22 Z" fill="#377b8a" opacity="0.8"/>
      {/* Right bookmark ribbon */}
      <path d="M357 22 L357 45 L361 41 L365 45 L365 22 Z" fill="#377b8a" opacity="0.8"/>

      {/* Page curl top center */}
      <path
        d="M186 6 Q192 2 198 6"
        stroke="#2a5c6a"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

export default function OnboardingWelcome() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Top illustration area — white background */}
      <div style={styles.illustrationArea}>

        {/* Decorative circles at exact Figma positions */}
        {CIRCLES.map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(c.x / 414) * 100}%`,
              top: c.y,
              width: c.size,
              height: c.size,
              borderRadius: '50%',
              background: c.color,
              transform: 'none',
            }}
          />
        ))}

        {/* Title — positioned like Figma: x=47, y=174 */}
        <div style={styles.titleWrap}>
          <span style={styles.de}>De</span>
          <span style={styles.appName}>Lichaamsgids</span>
        </div>

        {/* Book illustration — positioned like Figma: y≈348 */}
        <div style={styles.bookWrap}>
          <BookIllustration />
        </div>
      </div>

      {/* Bottom card — gray rounded top, like Figma */}
      <div style={styles.card}>
        <p style={styles.cardText}>
          Ontdek samen met je zorg-<br />
          verleners je lichaam opnieuw met{' '}
          <strong>de Lichaamsgids</strong>
        </p>
        <button style={styles.button} onClick={() => navigate('/onboarding/privacy')}>
          Beginnen &nbsp;›
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    background: '#ffffff',
    maxWidth: '480px',
    margin: '0 auto',
    overflow: 'hidden',
    position: 'relative',
  },
  illustrationArea: {
    position: 'relative',
    flex: 1,
    background: '#ffffff',
    overflow: 'hidden',
    minHeight: 0,
  },
  titleWrap: {
    position: 'absolute',
    left: '47px',
    top: '174px',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.15,
  },
  de: {
    fontSize: '22px',
    fontWeight: '400',
    color: '#377b8a',
    fontFamily: 'Inter, sans-serif',
  },
  appName: {
    fontSize: '42px',
    fontWeight: '700',
    color: '#377b8a',
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '-0.5px',
  },
  bookWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '348px',
    padding: '0 16px',
    zIndex: 2,
  },
  card: {
    background: '#f6f6f6',
    borderRadius: '32px 32px 0 0',
    padding: '28px 42px 44px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    flexShrink: 0,
  },
  cardText: {
    fontSize: '18px',
    fontWeight: '400',
    color: '#727272',
    textAlign: 'center',
    lineHeight: 1.6,
    margin: 0,
    fontFamily: 'Inter, sans-serif',
  },
  button: {
    background: '#377b8a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    padding: '14px 36px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    minHeight: '52px',
    letterSpacing: '0.2px',
  },
};
