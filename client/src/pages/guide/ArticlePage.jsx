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
    problems: ['Vol gevoel', 'Geen honger'],
  },
  2: {
    pageTitle: 'Problemen tijdens het eten',
    description: 'Hieronder staan problemen die kunnen voorkomen tijdens het eten.',
    icon: 'flatware',
    tileCircleColor: '#F4D2BC',
    iconColor: '#CB6E02',
    bgColor: '#FEF3EB',
    decorColor: '#F4D2BC',
    problems: ['Moeite met slikken', 'Veel boeren', 'Veel slijm'],
  },
  3: {
    pageTitle: 'Problemen kort na het eten',
    description: 'Hieronder staan problemen die kunnen voorkomen kort na het eten.',
    icon: 'clock_loader_10',
    tileCircleColor: '#DFCFEB',
    iconColor: '#4A378A',
    bgColor: '#F0EAFA',
    decorColor: '#DFCFEB',
    problems: ['Buikkrampen', 'Diarree', 'Dumping'],
  },
  4: {
    pageTitle: 'Problemen lang na het eten',
    description: 'Hieronder staan problemen die kunnen voorkomen lang na het eten.',
    icon: 'clock_loader_60',
    tileCircleColor: '#CFEBD4',
    iconColor: '#378A6C',
    bgColor: '#EEF8F1',
    decorColor: '#CFEBD4',
    problems: ['Dumping', 'Winderigheid'],
  },
  5: {
    pageTitle: 'Langdurige problemen',
    description: 'Hieronder staan problemen die langdurig kunnen voorkomen.',
    icon: 'all_inclusive',
    tileCircleColor: '#EBCFDE',
    iconColor: '#8A3773',
    bgColor: '#FAF0F6',
    decorColor: '#EBCFDE',
    problems: ['Pijn', 'Gewichtsverlies', 'Hoesten'],
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
            <span style={{
              fontFamily: 'Inter', fontWeight: 400, fontSize: '20px',
              lineHeight: '24px', color: '#FFFFFF', textAlign: 'center',
            }}>Problemen</span>
          </div>
          <div
            onClick={() => navigate('/gids/uitleg')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <span style={{
              fontFamily: 'Inter', fontWeight: 400, fontSize: '20px',
              lineHeight: '24px', color: '#B3B2B2', textAlign: 'center',
            }}>Uitleg</span>
          </div>
        </div>
      </div>

      {/* ── Back button: 46×46, left:0, top:112 ── */}
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
          <span className="material-symbols-outlined" style={{
            fontSize: '20px', color: '#E6F4F2', userSelect: 'none',
          }}>chevron_left</span>
        </div>
      </div>

      {/* ── Decorative circles ── */}
      <div style={{ position: 'absolute', width: '110px', height: '110px', left: '247px', top: '134px', borderRadius: '50%', background: cat.decorColor }} />
      <div style={{ position: 'absolute', width: '29px',  height: '29px',  left: '207px', top: '125px', borderRadius: '50%', background: cat.decorColor }} />
      <div style={{ position: 'absolute', width: '19px',  height: '19px',  left: '191px', top: '154px', borderRadius: '50%', background: cat.decorColor }} />
      <div style={{ position: 'absolute', width: '15px',  height: '15px',  left: '214px', top: '158px', borderRadius: '50%', background: cat.decorColor }} />

      {/* ── Large category icon (illustration) ── */}
      <div style={{
        position: 'absolute', left: '238px', top: '92px',
        width: '182px', height: '182px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'visible',
      }}>
        <span className="material-symbols-outlined" style={{
          fontSize: '160px', lineHeight: '1', display: 'block',
          color: cat.iconColor, userSelect: 'none',
        }}>{cat.icon}</span>
      </div>

      {/* ── White content card (top:257, rounded top corners, fills to bottom nav) ── */}
      <div style={{
        position: 'absolute', left: '0px', top: '257px',
        width: '414px', bottom: '0px',
        background: '#F6F6F6', borderRadius: '20px 20px 0px 0px',
      }} />

      {/* ── Card title ── */}
      <div style={{
        position: 'absolute', left: '22px', top: '281px',
        right: '45px',
        fontFamily: 'Inter', fontWeight: 700, fontSize: '20px',
        lineHeight: '24px', color: '#377B8A',
      }}>{cat.pageTitle}</div>

      {/* ── Card description ── */}
      <div style={{
        position: 'absolute', left: '22px', top: '310px',
        right: '45px',
        fontFamily: 'Inter', fontWeight: 400, fontSize: '13px',
        lineHeight: '16px', color: '#727272',
      }}>{cat.description}</div>

      {/* ── Problem tiles (Frame 56): top:360, left:20 ── */}
      <div style={{
        position: 'absolute', left: '20px', top: '360px',
        width: '367px',
        display: 'flex', flexDirection: 'column', gap: '15px',
      }}>
        {cat.problems.map((problem, i) => (
          <div key={i} onClick={() => navigate(`/gids/${id}/${i}`)} style={{
            position: 'relative', width: '367px', height: '58px',
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
              <span className="material-symbols-outlined" style={{
                fontSize: '28px', lineHeight: '1', display: 'block',
                color: cat.iconColor, userSelect: 'none',
              }}>{cat.icon}</span>
            </div>
            {/* Problem label: left:61px, vertically centered */}
            <div style={{
              position: 'absolute', left: '61px', top: '0px',
              width: '242px', height: '58px',
              display: 'flex', alignItems: 'center',
              fontFamily: 'Inter', fontWeight: 700, fontSize: '16px',
              lineHeight: '19px', color: '#377B8A',
            }}>{problem}</div>
            {/* Chevron right: left:321, top:16 */}
            <div style={{
              position: 'absolute', left: '321px', top: '16px',
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
