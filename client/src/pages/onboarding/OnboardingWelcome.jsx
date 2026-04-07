import { useNavigate } from 'react-router-dom';

export default function OnboardingWelcome() {
  const navigate = useNavigate();

  function handleBegrepen() {
    navigate('/onboarding/privacy');
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

      {/* ── Decorative circles ── */}

      {/* Ellipse 20: 129×129, left:78, top:122, #EFF6F5 */}
      <div style={{ position: 'absolute', width: '129px', height: '129px', left: '78px', top: '122px', borderRadius: '50%', background: '#EFF6F5' }} />

      {/* Ellipse 21: 71×71, left:181, top:251, #EBE9CF */}
      <div style={{ position: 'absolute', width: '71px', height: '71px', left: '181px', top: '251px', borderRadius: '50%', background: '#EBE9CF' }} />

      {/* Ellipse 23: 51×51, left:43, top:235, #F4D2BC */}
      <div style={{ position: 'absolute', width: '51px', height: '51px', left: '43px', top: '235px', borderRadius: '50%', background: '#F4D2BC' }} />

      {/* Ellipse 19 (first): 77×77, left:238, top:159, #EBCFDE */}
      <div style={{ position: 'absolute', width: '77px', height: '77px', left: '238px', top: '159px', borderRadius: '50%', background: '#EBCFDE' }} />

      {/* Ellipse 19 (second): 42×42, left:217, top:101, #F4D2BC */}
      <div style={{ position: 'absolute', width: '42px', height: '42px', left: '217px', top: '101px', borderRadius: '50%', background: '#F4D2BC' }} />

      {/* Ellipse 18: 35×35, left:47, top:105, #CFEBD4 */}
      <div style={{ position: 'absolute', width: '35px', height: '35px', left: '47px', top: '105px', borderRadius: '50%', background: '#CFEBD4' }} />

      {/* Ellipse 24: 35×35, left:322, top:151, #CFEBD4 */}
      <div style={{ position: 'absolute', width: '35px', height: '35px', left: '322px', top: '151px', borderRadius: '50%', background: '#CFEBD4' }} />

      {/* Ellipse 22: 35×35, left:271, top:276, #DFCFEB */}
      <div style={{ position: 'absolute', width: '35px', height: '35px', left: '271px', top: '276px', borderRadius: '50%', background: '#DFCFEB' }} />

      {/* ── "De Lichaamsgids" title ──
          width:319, height:88, left:47, top:174, 24px bold, #377B8A */}
      <div style={{
        position: 'absolute',
        width: '319px',
        height: '88px',
        left: '47px',
        top: '174px',
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
        De Lichaamsgids
      </div>

      {/* ── Book illustration ──
          Group 1: left:14.5px, top:348px, width:385.03px */}
      <img
        src="/boek.png"
        alt="Boek illustratie"
        style={{
          position: 'absolute',
          left: '14.5px',
          top: '348px',
          width: '385px',
          height: 'auto',
        }}
      />

      {/* ── Ellipse 31: large grey background circle — voor het boek ── */}
      <div style={{
        position: 'absolute',
        width: '700px',
        height: '700px',
        left: '-143px',
        top: '465px',
        borderRadius: '50%',
        background: '#F6F6F6',
      }} />

      {/* Ellipse 26: 18×18, left:252, top:326, #EFF6F5 — voor het boek */}
      <div style={{ position: 'absolute', width: '18px', height: '18px', left: '252px', top: '326px', borderRadius: '50%', background: '#EFF6F5' }} />

      {/* Ellipse 25: 35×35, left:136, top:318, #EFF6F5 — voor het boek */}
      <div style={{ position: 'absolute', width: '35px', height: '35px', left: '136px', top: '318px', borderRadius: '50%', background: '#EFF6F5' }} />

      {/* ── Subtitle ──
          width:331, height:66, left:41, top:529, 20px, #727272 */}
      <div style={{
        position: 'absolute',
        width: '331px',
        height: '66px',
        left: '41px',
        top: '529px',
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '20px',
        lineHeight: '24px',
        color: '#727272',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        Ontdek samen met je zorgverleners je lichaam opnieuw met de Lichaamsgids
      </div>

      {/* ── "Begrepen" button ──
          width:170, height:50, left:122, top:621, radius:20px */}
      <button
        onClick={handleBegrepen}
        style={{
          position: 'absolute',
          width: '170px',
          height: '50px',
          left: '122px',
          top: '621px',
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
        Starten
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
