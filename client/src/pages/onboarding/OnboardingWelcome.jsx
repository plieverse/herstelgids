import { useNavigate } from 'react-router-dom';

// Floating decorative circles
const CIRCLES = [
  { top: '8%',  left: '10%', size: 36, color: '#cfebd4' },
  { top: '5%',  left: '55%', size: 24, color: '#ebcfde' },
  { top: '12%', left: '75%', size: 44, color: '#ebe9cf' },
  { top: '22%', left: '5%',  size: 20, color: '#dfcfeb' },
  { top: '18%', left: '85%', size: 18, color: '#f4d2bc' },
  { top: '30%', left: '70%', size: 30, color: '#eff6f5' },
  { top: '35%', left: '15%', size: 16, color: '#f4d2bc' },
  { top: '42%', left: '40%', size: 52, color: '#eff6f5' },
];

function BookIllustration() {
  return (
    <svg width="200" height="130" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Book shadow */}
      <ellipse cx="100" cy="122" rx="72" ry="6" fill="#cfebe8" opacity="0.5" />
      {/* Left page */}
      <path d="M100 18 C80 14 40 16 10 24 L10 110 C40 102 80 100 100 104 Z" fill="#4a9db0" />
      {/* Right page */}
      <path d="M100 18 C120 14 160 16 190 24 L190 110 C160 102 120 100 100 104 Z" fill="#377b8a" />
      {/* Spine crease */}
      <path d="M100 17 L100 104" stroke="#2a5c6a" strokeWidth="2" opacity="0.4" />
      {/* Left page lines */}
      <line x1="26" y1="48" x2="88" y2="44" stroke="#e6f4f2" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="26" y1="60" x2="88" y2="57" stroke="#e6f4f2" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="26" y1="72" x2="88" y2="70" stroke="#e6f4f2" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="26" y1="84" x2="68" y2="82" stroke="#e6f4f2" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      {/* Right page lines */}
      <line x1="112" y1="44" x2="174" y2="48" stroke="#cfebe8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="112" y1="57" x2="174" y2="60" stroke="#cfebe8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="112" y1="70" x2="174" y2="72" stroke="#cfebe8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="132" y1="82" x2="174" y2="84" stroke="#cfebe8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      {/* Top curve of pages */}
      <path d="M10 24 Q55 18 100 18 Q145 18 190 24" stroke="#2a5c6a" strokeWidth="1.5" fill="none" opacity="0.3" />
    </svg>
  );
}

export default function OnboardingWelcome() {
  const navigate = useNavigate();

  function handleBeginnen() {
    navigate('/onboarding/privacy');
  }

  return (
    <div style={styles.page}>
      {/* Illustration area */}
      <div style={styles.illustrationArea}>
        {CIRCLES.map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: c.top,
              left: c.left,
              width: c.size,
              height: c.size,
              borderRadius: '50%',
              background: c.color,
              opacity: 0.85,
            }}
          />
        ))}

        <div style={styles.titleBlock}>
          <span style={styles.de}>De</span>
          <span style={styles.appName}>Lichaamsgids</span>
        </div>

        <div style={styles.bookWrap}>
          <BookIllustration />
        </div>
      </div>

      {/* Bottom card */}
      <div style={styles.card}>
        <p style={styles.cardText}>
          Ontdek samen met je zorgverleners je lichaam opnieuw met{' '}
          <strong>de Lichaamsgids</strong>
        </p>
        <button style={styles.button} onClick={handleBeginnen}>
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
    minHeight: '100dvh',
    background: '#ffffff',
    maxWidth: '480px',
    margin: '0 auto',
    overflow: 'hidden',
  },
  illustrationArea: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '48px',
    paddingBottom: '24px',
    background: '#ffffff',
  },
  titleBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0px',
    marginBottom: '24px',
    position: 'relative',
    zIndex: 1,
  },
  de: {
    fontSize: '22px',
    fontWeight: '400',
    color: '#377b8a',
    lineHeight: 1.2,
  },
  appName: {
    fontSize: '38px',
    fontWeight: '700',
    color: '#377b8a',
    lineHeight: 1.15,
    letterSpacing: '-0.5px',
  },
  bookWrap: {
    position: 'relative',
    zIndex: 1,
  },
  card: {
    background: '#ffffff',
    borderRadius: '28px 28px 0 0',
    padding: '28px 28px 40px',
    boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  cardText: {
    fontSize: '18px',
    color: '#727272',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  button: {
    background: '#377b8a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    padding: '16px 40px',
    fontSize: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    minHeight: '56px',
    minWidth: '180px',
  },
};
