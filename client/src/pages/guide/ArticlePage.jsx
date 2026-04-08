import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../../components/layout/BottomNav';

const CATEGORY_DATA = {
  1: {
    pageTitle: 'Problemen voor het eten',
    description: 'Hieronder staan problemen die kunnen voorkomen voordat je gaat eten.',
    icon: 'gastroenterology',
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
      { label: 'Vol gevoel',  icon: 'gastroenterology' },
      { label: 'Geen honger', icon: 'gastroenterology' },
    ],
  },
  2: {
    pageTitle: 'Problemen tijdens het eten',
    description: 'Hieronder staan problemen die kunnen voorkomen tijdens het eten.',
    icon: 'flatware',
    tileCircleColor: '#F4D2BC',
    iconColor: '#CB6E02',
    bgColor: '#F4D2BC',
    decorColor: '#F0C8AD',
    decorCircles: [
      { w: 110, h: 110, l: 271, t: 175 },
      { w: 29,  h: 29,  l: 242, t: 188 },
      { w: 19,  h: 19,  l: 229, t: 220 },
      { w: 15,  h: 15,  l: 252, t: 220 },
    ],
    iconLeft: 236, iconTop: 105,
    tilesLeft: 15, tilesWidth: 372,
    problems: [
      { label: 'Moeite met slikken',           icon: 'ent' },
      { label: 'Gevoel dat het eten niet zakt', icon: 'gastroenterology' },
      { label: 'Boeren',                        icon: 'voice_selection' },
      { label: 'Veel slijm',                    icon: 'water_drops' },
    ],
  },
  3: {
    pageTitle: 'Problemen kort na het eten',
    description: 'Hieronder staan problemen die kunnen voorkomen kort na het eten.',
    icon: 'clock_loader_10',
    tileCircleColor: '#DFCFEB',
    iconColor: '#4A378A',
    bgColor: '#DFCFEB',
    decorColor: '#D8BFEA',
    decorCircles: [
      { w: 118, h: 118, l: 246, t: 135 },
      { w: 15,  h: 15,  l: 223, t: 178 },
      { w: 15,  h: 15,  l: 231, t: 153 },
      { w: 15,  h: 15,  l: 246, t: 133 },
    ],
    iconLeft: 238, iconTop: 98,
    tilesLeft: 17, tilesWidth: 372,
    problems: [
      { label: 'Gevoel dat het eten terugkomt', icon: 'gastroenterology' },
      { label: 'Dumping (vroeg)',               icon: 'sentiment_stressed' },
      { label: 'Buikkrampen',                   icon: 'bolt' },
      { label: 'Diarree',                       icon: 'WC' },
    ],
  },
  4: {
    pageTitle: 'Problemen lang na het eten',
    description: 'Hieronder staan problemen die kunnen voorkomen lang na het eten.',
    icon: 'clock_loader_60',
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
      { label: 'Misselijkheid', icon: 'gastroenterology' },
      { label: 'Dumping (laat)', icon: 'sentiment_stressed' },
      { label: 'Winderigheid',   icon: 'air' },
      { label: 'Diarree',        icon: 'WC' },
    ],
  },
  5: {
    pageTitle: 'Langdurige problemen',
    description: 'Hieronder staan problemen die langdurig kunnen voorkomen.',
    icon: 'all_inclusive',
    tileCircleColor: '#EBCFDE',
    iconColor: '#8A3773',
    bgColor: '#EBCFDE',
    decorColor: '#E5BCD2',
    decorCircles: [
      { w: 108, h: 108, l: 256, t: 136 },
      { w: 23,  h: 23,  l: 231, t: 155 },
      { w: 15,  h: 15,  l: 251, t: 143 },
      { w: 23,  h: 23,  l: 370, t: 155 },
      { w: 15,  h: 15,  l: 356, t: 143 },
    ],
    iconLeft: 225, iconTop: 102,
    tilesLeft: 17, tilesWidth: 372,
    problems: [
      { label: 'Moeheid',         icon: 'hotel' },
      { label: 'Hoesten',         icon: 'voice_selection' },
      { label: 'Gewichtsverlies', icon: 'balance' },
      { label: 'Slijm',           icon: 'water_drops' },
    ],
  },
};

export default function ArticlePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const cat = CATEGORY_DATA[id] || CATEGORY_DATA[1];

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '414px',
      height: '100dvh', minHeight: '736px', margin: '0 auto',
      background: cat.bgColor, fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>

      {/* ── Topbar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '414px', height: '110px',
        background: '#FFFFFF',
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

        {/* Tab switcher: Problemen active */}
        <div style={{
          width: '380px', height: '39px',
          background: '#F5F5F5', borderRadius: '20px',
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          padding: '3px 5px', boxSizing: 'border-box',
        }}>
          <div style={{
            width: '189px', height: '33px',
            background: '#377B8A', borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: '#FFFFFF', textAlign: 'center' }}>Problemen</span>
          </div>
          <div
            onClick={() => navigate('/gids/uitleg')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: '#B3B2B2', textAlign: 'center' }}>Uitleg</span>
          </div>
        </div>
      </div>

      {/* ── Back button: 46×46 at left:0, top:112 ── */}
      <div
        onClick={() => navigate('/gids')}
        style={{
          position: 'absolute', left: '0px', top: '112px',
          width: '46px', height: '46px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
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

      {/* ── Decorative circles (per category) ── */}
      {cat.decorCircles.map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${c.w}px`, height: `${c.h}px`,
          left: `${c.l}px`, top: `${c.t}px`,
          borderRadius: '50%', background: cat.decorColor,
        }} />
      ))}

      {/* ── Large category icon (illustration) ── */}
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

      {/* ── White content card (fills to bottom nav) ── */}
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
          <div key={i} onClick={() => navigate(`/gids/${id}/${i}`)} style={{
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
            {/* Icon: 35×35 at left:13, top:11 */}
            <div style={{
              position: 'absolute', left: '13px', top: '11px',
              width: '35px', height: '35px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {problem.icon === 'WC' ? (
                <span style={{
                  fontFamily: 'Inter', fontWeight: 400, fontSize: '20px',
                  lineHeight: '24px', color: cat.iconColor, userSelect: 'none',
                }}>WC</span>
              ) : (
                <span className="material-symbols-outlined" style={{
                  fontSize: '28px', lineHeight: '1', display: 'block',
                  color: cat.iconColor, userSelect: 'none',
                }}>{problem.icon}</span>
              )}
            </div>
            {/* Problem label */}
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
