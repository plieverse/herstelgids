import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../../components/layout/BottomNav';

const UITLEG_CATEGORY_DATA = {
  1: {
    pageTitle: 'Eten',
    description: 'Hieronder staat meer informatie over het onderwerp eten.',
    icon: 'nutrition',
    tileCircleColor: '#EBCFCF',
    iconColor: '#AF1E1E',
    bgColor: '#EBCFCF',
    decorColor: '#E4BFBF',
    decorCircles: [
      { w: 118, h: 118, l: 246, t: 135 },
      { w: 15,  h: 15,  l: 263, t: 104 },
      { w: 15,  h: 15,  l: 259, t: 125 },
      { w: 15,  h: 15,  l: 290, t: 105 },
    ],
    iconLeft: 223, iconTop: 93,
    tilesLeft: 17, tilesWidth: 372,
    problems: [
      { label: 'Portiegrootte', icon: 'flatware' },
      { label: 'Gewicht',       icon: 'balance' },
      { label: 'Eiwitten',      icon: 'egg' },
      { label: 'Koolhydraten',  icon: 'bakery_dining' },
    ],
  },
  2: {
    pageTitle: 'Drinken',
    description: 'Hieronder staat meer informatie over het onderwerp drinken.',
    icon: 'coffee',
    tileCircleColor: '#CFEBD4',
    iconColor: '#378A6C',
    bgColor: '#CFEBD4',
    decorColor: '#B2DBBA',
    decorCircles: [
      { w: 118, h: 118, l: 246, t: 135 },
      { w: 15,  h: 15,  l: 213, t: 210 },
      { w: 15,  h: 15,  l: 231, t: 215 },
      { w: 15,  h: 15,  l: 223, t: 194 },
    ],
    iconLeft: 238, iconTop: 98,
    tilesLeft: 17, tilesWidth: 372,
    problems: [
      { label: 'Porties',      icon: 'gastroenterology' },
      { label: 'Drinkvoeding', icon: 'coffee' },
      { label: 'Alcohol',      icon: 'wine_bar' },
    ],
  },
  3: {
    pageTitle: 'Medicijnen en hulpmiddelen',
    description: 'Hieronder staat meer informatie over medicijnen en hulpmiddelen.',
    icon: 'pill',
    tileCircleColor: '#E6F4F2',
    iconColor: '#377B8A',
    bgColor: '#E6F4F2',
    decorColor: '#D0E9E5',
    decorCircles: [
      { w: 110, h: 110, l: 247, t: 134 },
      { w: 29,  h: 29,  l: 207, t: 125 },
      { w: 19,  h: 19,  l: 191, t: 154 },
      { w: 15,  h: 15,  l: 214, t: 158 },
    ],
    iconLeft: 238, iconTop: 92,
    tilesLeft: 20, tilesWidth: 367,
    problems: [
      { label: 'Medicijnen',   icon: 'pill' },
      { label: 'Maagzuur',     icon: 'gastroenterology' },
      { label: 'Pijnstillers', icon: 'pill' },
      { label: 'Sondevoeding', icon: 'syringe' },
      { label: 'JP drain',     icon: 'syringe' },
    ],
  },
  4: {
    pageTitle: 'Slaap',
    description: 'Hieronder staat meer informatie over het onderwerp slaap.',
    icon: 'hotel',
    tileCircleColor: '#EBE9CF',
    iconColor: '#C5A500',
    bgColor: '#EBE9CF',
    decorColor: '#E3E0BC',
    decorCircles: [
      { w: 118, h: 118, l: 246, t: 135 },
      { w: 15,  h: 15,  l: 383, t: 134 },
      { w: 15,  h: 15,  l: 363, t: 124 },
      { w: 15,  h: 15,  l: 388, t: 158 },
    ],
    iconLeft: 223, iconTop: 93,
    tilesLeft: 17, tilesWidth: 372,
    problems: [
      { label: 'Slaaphouding',        icon: 'hotel' },
      { label: 'Maagzuur \'s nachts', icon: 'gastroenterology' },
      { label: 'Eten voor het slapen', icon: 'flatware' },
      { label: 'Vermoeidheid',         icon: 'hotel' },
    ],
  },
  5: {
    pageTitle: 'Ervaringen andere patiënten',
    description: 'Hieronder staan verhalen en videos van andere patiënten.',
    icon: 'diversity_3',
    tileCircleColor: '#EBCFDE',
    iconColor: '#8A3773',
    bgColor: '#EBCFDE',
    decorColor: '#E5BCD2',
    decorCircles: [
      { w: 118, h: 118, l: 246, t: 135 },
      { w: 15,  h: 15,  l: 263, t: 104 },
      { w: 15,  h: 15,  l: 259, t: 125 },
      { w: 15,  h: 15,  l: 290, t: 105 },
    ],
    iconLeft: 223, iconTop: 93,
    tilesLeft: 17, tilesWidth: 372,
    problems: [
      { label: 'Verhalen van patiënten', icon: 'diversity_3' },
      { label: 'Videos',                 icon: 'play_circle' },
    ],
  },
  6: {
    pageTitle: 'Bewegen',
    description: 'Hieronder staat meer informatie over het onderwerp bewegen.',
    icon: 'directions_run',
    tileCircleColor: '#F4D2BC',
    iconColor: '#CB6E02',
    bgColor: '#F4D2BC',
    decorColor: '#F0C8AD',
    decorCircles: [
      { w: 118, h: 118, l: 246, t: 135 },
      { w: 15,  h: 15,  l: 263, t: 104 },
      { w: 15,  h: 15,  l: 259, t: 125 },
      { w: 15,  h: 15,  l: 290, t: 105 },
    ],
    iconLeft: 223, iconTop: 93,
    tilesLeft: 17, tilesWidth: 372,
    problems: [
      { label: 'Beginnen met bewegen', icon: 'directions_run' },
      { label: 'Oefeningen',           icon: 'fitness_center' },
    ],
  },
};

export default function UitlegCategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const cat = UITLEG_CATEGORY_DATA[id] || UITLEG_CATEGORY_DATA[1];

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '414px',
      height: '100dvh', minHeight: '736px', margin: '0 auto',
      background: cat.bgColor, fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>

      {/* ── Topbar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '414px', height: '110px',
        background: '#FFFFFF', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '20px',
      }}>
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
              lineHeight: '29px', color: '#377B8A', position: 'relative', zIndex: 2,
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

        {/* Tab switcher: Uitleg active */}
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
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: '#B3B2B2', textAlign: 'center' }}>Problemen</span>
          </div>
          <div style={{
            width: '189px', height: '33px',
            background: '#377B8A', borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: '#FFFFFF', textAlign: 'center' }}>Uitleg</span>
          </div>
        </div>
      </div>

      {/* ── Back button ── */}
      <div
        onClick={() => navigate('/gids/uitleg')}
        style={{
          position: 'absolute', left: '0px', top: '112px',
          width: '46px', height: '46px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10,
        }}
      >
        <div style={{
          width: '26px', height: '26px', borderRadius: '50%',
          background: '#377B8A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#E6F4F2', userSelect: 'none' }}>chevron_left</span>
        </div>
      </div>

      {/* ── Decorative circles ── */}
      {cat.decorCircles.map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${c.w}px`, height: `${c.h}px`,
          left: `${c.l}px`, top: `${c.t}px`,
          borderRadius: '50%', background: cat.decorColor,
        }} />
      ))}

      {/* ── Large category icon ── */}
      <div style={{
        position: 'absolute', left: `${cat.iconLeft}px`, top: `${cat.iconTop}px`,
        width: '182px', height: '182px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'visible',
      }}>
        <span className="material-symbols-outlined" style={{
          fontSize: '160px', lineHeight: '1', display: 'block',
          color: cat.iconColor, userSelect: 'none',
        }}>{cat.icon}</span>
      </div>

      {/* ── White content card ── */}
      <div style={{
        position: 'absolute', left: '0px', top: '257px',
        width: '414px', bottom: '0px',
        background: '#F6F6F6', borderRadius: '20px 20px 0px 0px',
      }} />

      {/* ── Card title ── */}
      <div style={{
        position: 'absolute', left: '22px', top: '281px', right: '45px',
        fontFamily: 'Inter', fontWeight: 700, fontSize: '20px',
        lineHeight: '24px', color: cat.iconColor,
      }}>{cat.pageTitle}</div>

      {/* ── Card description ── */}
      <div style={{
        position: 'absolute', left: '22px', top: '310px', right: '45px',
        fontFamily: 'Inter', fontWeight: 400, fontSize: '13px',
        lineHeight: '16px', color: '#727272',
      }}>{cat.description}</div>

      {/* ── Problem tiles ── */}
      <div style={{
        position: 'absolute',
        left: `${cat.tilesLeft}px`, top: '360px',
        width: `${cat.tilesWidth}px`,
        display: 'flex', flexDirection: 'column', gap: '15px',
      }}>
        {cat.problems.map((problem, i) => (
          <div key={i} onClick={() => navigate(`/gids/uitleg/${id}/${i}`)} style={{
            position: 'relative',
            width: `${cat.tilesWidth}px`, height: '58px',
            background: '#FFFFFF', borderRadius: '20px', cursor: 'pointer',
          }}>
            {/* Circle behind icon */}
            <div style={{
              position: 'absolute', width: '29px', height: '29px',
              left: '15px', top: '15px',
              borderRadius: '50%', background: cat.tileCircleColor,
            }} />
            {/* Icon */}
            <div style={{
              position: 'absolute', left: '13px', top: '11px',
              width: '35px', height: '35px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '28px', lineHeight: '1', display: 'block',
                color: cat.iconColor, userSelect: 'none',
              }}>{problem.icon}</span>
            </div>
            {/* Label */}
            <div style={{
              position: 'absolute', left: '61px', top: '0px',
              width: `${cat.tilesWidth - 61 - 46}px`, height: '58px',
              display: 'flex', alignItems: 'center',
              fontFamily: 'Inter', fontWeight: 700, fontSize: '16px',
              lineHeight: '19px', color: cat.iconColor,
            }}>{problem.label}</div>
            {/* Chevron right */}
            <div style={{
              position: 'absolute', left: `${cat.tilesWidth - 46}px`, top: '16px',
              width: '25px', height: '25px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '22px', color: '#B3B2B2', userSelect: 'none',
              }}>chevron_right</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom Nav ── */}
      <BottomNav />
    </div>
  );
}
