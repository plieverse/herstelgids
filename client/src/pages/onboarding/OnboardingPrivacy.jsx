import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from './OnboardingLayout';

function PrivacyOverlay({ onClose }) {
  return (
    <div style={overlay.backdrop} onClick={onClose}>
      <div style={overlay.sheet} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button style={overlay.closeBtn} onClick={onClose} aria-label="Sluiten">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#377b8a" />
            <path d="M11 11l10 10M21 11l-10 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Decorative circle behind title */}
        <div style={overlay.decorCircle} />

        <h2 style={overlay.title}>Je gegevens en{'\n'}privacy</h2>

        <p style={overlay.body}>
          Heb je een vraag over je gegevens en de privacy daarvan? Lees dan de{' '}
          <a href="#" style={overlay.link}>privacy-informatie</a>.
        </p>

        <p style={overlay.body}>
          Of neem contact op met medewerkers van de Lichaamsgids.
        </p>

        <ul style={overlay.list}>
          <li style={overlay.listItem}>
            Stuur een e-mail naar{' '}
            <a href="mailto:info@lichaamsgids.nl" style={overlay.link}>info@lichaamsgids.nl</a>
          </li>
          <li style={overlay.listItem}>
            Bel ons op 06-12345678. We zijn bereikbaar op werkdagen van 8.00 – 16.30
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function OnboardingPrivacy() {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);

  function handleAkkoord() {
    navigate('/onboarding/activatiecode');
  }

  return (
    <>
      <OnboardingLayout step={1} onBack={() => navigate('/onboarding')}>
        <div style={styles.page}>
          {/* Decorative circles */}
          <div style={{ ...styles.deco, top: 0, right: 20, width: 60, height: 60 }} />
          <div style={{ ...styles.deco, top: 30, right: 50, width: 20, height: 20, opacity: 0.5 }} />

          <div style={styles.content}>
            <h2 style={styles.title}>Je gegevens en privacy</h2>

            <p style={styles.body}>
              <strong>De Lichaamsgids app verzamelt een aantal van jouw gegevens.</strong>{' '}
              Dit doen we zodat je samen met zorgverleners je lichaam opnieuw kan leren kennen.
            </p>

            <p style={styles.body}>
              We verzamelen en gebruiken gegevens over je gezondheid om je beter te helpen.
              Alleen zorgverleners van Ziekenhuis Groep Twente (ZGT) kunnen de gegevens bekijken.
            </p>

            <p style={styles.body}>
              Lees meer hierover in de{' '}
              <a href="#" style={styles.link}>privacyinformatie</a>.
            </p>
          </div>

          <div style={styles.actions}>
            <button style={styles.button} onClick={handleAkkoord}>
              Akkoord &nbsp;›
            </button>
            <button style={styles.linkBtn} onClick={() => setShowOverlay(true)}>
              Ik heb een vraag
            </button>
          </div>
        </div>
      </OnboardingLayout>

      {showOverlay && <PrivacyOverlay onClose={() => setShowOverlay(false)} />}
    </>
  );
}

const styles = {
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  deco: {
    position: 'absolute',
    borderRadius: '50%',
    background: '#e6f4f2',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: '32px 24px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#377b8a',
    textAlign: 'center',
    lineHeight: 1.25,
    marginBottom: '8px',
  },
  body: {
    fontSize: '16px',
    color: '#727272',
    lineHeight: 1.65,
  },
  link: {
    color: '#377b8a',
    textDecoration: 'underline',
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

const overlay = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  sheet: {
    background: '#ffffff',
    borderRadius: '24px 24px 0 0',
    padding: '40px 28px 48px',
    width: '100%',
    maxWidth: '480px',
    position: 'relative',
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    zIndex: 1,
  },
  decorCircle: {
    position: 'absolute',
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: '#e6f4f2',
    zIndex: 0,
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#377b8a',
    textAlign: 'center',
    lineHeight: 1.25,
    marginBottom: '20px',
    position: 'relative',
    zIndex: 1,
    whiteSpace: 'pre-line',
  },
  body: {
    fontSize: '16px',
    color: '#2a2a2a',
    lineHeight: 1.65,
    marginBottom: '12px',
  },
  link: {
    color: '#377b8a',
    textDecoration: 'underline',
  },
  list: {
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  listItem: {
    fontSize: '16px',
    color: '#2a2a2a',
    lineHeight: 1.6,
  },
};
