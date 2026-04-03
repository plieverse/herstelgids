import { useNavigate } from 'react-router-dom';

export default function OnboardingDagboek() {
  const navigate = useNavigate();

  function handleVolgende() {
    navigate('/onboarding/gids');
  }

  function handleOverslaan() {
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/registreren');
  }

  return (
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
        onClick={() => navigate('/onboarding/activatiecode')}
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

      {/* ── Progress bar: 3 active, 2 inactive ── */}
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
        <div style={{ flex: 1, height: '6px', background: '#377B8A', opacity: 0.5, borderRadius: '3px' }} />
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

      {/* ── Ellipse 29: teal circle behind title ──
          76×76px, left 168px, top 145px */}
      <div style={{
        position: 'absolute',
        width: '76px',
        height: '76px',
        left: '168px',
        top: '145px',
        borderRadius: '50%',
        background: '#CFEBE8',
      }} />

      {/* ── "Welkom!" title ──
          left 91px, top 131px, width 231px, height 57px */}
      <div style={{
        position: 'absolute',
        width: '231px',
        left: '91px',
        top: '131px',
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
        Welkom!
      </div>

      {/* ── Subtitle ──
          left 43px, top 174px, width 331px, height 94px */}
      <div style={{
        position: 'absolute',
        width: '331px',
        left: '43px',
        top: '174px',
        height: '94px',
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
        Fijn dat je er bent! Samen met zorgverleners ga je je lichaam opnieuw leren kennen.
        Het dagboek helpt je om bij te houden hoe je je voelt.
      </div>

      {/* ── White card (Rectangle 33) ──
          left 50px, top 308px, width 331px, height 290px */}
      <div style={{
        position: 'absolute',
        width: '331px',
        height: '290px',
        left: '50px',
        top: '308px',
        background: '#FFFFFF',
        borderRadius: '20px',
      }} />

      {/* ── Ellipse 32: teal circle inside card ──
          130×130px, left 150px, top 334px */}
      <div style={{
        position: 'absolute',
        width: '130px',
        height: '130px',
        left: '150px',
        top: '334px',
        borderRadius: '50%',
        background: '#CFEBE8',
      }} />

      {/* ── Dagboek icon (contract_edit) ──
          130×130px, left 142px, top 309px */}
      <div style={{
        position: 'absolute',
        width: '130px',
        height: '130px',
        left: '142px',
        top: '309px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          {/* Document body */}
          <rect x="14" y="8" width="38" height="50" rx="4" fill="#377B8A" />
          {/* Page lines */}
          <rect x="20" y="18" width="26" height="3" rx="1.5" fill="#E6F4F2" />
          <rect x="20" y="26" width="26" height="3" rx="1.5" fill="#E6F4F2" />
          <rect x="20" y="34" width="18" height="3" rx="1.5" fill="#E6F4F2" />
          {/* Pencil */}
          <rect x="42" y="44" width="7" height="22" rx="2" fill="#CFEBE8" transform="rotate(-40 48 52)" />
          <rect x="41" y="43" width="7" height="5" rx="1" fill="#377B8A" transform="rotate(-40 48 52)" />
        </svg>
      </div>

      {/* ── "Dagboek" label ──
          left 99px, top 420px, width 231px, height 57px */}
      <div style={{
        position: 'absolute',
        width: '231px',
        left: '99px',
        top: '420px',
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
        Dagboek
      </div>

      {/* ── Bullet row 1 (Rectangle 34) ──
          left 66px, top 487px, width 300px, height 43px */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '43px',
        left: '66px',
        top: '487px',
        background: '#F6F6F6',
        borderRadius: '20px',
      }} />
      {/* Frame 61: icon + text, left 81px, top 493px */}
      <div style={{
        position: 'absolute',
        left: '81px',
        top: '493px',
        width: '260px',
        height: '32px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '13px',
      }}>
        {/* Teal circle behind icon */}
        <div style={{ position: 'relative', width: '32px', height: '32px', flexShrink: 0 }}>
          <div style={{
            position: 'absolute',
            width: '27px',
            height: '27px',
            left: '-3px',
            top: '1px',
            borderRadius: '50%',
            background: '#CFEBE8',
          }} />
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ position: 'relative', zIndex: 1 }}>
            <path d="M16 8v16M8 16h16" stroke="#377B8A" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <span style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '15px',
          lineHeight: '18px',
          color: '#727272',
        }}>
          Vul dagelijks in hoe je je voelt
        </span>
      </div>

      {/* ── Bullet row 2 (Rectangle 35) ──
          left 66px, top 537px, width 300px, height 43px */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '43px',
        left: '66px',
        top: '537px',
        background: '#F6F6F6',
        borderRadius: '20px',
      }} />
      {/* Frame 62: icon + text, left 81px, top 543px */}
      <div style={{
        position: 'absolute',
        left: '81px',
        top: '543px',
        width: '260px',
        height: '32px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '13px',
      }}>
        <div style={{ position: 'relative', width: '32px', height: '32px', flexShrink: 0 }}>
          <div style={{
            position: 'absolute',
            width: '27px',
            height: '27px',
            left: '-3px',
            top: '1px',
            borderRadius: '50%',
            background: '#CFEBE8',
          }} />
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ position: 'relative', zIndex: 1 }}>
            <ellipse cx="16" cy="16" rx="10" ry="6.5" stroke="#377B8A" strokeWidth="2" />
            <circle cx="16" cy="16" r="3" fill="#377B8A" />
          </svg>
        </div>
        <span style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '15px',
          lineHeight: '18px',
          color: '#727272',
        }}>
          Zorgverleners bekijken je ingevuld dagboeken.
        </span>
      </div>

      {/* ── "Volgende" button ──
          width 170px, height 50px, left 122px, top 635px */}
      <button
        onClick={handleVolgende}
        style={{
          position: 'absolute',
          width: '170px',
          height: '50px',
          left: '122px',
          top: '635px',
          background: '#377B8A',
          borderRadius: '20px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
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
        Volgende
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── "Overslaan" link ──
          width 152px, height 66px, left 131px, top 676px */}
      <button
        onClick={handleOverslaan}
        style={{
          position: 'absolute',
          width: '152px',
          height: '66px',
          left: '131px',
          top: '676px',
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
        Overslaan
      </button>
    </div>
  );
}
