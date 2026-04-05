import { useNavigate } from 'react-router-dom';

export default function OnboardingGids() {
  const navigate = useNavigate();

  function handleVolgende() {
    navigate('/onboarding/berichten');
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
        onClick={() => navigate('/onboarding/dagboek')}
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

      {/* ── Progress bar: 4 active, 1 inactive ── */}
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
        <div style={{ flex: 1, height: '6px', background: '#377B8A', opacity: 0.5, borderRadius: '3px' }} />
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

      {/* ── Title ── */}
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
        Begrijp wat er in je lichaam gebeurt
      </div>

      {/* ── Subtitle ── */}
      <div style={{
        position: 'absolute',
        width: '331px',
        left: '44px',
        top: '209px',
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
        De gids helpt je om bij te houden hoe je je voelt.
      </div>

      {/* ── White card (Rectangle 33) ── */}
      <div style={{
        position: 'absolute',
        width: '331px',
        height: '290px',
        left: '41px',
        top: '306px',
        background: '#FFFFFF',
        borderRadius: '20px',
      }} />

      {/* ── Ellipse 32: teal circle inside card ── */}
      <div style={{
        position: 'absolute',
        width: '130px',
        height: '130px',
        left: '141px',
        top: '332px',
        borderRadius: '50%',
        background: '#CFEBE8',
      }} />

      {/* ── Gids icon (menu_book) ── */}
      <div style={{
        position: 'absolute',
        width: '140px',
        height: '140px',
        left: '136px',
        top: '298px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span className="material-symbols-outlined" style={{
          fontSize: '96px',
          color: '#377B8A',
          userSelect: 'none',
        }}>menu_book</span>
      </div>

      {/* ── "Gids" label ── */}
      <div style={{
        position: 'absolute',
        width: '231px',
        left: '90px',
        top: '410px',
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
        Gids
      </div>

      {/* ── Bullet row 1 (Rectangle 34) ── */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '43px',
        left: '57px',
        top: '485px',
        background: '#F6F6F6',
        borderRadius: '20px',
      }} />
      {/* Frame 61: icon + text */}
      <div style={{
        position: 'absolute',
        left: '72px',
        top: '491px',
        width: '270px',
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
          <span className="material-symbols-outlined" style={{
            position: 'relative', zIndex: 1,
            fontSize: '22px', color: '#377B8A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '32px', height: '32px', userSelect: 'none',
          }}>contact_support</span>
        </div>
        <span style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '15px',
          lineHeight: '18px',
          color: '#727272',
        }}>
          Meer uitleg over het gevoel in je lichaam.
        </span>
      </div>

      {/* ── Bullet row 2 (Rectangle 35) ── */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '43px',
        left: '57px',
        top: '535px',
        background: '#F6F6F6',
        borderRadius: '20px',
      }} />
      {/* Frame 62: icon + text */}
      <div style={{
        position: 'absolute',
        left: '72px',
        top: '541px',
        width: '270px',
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
          <span className="material-symbols-outlined" style={{
            position: 'relative', zIndex: 1,
            fontSize: '22px', color: '#377B8A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '32px', height: '32px', userSelect: 'none',
          }}>contact_support</span>
        </div>
        <span style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '15px',
          lineHeight: '18px',
          color: '#727272',
        }}>
          Meer uitleg over onderwerpen die handig zijn tijdens herstel.
        </span>
      </div>

      {/* ── "Volgende" button ── */}
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

      {/* ── "Overslaan" link ── */}
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
