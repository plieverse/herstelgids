import { useNavigate } from 'react-router-dom';
import OnboardingLayout from './OnboardingLayout';

// ── Card icons ──────────────────────────────────────────────
function DagboekIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      {/* Notebook body */}
      <rect x="16" y="10" width="34" height="44" rx="4" fill="#4a9db0" />
      {/* Page lines */}
      <rect x="22" y="18" width="22" height="2.5" rx="1.25" fill="#e6f4f2" />
      <rect x="22" y="24" width="22" height="2.5" rx="1.25" fill="#e6f4f2" />
      <rect x="22" y="30" width="16" height="2.5" rx="1.25" fill="#e6f4f2" />
      {/* Pencil in bottom-right */}
      <rect x="38" y="38" width="6" height="16" rx="2" fill="#377b8a" transform="rotate(-35 44 46)" />
      {/* Check circle */}
      <circle cx="50" cy="52" r="12" fill="#377b8a" />
      <path d="M44 52l3.5 3.5 6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GidsIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      {/* Left page */}
      <path d="M36 14 C28 11 16 13 10 17 L10 57 C16 54 28 52 36 55 Z" fill="#4a9db0" />
      {/* Right page */}
      <path d="M36 14 C44 11 56 13 62 17 L62 57 C56 54 44 52 36 55 Z" fill="#377b8a" />
      {/* Spine */}
      <rect x="34" y="13" width="4" height="43" rx="2" fill="#2a5c6a" opacity="0.5" />
      {/* Left page lines */}
      <line x1="14" y1="26" x2="32" y2="24" stroke="#e6f4f2" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <line x1="14" y1="33" x2="32" y2="31" stroke="#e6f4f2" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <line x1="14" y1="40" x2="32" y2="38" stroke="#e6f4f2" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      {/* Right page lines */}
      <line x1="40" y1="24" x2="58" y2="26" stroke="#cfebe8" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <line x1="40" y1="31" x2="58" y2="33" stroke="#cfebe8" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <line x1="40" y1="38" x2="58" y2="40" stroke="#cfebe8" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

function BerichtenIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      {/* Speech bubble */}
      <rect x="10" y="13" width="52" height="36" rx="10" fill="#377b8a" />
      {/* Tail */}
      <path d="M20 49 L14 62 L34 52" fill="#377b8a" />
      {/* Lines */}
      <rect x="20" y="24" width="32" height="3" rx="1.5" fill="#e6f4f2" />
      <rect x="20" y="32" width="24" height="3" rx="1.5" fill="#e6f4f2" />
    </svg>
  );
}

// ── Bullet icons ─────────────────────────────────────────────
function BulletIconCircle({ children, bg = '#377b8a' }) {
  return (
    <div style={{
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

function IconPlus() {
  return (
    <BulletIconCircle bg="#4a9db0">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 4v10M4 9h10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </BulletIconCircle>
  );
}

function IconEye() {
  return (
    <BulletIconCircle bg="#4a9db0">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 9C3.5 5.5 7 3.5 9 3.5C11 3.5 14.5 5.5 16 9C14.5 12.5 11 14.5 9 14.5C7 14.5 3.5 12.5 2 9Z" stroke="#fff" strokeWidth="1.8" />
        <circle cx="9" cy="9" r="2.2" fill="#fff" />
      </svg>
    </BulletIconCircle>
  );
}

function IconInfo() {
  return (
    <BulletIconCircle bg="#377b8a">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="5.5" r="1.3" fill="#fff" />
        <path d="M9 8.5v5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </BulletIconCircle>
  );
}

function IconChat() {
  return (
    <BulletIconCircle bg="#377b8a">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2.5" width="14" height="10" rx="3" fill="#fff" opacity="0.9" />
        <path d="M5 12.5l-1.5 3 5-2.5" fill="#fff" opacity="0.9" />
        <rect x="4.5" y="6" width="9" height="1.5" rx="0.75" fill="#377b8a" />
        <rect x="4.5" y="9" width="6" height="1.5" rx="0.75" fill="#377b8a" />
      </svg>
    </BulletIconCircle>
  );
}

// ── Feature config ────────────────────────────────────────────
const FEATURES = {
  dagboek: {
    step: 3,
    title: 'Welkom!',
    subtitle: 'Fijn dat je er bent! Samen met zorgverleners ga je je lichaam opnieuw leren kennen. Het dagboek helpt je om bij te houden hoe je je voelt.',
    icon: <DagboekIcon />,
    iconLabel: 'Dagboek',
    bullets: [
      { iconEl: <IconPlus />, text: 'Vul dagelijks in hoe je je voelt' },
      { iconEl: <IconEye />, text: 'Zorgverleners bekijken je ingevuld dagboeken.' },
    ],
    next: '/onboarding/gids',
    nextLabel: 'Volgende',
    hasSkip: true,
  },
  gids: {
    step: 4,
    title: 'Begrijp wat er in je lichaam gebeurt',
    subtitle: 'Na de operatie voelt veel anders. De gids legt uit welke problemen je kan ervaren en geeft extra uitleg.',
    icon: <GidsIcon />,
    iconLabel: 'Gids',
    bullets: [
      { iconEl: <IconInfo />, text: 'Meer uitleg over het gevoel in je lichaam.' },
      { iconEl: <IconInfo />, text: 'Meer uitleg over onderwerpen die handig zijn tijdens herstel.' },
    ],
    next: '/onboarding/berichten',
    nextLabel: 'Volgende',
    hasSkip: true,
  },
  berichten: {
    step: 5,
    title: 'Je staat er niet alleen voor',
    subtitle: 'Je zorgverlener kijkt mee. Heb je een vraag? Stuur gerust een bericht.',
    icon: <BerichtenIcon />,
    iconLabel: 'Berichten',
    bullets: [
      { iconEl: <IconChat />, text: 'Staat je vraag niet in de Gids? Stuur zorgverleners een bericht!' },
      { iconEl: <IconChat />, text: 'Zorgverleners kunnen ook berichten naar jou sturen.' },
    ],
    next: '/registreren',
    nextLabel: 'Klaar',
    nextCheck: true,
    hasSkip: false,
  },
};

export default function OnboardingFeature({ feature }) {
  const navigate = useNavigate();
  const config = FEATURES[feature];

  function handleNext() {
    if (feature === 'berichten') {
      localStorage.setItem('onboardingComplete', 'true');
    }
    navigate(config.next);
  }

  function handleSkip() {
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/registreren');
  }

  return (
    <OnboardingLayout step={config.step} onBack={() => navigate(-1)}>
      <div style={styles.page}>
        <div style={styles.content}>
          <h2 style={styles.title}>{config.title}</h2>
          <p style={styles.subtitle}>{config.subtitle}</p>

          {/* Feature card */}
          <div style={styles.card}>
            <div style={styles.iconWrap}>
              {config.icon}
            </div>
            <p style={styles.iconLabel}>{config.iconLabel}</p>

            <div style={styles.bullets}>
              {config.bullets.map((b, i) => (
                <div key={i} style={styles.bulletRow}>
                  {b.iconEl}
                  <span style={styles.bulletText}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <button style={styles.button} onClick={handleNext}>
            {config.nextLabel}
            {config.nextCheck ? ' ✓' : ' >'}
          </button>
          {config.hasSkip && (
            <button style={styles.linkBtn} onClick={handleSkip}>
              Overslaan
            </button>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
}

const styles = {
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
  },
  content: {
    flex: 1,
    padding: '32px 24px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#377b8a',
    textAlign: 'center',
    lineHeight: 1.25,
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#727272',
    textAlign: 'center',
    lineHeight: 1.65,
    marginBottom: '28px',
    maxWidth: '300px',
  },
  card: {
    background: '#f6f6f6',
    borderRadius: '20px',
    padding: '28px 24px 24px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  iconWrap: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    background: '#e6f4f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4px',
  },
  iconLabel: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#377b8a',
    marginBottom: '16px',
  },
  bullets: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  bulletRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '12px 14px',
  },
  bulletText: {
    fontSize: '15px',
    color: '#727272',
    lineHeight: 1.5,
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px 24px 48px',
    gap: '20px',
  },
  button: {
    background: '#377b8a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    padding: '16px 48px',
    fontSize: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    minHeight: '56px',
    minWidth: '200px',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#377b8a',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    minHeight: '44px',
  },
};
