import { useNavigate } from 'react-router-dom';
import OnboardingLayout from './OnboardingLayout';

// SVG icons per feature
function DagboekIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <rect x="14" y="10" width="36" height="46" rx="4" fill="#4a9db0" />
      <rect x="18" y="16" width="28" height="3" rx="1.5" fill="#e6f4f2" />
      <rect x="18" y="23" width="28" height="3" rx="1.5" fill="#e6f4f2" />
      <rect x="18" y="30" width="20" height="3" rx="1.5" fill="#e6f4f2" />
      <circle cx="50" cy="50" r="14" fill="#377b8a" />
      <path d="M44 50l2 2 5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GidsIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <path d="M36 12 C28 9 16 11 10 15 L10 58 C16 55 28 53 36 56 Z" fill="#4a9db0" />
      <path d="M36 12 C44 9 56 11 62 15 L62 58 C56 55 44 53 36 56 Z" fill="#377b8a" />
      <line x1="36" y1="12" x2="36" y2="56" stroke="#2a5c6a" strokeWidth="2" opacity="0.4" />
      <line x1="16" y1="25" x2="32" y2="23" stroke="#e6f4f2" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="16" y1="33" x2="32" y2="31" stroke="#e6f4f2" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="40" y1="23" x2="56" y2="25" stroke="#cfebe8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="40" y1="31" x2="56" y2="33" stroke="#cfebe8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

function BerichtenIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <rect x="10" y="14" width="52" height="38" rx="10" fill="#377b8a" />
      <path d="M22 52 L16 62 L36 54" fill="#377b8a" />
      <rect x="20" y="26" width="32" height="3" rx="1.5" fill="#e6f4f2" />
      <rect x="20" y="34" width="24" height="3" rx="1.5" fill="#e6f4f2" />
    </svg>
  );
}

const FEATURES = {
  dagboek: {
    step: 3,
    title: 'Welkom!',
    subtitle: 'Fijn dat je er bent! Samen met zorgverleners ga je je lichaam opnieuw leren kennen. Het dagboek helpt je om bij te houden hoe je je voelt.',
    icon: <DagboekIcon />,
    iconLabel: 'Dagboek',
    bullets: [
      { icon: '+', text: 'Vul dagelijks in hoe je je voelt' },
      { icon: '👁', text: 'Zorgverleners bekijken je ingevuld dagboeken.' },
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
      { icon: 'ℹ', text: 'Meer uitleg over het gevoel in je lichaam.' },
      { icon: 'ℹ', text: 'Meer uitleg over onderwerpen die handig zijn tijdens herstel.' },
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
      { icon: '💬', text: 'Staat je vraag niet in de Gids? Stuur zorgverleners een bericht!' },
      { icon: '💬', text: 'Zorgverleners kunnen ook berichten naar jou sturen.' },
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
                  <span style={styles.bulletIcon}>{b.icon}</span>
                  <span style={styles.bulletText}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <button style={styles.button} onClick={handleNext}>
            {config.nextLabel}
            {config.nextCheck ? ' ✓' : ' ›'}
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
    alignItems: 'flex-start',
    gap: '12px',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '12px 14px',
  },
  bulletIcon: {
    fontSize: '18px',
    minWidth: '24px',
    textAlign: 'center',
    marginTop: '1px',
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
