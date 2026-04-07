import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function GeenCodeOverlay({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Card: breedte 361px, hoogte past zich aan content aan */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 361,
          background: '#FFFFFF',
          borderRadius: 20,
          paddingTop: 110,
          paddingBottom: 24,
          paddingLeft: 24,
          paddingRight: 8,
        }}
      >
        {/* Ellipse 30: 76×76, gecentreerd bovenin */}
        <div style={{
          position: 'absolute',
          width: 76,
          height: 76,
          left: 146,
          top: 25,
          borderRadius: '50%',
          background: '#CFEBE8',
        }} />

        {/* Title "Activatiecode" */}
        <div style={{
          position: 'absolute',
          left: 65,
          top: 35,
          width: 231,
          height: 57,
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: 24,
          lineHeight: '29px',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          color: '#377B8A',
        }}>
          Activatiecode
        </div>

        {/* Body tekst: doorlopend, geen witregel */}
        <div style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '19px',
          color: '#727272',
        }}>
          <p style={{ margin: '0 0 12px 0' }}>Van het ziekenhuis ontvang je een e-mail met een persoonlijke activatiecode.</p>
          <p style={{ margin: 0 }}>Heb je geen e-mail ontvangen? Neem dan contact op met je zorgverlener.</p>
        </div>

        {/* Sluitknop: rechtsbovenin */}
        <button
          onClick={onClose}
          aria-label="Sluiten"
          style={{
            position: 'absolute',
            right: 8,
            top: 7,
            width: 46,
            height: 46,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: '#377B8A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>
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
    if (char && index < 3) inputRefs[index + 1].current?.focus();
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  }

  function handleVerder() {
    const full = code.join('');
    if (full.length < 4) { setError('Vul alle vier de vakjes in.'); return; }
    localStorage.setItem('activatiecode', full);
    navigate('/onboarding/dagboek');
  }

  return (
    <>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '414px',
        height: '100dvh',
        minHeight: '736px',
        margin: '0 auto',
        background: '#FFFFFF',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}>

        {/* ── Ellipse 33: decorative circle in header ── */}
        <div style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          left: '44.2%',
          top: '15px',
          borderRadius: '50%',
          background: '#E6F4F2',
        }} />

        {/* ── Ellipse 34: small decorative circle ── */}
        <div style={{
          position: 'absolute',
          width: '16px',
          height: '16px',
          left: '54.35%',
          top: '59px',
          borderRadius: '50%',
          background: '#E6F4F2',
        }} />

        {/* ── Back button ── */}
        <button
          onClick={() => navigate('/onboarding/privacy')}
          aria-label="Terug"
          style={{
            position: 'absolute',
            width: '46px',
            height: '46px',
            left: '1px',
            top: '0px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
          }}
        >
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: '#E6F4F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
              <path d="M10 1L5 5L10 9" stroke="#377B8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>

        {/* ── "De Lichaamsgids" header title ── */}
        <div style={{
          position: 'absolute',
          left: '11.35%',
          right: '11.59%',
          top: '25px',
          height: '29px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '29px',
          color: '#377B8A',
          textAlign: 'center',
        }}>
          De Lichaamsgids
        </div>

        {/* ── Progress bar: 2 active, 3 inactive ── */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '90px',
          width: '374px',
          height: '6px',
          display: 'flex',
          flexDirection: 'row',
          gap: '5px',
        }}>
          <div style={{ flex: 1, height: '6px', background: '#377B8A', opacity: 0.5, borderRadius: '3px' }} />
          <div style={{ flex: 1, height: '6px', background: '#377B8A', opacity: 0.5, borderRadius: '3px' }} />
          <div style={{ flex: 1, height: '6px', background: '#CFEBE8', opacity: 0.5, borderRadius: '3px' }} />
          <div style={{ flex: 1, height: '6px', background: '#CFEBE8', opacity: 0.5, borderRadius: '3px' }} />
          <div style={{ flex: 1, height: '6px', background: '#CFEBE8', opacity: 0.5, borderRadius: '3px' }} />
        </div>

        {/* ── Rectangle 28: grey content area ── */}
        <div style={{
          position: 'absolute',
          left: '0px',
          top: '113px',
          width: '414px',
          bottom: '0px',
          background: '#F6F6F6',
          borderRadius: '20px 20px 0px 0px',
        }} />

        {/* ── Ellipse 29: teal circle behind title ── */}
        <div style={{
          position: 'absolute',
          width: '76px',
          height: '76px',
          left: '168px',
          top: '166px',
          borderRadius: '50%',
          background: '#CFEBE8',
        }} />

        {/* ── "Wat is je activatiecode?" title ──
            left 91px, top 152px, width 231px, height 57px */}
        <div style={{
          position: 'absolute',
          width: '231px',
          left: '91px',
          top: '152px',
          height: '57px',
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '29px',
          color: '#377B8A',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          Wat is je activatiecode?
        </div>

        {/* ── Subtitle text ──
            left 44px, top 204px, width 331px, height 66px */}
        <div style={{
          position: 'absolute',
          width: '331px',
          left: '44px',
          top: '204px',
          height: '66px',
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '19px',
          color: '#727272',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          Van het ziekenhuis heb je in e-mail met een activatiecode ontvangen.
        </div>

        {/* ── 4 code input boxes ──
            left 30px, top 335px, width 359px, height 104px, gap 13px */}
        <div style={{
          position: 'absolute',
          left: '30px',
          top: '335px',
          width: '359px',
          height: '104px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '13px',
        }}>
          {code.map((char, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="text"
              inputMode="text"
              maxLength={1}
              value={char}
              onChange={e => handleInput(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              autoFocus={i === 0}
              aria-label={`Cijfer ${i + 1}`}
              style={{
                width: '80px',
                height: '104px',
                background: '#FFFFFF',
                borderRadius: '20px',
                border: error ? '2px solid #c0392b' : char ? '2px solid #377B8A' : '2px solid transparent',
                fontSize: '36px',
                fontWeight: '700',
                color: '#377B8A',
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                cursor: 'text',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {error && (
          <div style={{
            position: 'absolute',
            left: '30px',
            top: '452px',
            color: '#c0392b',
            fontSize: '14px',
            fontFamily: 'Inter',
          }}>
            {error}
          </div>
        )}

        {/* ── "Verder" button ──
            width 170px, height 50px, left 116px, top 551px, radius 20px */}
        <button
          onClick={handleVerder}
          style={{
            position: 'absolute',
            width: '170px',
            height: '50px',
            left: '116px',
            top: '551px',
            background: '#377B8A',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '29px',
            color: '#FFFFFF',
            opacity: code.every(c => c !== '') ? 1 : 0.6,
          }}
        >
          Verder
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ── "Ik heb geen activatiecode ontvangen" link ──
            width 285px, height 52px, left 67px, top 615px */}
        <button
          onClick={() => setShowOverlay(true)}
          style={{
            position: 'absolute',
            width: '285px',
            height: '52px',
            left: '67px',
            top: '615px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '19px',
            color: '#377B8A',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Ik heb geen activatiecode ontvangen
        </button>
      </div>

      {showOverlay && <GeenCodeOverlay onClose={() => setShowOverlay(false)} />}
    </>
  );
}

