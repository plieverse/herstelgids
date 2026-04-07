import { useNavigate } from 'react-router-dom';

export default function OnboardingWelcome() {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative',
      width: '414px',
      height: '736px',
      maxWidth: '100%',
      margin: '0 auto',
      background: '#FFFFFF',
      overflow: 'hidden',
    }}>

      {/* Ellipse 20 – 129×129, left:78, top:122, #EFF6F5 */}
      <div style={{ position: 'absolute', width: 129, height: 129, left: 78, top: 122, borderRadius: '50%', background: '#EFF6F5' }} />
      {/* Ellipse 21 – 71×71, left:181, top:251, #EBE9CF */}
      <div style={{ position: 'absolute', width: 71, height: 71, left: 181, top: 251, borderRadius: '50%', background: '#EBE9CF' }} />
      {/* Ellipse 23 – 51×51, left:43, top:235, #F4D2BC */}
      <div style={{ position: 'absolute', width: 51, height: 51, left: 43, top: 235, borderRadius: '50%', background: '#F4D2BC' }} />
      {/* Ellipse 19a – 77×77, left:238, top:159, #EBCFDE */}
      <div style={{ position: 'absolute', width: 77, height: 77, left: 238, top: 159, borderRadius: '50%', background: '#EBCFDE' }} />
      {/* Ellipse 19b – 42×42, left:217, top:101, #F4D2BC */}
      <div style={{ position: 'absolute', width: 42, height: 42, left: 217, top: 101, borderRadius: '50%', background: '#F4D2BC' }} />
      {/* Ellipse 18 – 35×35, left:47, top:105, #CFEBD4 */}
      <div style={{ position: 'absolute', width: 35, height: 35, left: 47, top: 105, borderRadius: '50%', background: '#CFEBD4' }} />
      {/* Ellipse 24 – 35×35, left:322, top:151, #CFEBD4 */}
      <div style={{ position: 'absolute', width: 35, height: 35, left: 322, top: 151, borderRadius: '50%', background: '#CFEBD4' }} />
      {/* Ellipse 22 – 35×35, left:271, top:276, #DFCFEB */}
      <div style={{ position: 'absolute', width: 35, height: 35, left: 271, top: 276, borderRadius: '50%', background: '#DFCFEB' }} />
      {/* Ellipse 26 – 18×18, left:252, top:326, #EFF6F5 */}
      <div style={{ position: 'absolute', width: 18, height: 18, left: 252, top: 326, borderRadius: '50%', background: '#EFF6F5' }} />

      {/* De Lichaamsgids – left:47, top:174, width:319, height:88 */}
      <div style={{
        position: 'absolute',
        width: 319,
        height: 88,
        left: 47,
        top: 174,
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
        De Lichaamsgids
      </div>

      {/* Book illustration – left:14.5, top:348, width:385 */}
      <img
        src="/boek.png"
        alt="Boek illustratie"
        style={{
          position: 'absolute',
          left: 14.5,
          top: 348,
          width: 385,
          height: 'auto',
        }}
      />

      {/* Ellipse 31 – 700×700, left:-143, top:465, #F6F6F6 (voor het boek) */}
      <div style={{
        position: 'absolute',
        width: 700,
        height: 700,
        left: -143,
        top: 465,
        borderRadius: '50%',
        background: '#F6F6F6',
      }} />

      {/* Ellipse 25 – 35×35, left:136, top:318, #EFF6F5 (voor het boek) */}
      <div style={{ position: 'absolute', width: 35, height: 35, left: 136, top: 318, borderRadius: '50%', background: '#EFF6F5' }} />

      {/* Ellipse 26 duplicate rendered after book to stay on top */}
      <div style={{ position: 'absolute', width: 18, height: 18, left: 252, top: 326, borderRadius: '50%', background: '#EFF6F5' }} />

      {/* Subtitle – left:41, top:529, width:331, height:66 */}
      <div style={{
        position: 'absolute',
        width: 331,
        height: 66,
        left: 41,
        top: 529,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 20,
        lineHeight: '24px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        color: '#727272',
      }}>
        Ontdek samen met je zorgverleners je lichaam opnieuw met de Lichaamsgids
      </div>

      {/* Button – left:122, top:621, width:170, height:50 */}
      <button
        onClick={() => navigate('/onboarding/privacy')}
        style={{
          position: 'absolute',
          width: 170,
          height: 50,
          left: 122,
          top: 621,
          background: '#377B8A',
          borderRadius: 20,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 24,
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
