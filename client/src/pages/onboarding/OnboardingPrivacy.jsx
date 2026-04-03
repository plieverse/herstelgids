import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivacyOverlay({ onClose }) {
  return (
    <div style={ov.backdrop} onClick={onClose}>
      <div style={ov.sheet} onClick={e => e.stopPropagation()}>
        {/* Decorative circle */}
        <div style={ov.decorCircle} />
        {/* Close button */}
        <button style={ov.closeBtn} onClick={onClose} aria-label="Sluiten">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#377B8A" />
            <path d="M11 11l10 10M21 11l-10 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
        <h2 style={ov.title}>Je gegevens en privacy</h2>
        <p style={ov.body}>
          Heb je een vraag over je gegevens en de privacy daarvan? Lees dan de{' '}
          <a href="#" style={ov.link}>privacy-informatie</a>.
        </p>
        <p style={ov.body}>
          Of neem contact op met medewerkers van de Lichaamsgids.
        </p>
        <ul style={ov.list}>
          <li style={ov.listItem}>Stuur een e-mail naar <a href="mailto:info@lichaamsgids.nl" style={ov.link}>info@lichaamsgids.nl</a></li>
          <li style={ov.listItem}>Bel ons op 06-12345678. We zijn bereikbaar op werkdagen van 8.00 – 16.30</li>
        </ul>
      </div>
    </div>
  );
}

export default function OnboardingPrivacy() {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      {/* Full-screen container: 414×736 from Figma */}
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
          onClick={() => navigate('/onboarding')}
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

        {/* ── "De Lichaamsgids" header title ──
            left: 11.35%, right: 11.59%, top: 16.45% of 152px topbar = ~25px */}
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

        {/* ── Progress bar: left 20px, top 90px, 5 segments, gap 5px ── */}
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
          {/* Rectangle 19 – active */}
          <div style={{ flex: 1, height: '6px', background: '#377B8A', opacity: 0.5, borderRadius: '3px' }} />
          {/* Rectangle 15–18 – inactive */}
          <div style={{ flex: 1, height: '6px', background: '#CFEBE8', opacity: 0.5, borderRadius: '3px' }} />
          <div style={{ flex: 1, height: '6px', background: '#CFEBE8', opacity: 0.5, borderRadius: '3px' }} />
          <div style={{ flex: 1, height: '6px', background: '#CFEBE8', opacity: 0.5, borderRadius: '3px' }} />
          <div style={{ flex: 1, height: '6px', background: '#CFEBE8', opacity: 0.5, borderRadius: '3px' }} />
        </div>

        {/* ── Rectangle 28: grey content area, top 113px, radius 20px 20px 0 0 ── */}
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
          left: '172px',
          top: '142px',
          borderRadius: '50%',
          background: '#CFEBE8',
        }} />

        {/* ── "Je gegevens en privacy" title ──
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
          Je gegevens en privacy
        </div>

        {/* ── Body text ──
            left 20px, top 262px, width 373px */}
        <div style={{
          position: 'absolute',
          width: '373px',
          left: '20px',
          top: '262px',
          fontFamily: 'Inter',
          fontSize: '16px',
          lineHeight: '19px',
          color: '#727272',
        }}>
          <strong>De Lichaamsgids app verzamelt een aantal van jouw gegevens.</strong>
          {' '}Dit doen we zodat je samen met zorgverleners je lichaam opnieuw kan leren kennen.
          <br /><br />
          We verzamelen en gebruiken gegevens over je gezondheid om je beter te helpen.
          Alleen zorgverleners van Ziekenhuis Groep Twente (ZGT) kunnen de gegevens bekijken.
          <br /><br />
          Lees meer hierover in de{' '}
          <span style={{ color: '#377B8A', textDecoration: 'underline', cursor: 'pointer' }}>
            privacyinformatie
          </span>.
        </div>

        {/* ── "Akkoord" button ──
            width 170px, height 50px, left 121px, top 538px, radius 20px */}
        <button
          onClick={() => navigate('/onboarding/activatiecode')}
          style={{
            position: 'absolute',
            width: '170px',
            height: '50px',
            left: '121px',
            top: '538px',
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
          }}
        >
          Akkoord
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ── "Ik heb een vraag" link ──
            width 144px, height 66px, left 130px, top 588px */}
        <button
          onClick={() => setShowOverlay(true)}
          style={{
            position: 'absolute',
            width: '144px',
            height: '66px',
            left: '130px',
            top: '588px',
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
          Ik heb een vraag
        </button>
      </div>

      {showOverlay && <PrivacyOverlay onClose={() => setShowOverlay(false)} />}
    </>
  );
}

const ov = {
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
    background: '#FFFFFF',
    borderRadius: '24px 24px 0 0',
    padding: '48px 28px 48px',
    width: '100%',
    maxWidth: '414px',
    position: 'relative',
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: '#CFEBE8',
    zIndex: 0,
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
  title: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '29px',
    color: '#377B8A',
    textAlign: 'center',
    marginBottom: '20px',
    position: 'relative',
    zIndex: 1,
  },
  body: {
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#2a2a2a',
    marginBottom: '12px',
  },
  link: {
    color: '#377B8A',
    textDecoration: 'underline',
  },
  list: {
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  listItem: {
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#2a2a2a',
  },
};
