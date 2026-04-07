import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/layout/BottomNav';

const TILES = [
  {
    id: 1,
    title: 'Eten',
    subtitle: 'Portie grootte, gewichtsverlies en meer...',
    icon: 'nutrition',
    circleColor: '#EBCFCF',
    iconColor: '#932323',
    tileLeft: 0, tileTop: 0,
    iconTop: 16,
    titleRows: 1,
    circle: { w: 60, h: 60, l: 50, t: 34 },
    dots: [
      { w: 9,  h: 9,  l: 72, t: 18 },
      { w: 9,  h: 9,  l: 58, t: 16 },
      { w: 9,  h: 9,  l: 55, t: 28 },
    ],
  },
  {
    id: 2,
    title: 'Drinken',
    subtitle: 'Drinkvoeding, alcohol, en meer...',
    icon: 'coffee',
    circleColor: '#CFEBD4',
    iconColor: '#378A6C',
    tileLeft: 189, tileTop: 0,
    iconTop: 10,
    titleRows: 1,
    circle: { w: 60, h: 60, l: 57, t: 29 },
    dots: [
      { w: 7,  h: 7,  l: 18, t: 12 },
      { w: 10, h: 10, l: 6,  t: 6  },
      { w: 12, h: 12, l: 6,  t: 19 },
    ],
  },
  {
    id: 3,
    title: 'Medicijnen en hulpmiddelen',
    subtitle: 'Sondevoeding, JP drain en meer...',
    icon: 'pill',
    circleColor: '#E6F4F2',
    iconColor: '#377B8A',
    tileLeft: 0, tileTop: 172,
    iconTop: 3,
    titleRows: 2,
    circle: { w: 56, h: 56, l: 56, t: 18 },
    dots: [
      { w: 9,  h: 9,  l: 127, t: 26 },
      { w: 9,  h: 9,  l: 115, t: 31 },
      { w: 12, h: 12, l: 115, t: 16 },
    ],
  },
  {
    id: 4,
    title: 'Slaap',
    subtitle: 'Houding in bed, moeilijk in slaap komen en meer...',
    icon: 'hotel',
    circleColor: '#EBE9CF',
    iconColor: '#C5A500',
    tileLeft: 189, tileTop: 172,
    iconTop: 28,
    titleRows: 1,
    circle: { w: 56, h: 56, l: 56, t: 40 },
    dots: [
      { w: 9, h: 9, l: 119, t: 45 },
      { w: 9, h: 9, l: 124, t: 57 },
      { w: 9, h: 9, l: 124, t: 70 },
    ],
  },
  {
    id: 5,
    title: 'Ervaringen andere patiënten',
    subtitle: 'Verhalen en videos over andere patiënten',
    icon: 'diversity_3',
    circleColor: '#EBCFDE',
    iconColor: '#8A3773',
    tileLeft: 0, tileTop: 344,
    iconTop: 3,
    titleRows: 2,
    circle: { w: 56, h: 56, l: 56, t: 18 },
    dots: [
      { w: 9,  h: 9,  l: 36, t: 70 },
      { w: 7,  h: 7,  l: 29, t: 77 },
      { w: 12, h: 12, l: 24, t: 63 },
    ],
  },
  {
    id: 6,
    title: 'Bewegen',
    subtitle: 'Beginnen met bewegen en meer...',
    icon: 'directions_run',
    circleColor: '#F4D2BC',
    iconColor: '#CB6E02',
    tileLeft: 189, tileTop: 344,
    iconTop: 15,
    titleRows: 1,
    circle: { w: 56, h: 56, l: 56, t: 30 },
    dots: [
      { w: 9,  h: 9,  l: 25, t: 67 },
      { w: 7,  h: 7,  l: 12, t: 60 },
      { w: 12, h: 12, l: 36, t: 52 },
    ],
  },
];

export default function GuideUitlegPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '414px',
      height: '100dvh', minHeight: '736px', margin: '0 auto',
      background: '#F6F6F6', fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>

      {/* ── Topbar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '414px', height: '110px',
        background: '#FFFFFF',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '20px',
      }}>
        {/* Title row */}
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center', padding: '0px 10px', width: '414px', height: '40px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            position: 'relative', display: 'flex', flexDirection: 'row',
            alignItems: 'center', padding: '0px 0px 0px 10px',
            isolation: 'isolate', width: '150px', height: '34px',
          }}>
            <div style={{
              position: 'absolute', width: '29px', height: '29px',
              left: '0px', top: '3px', borderRadius: '50%',
              background: '#E6F4F2', zIndex: 1,
            }} />
            <span style={{
              fontFamily: 'Inter', fontWeight: 700, fontSize: '24px',
              lineHeight: '29px', color: '#377B8A',
              position: 'relative', zIndex: 2,
            }}>Gids</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '11px' }}>
            <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#377B8A', userSelect: 'none' }}>search</span>
            </div>
            <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* Tab switcher: Problemen (inactive) | Uitleg (active) */}
        <div style={{
          width: '380px', height: '39px',
          background: '#F5F5F5', borderRadius: '20px',
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          padding: '3px 5px', boxSizing: 'border-box',
        }}>
          <div
            onClick={() => navigate('/gids')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <span style={{
              fontFamily: 'Inter', fontWeight: 400, fontSize: '20px',
              lineHeight: '24px', color: '#B3B2B2', textAlign: 'center',
            }}>Problemen</span>
          </div>
          <div style={{
            width: '189px', height: '33px',
            background: '#377B8A', borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'Inter', fontWeight: 400, fontSize: '20px',
              lineHeight: '24px', color: '#FFFFFF', textAlign: 'center',
            }}>Uitleg</span>
          </div>
        </div>
      </div>

      {/* ── Tiles grid (Frame 58) ── */}
      <div style={{
        position: 'absolute', width: '358px', height: '499px',
        left: '28px', top: '144px',
      }}>
        {TILES.map((tile) => (
          <div key={tile.id} style={{
            position: 'absolute',
            width: '169px', height: '155px',
            left: `${tile.tileLeft}px`, top: `${tile.tileTop}px`,
            background: '#FFFFFF', borderRadius: '7px',
            overflow: 'hidden',
          }}>
            {/* Main colored circle */}
            <div style={{
              position: 'absolute',
              width: `${tile.circle.w}px`, height: `${tile.circle.h}px`,
              left: `${tile.circle.l}px`, top: `${tile.circle.t}px`,
              borderRadius: '50%', background: tile.circleColor,
            }} />

            {/* Decorative dots */}
            {tile.dots.map((dot, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: `${dot.w}px`, height: `${dot.h}px`,
                left: `${dot.l}px`, top: `${dot.t}px`,
                borderRadius: '50%', background: tile.circleColor,
              }} />
            ))}

            {/* Icon zone: left:42, top:iconTop, 85×85 */}
            <div style={{
              position: 'absolute', left: '42px', top: `${tile.iconTop}px`,
              width: '85px', height: '85px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '85px', lineHeight: '1', display: 'block',
                color: tile.iconColor, userSelect: 'none',
              }}>{tile.icon}</span>
            </div>

            {/* Title + subtitle */}
            <div style={{
              position: 'absolute', left: '0px',
              top: tile.titleRows === 2 ? '86px' : '104px',
              width: '169px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '0 5px', boxSizing: 'border-box',
            }}>
              <div style={{
                fontFamily: 'Inter', fontWeight: 700, fontSize: '15px',
                lineHeight: '18px', color: '#1C1B1F', textAlign: 'center',
                width: '160px',
              }}>{tile.title}</div>
              <div style={{
                fontFamily: 'Inter', fontWeight: 400, fontSize: '13px',
                lineHeight: '16px', color: '#B3B2B2', textAlign: 'center',
                width: '160px', marginTop: '2px',
              }}>{tile.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom Nav ── */}
      <BottomNav />
    </div>
  );
}
