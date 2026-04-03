import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from './OnboardingLayout';

function GeenCodeOverlay({ onClose }) {
  return (
    <div style={overlay.backdrop} onClick={onClose}>
      <div style={overlay.sheet} onClick={(e) => e.stopPropagation()}>
        <button style={overlay.closeBtn} onClick={onClose} aria-label="Sluiten">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#377b8a" />
            <path d="M11 11l10 10M21 11l-10 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
        <div style={overlay.decorCircle} />
        <h2 style={overlay.title}>Geen activatiecode ontvangen?</h2>
        <p style={overlay.body}>
          Je activatiecode is verstuurd naar het e-mailadres dat bij je zorgverlener bekend is.
        </p>
        <p style={overlay.body}>
          Controleer ook je spam-map. Heb je nog steeds geen code ontvangen? Neem dan contact op:
        </p>
        <ul style={overlay.list}>
          <li style={overlay.listItem}>
            Stuur een e-mail naar{' '}
            <a href="mailto:info@lichaamsgids.nl" style={overlay.link}>info@lichaamsgids.nl</a>
          </li>
          <li style={overlay.listItem}>
            Bel ons op 06-12345678 (ma–vr, 8.00–16.30)
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function OnboardingActivatiecode() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '']);
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  function handleInput(index, value) {
    const char = value.replace(/[^a-zA-Z0-9]/g, '').slice(-1).toUpperCase();
    const newCode = [...code];
    newCode[index] = char;
    setCode(newCode);
    setError('');

    if (char && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  }

  function handleVerder() {
    const full = code.join('');
    if (full.length < 4) {
      setError('Vul alle vier de vakjes in.');
      return;
    }
    // Store code for potential backend use
    localStorage.setItem('activatiecode', full);
    navigate('/onboarding/dagboek');
  }

  const codeComplete = code.every((c) => c !== '');

  return (
    <>
      <OnboardingLayout step={2} onBack={() => navigate('/onboarding/privacy')}>
        <div style={styles.page}>
          {/* Decorative circles */}
          <div style={{ ...styles.deco, top: 0, right: 16, width: 56, height: 56 }} />
          <div style={{ ...styles.deco, top: 32, right: 48, width: 18, height: 18, opacity: 0.4 }} />

          <div style={styles.content}>
            <div style={styles.decorBig} />
            <h2 style={styles.title}>Wat is je activatiecode?</h2>
            <p style={styles.subtitle}>
              Van het ziekenhuis heb je in e-mail met een activatiecode ontvangen.
            </p>

            {/* 4-digit code input */}
            <div style={styles.codeRow}>
              {code.map((char, i) => (
                <input
                  key={i}
                  ref={inputRefs[i]}
                  type="text"
                  inputMode="text"
                  maxLength={1}
                  value={char}
                  onChange={(e) => handleInput(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  style={{
                    ...styles.codeBox,
                    borderColor: error ? '#c0392b' : char ? '#377b8a' : 'transparent',
                    boxShadow: char ? '0 0 0 2px #cfebe8' : 'none',
                  }}
                  aria-label={`Cijfer ${i + 1}`}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            {error && <p style={styles.errorText}>{error}</p>}
          </div>

          <div style={styles.actions}>
            <button
              style={{ ...styles.button, opacity: codeComplete ? 1 : 0.6 }}
              onClick={handleVerder}
            >
              Verder &nbsp;›
            </button>
            <button style={styles.linkBtn} onClick={() => setShowOverlay(true)}>
              Ik heb geen activatiecode ontvangen
            </button>
          </div>
        </div>
      </OnboardingLayout>

      {showOverlay && <GeenCodeOverlay onClose={() => setShowOverlay(false)} />}
    </>
  );
}

const styles = {
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#f6f6f6',
    position: 'relative',
    overflow: 'hidden',
  },
  deco: {
    position: 'absolute',
    borderRadius: '50%',
    background: '#e6f4f2',
  },
  content: {
    flex: 1,
    padding: '40px 24px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  decorBig: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: '#cfebe8',
    opacity: 0.6,
    zIndex: 0,
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#377b8a',
    textAlign: 'center',
    lineHeight: 1.25,
    marginBottom: '12px',
    position: 'relative',
    zIndex: 1,
  },
  subtitle: {
    fontSize: '16px',
    color: '#727272',
    textAlign: 'center',
    lineHeight: 1.6,
    marginBottom: '48px',
    maxWidth: '280px',
  },
  codeRow: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  },
  codeBox: {
    width: '68px',
    height: '80px',
    borderRadius: '16px',
    background: '#ffffff',
    border: '2px solid transparent',
    fontSize: '32px',
    fontWeight: '700',
    color: '#377b8a',
    textAlign: 'center',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    cursor: 'text',
  },
  errorText: {
    marginTop: '16px',
    color: '#c0392b',
    fontSize: '14px',
    textAlign: 'center',
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
    transition: 'opacity 0.15s',
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
    fontSize: '24px',
    fontWeight: '700',
    color: '#377b8a',
    textAlign: 'center',
    lineHeight: 1.25,
    marginBottom: '16px',
    position: 'relative',
    zIndex: 1,
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
