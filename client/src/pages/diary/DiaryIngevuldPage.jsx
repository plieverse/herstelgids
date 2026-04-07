import { useNavigate } from 'react-router-dom';

const DUTCH_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

const SUMMARY_ROWS = [
  {
    id: 1,
    category: 'Vergelijking gisteren',
    answerBold: 'Hetzelfde.',
    answerNormal: ' Ik voel me hetzelfde als gisteren.',
    circleColor: '#EBE9CF',
    iconColor: '#C5A500',
    icon: 'health_metrics',
    isText: false,
  },
  {
    id: 2,
    category: 'Eten',
    answerBold: 'Goed.',
    answerNormal: ' Ik heb af en toe last, maar het gaat.',
    circleColor: '#CFEBD4',
    iconColor: '#378A6C',
    icon: 'nutrition',
    isText: false,
  },
  {
    id: 3,
    category: 'Ademen',
    answerBold: 'Moeilijk.',
    answerNormal: ' Ik kan niet goed ademen.',
    circleColor: '#F4D2BC',
    iconColor: '#CB6E02',
    icon: 'pulmonology',
    isText: false,
  },
  {
    id: 4,
    category: 'Pijn',
    answerBold: 'Heel veel pijn.',
    answerNormal: ' Ik heb heel veel last van pijn.',
    circleColor: '#EBCFCF',
    iconColor: '#AF1E1E',
    icon: 'bolt',
    isText: false,
  },
  {
    id: 5,
    category: 'Poep',
    answerBold: 'Normaal.',
    answerNormal: ' Mijn poep was normaal.',
    circleColor: '#CFEBD4',
    iconColor: '#378A6C',
    icon: 'WC',
    isText: true,
  },
];

export default function DiaryIngevuldPage() {
  const navigate = useNavigate();

  const now = new Date();
  const dateString = `${now.getDate()} ${DUTCH_MONTHS[now.getMonth()]}`;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '414px',
      height: '100dvh',
      minHeight: '736px',
      margin: '0 auto',
      background: '#F6F6F6',
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden',
    }}>

      {/* ── NS Dagboektopbar: white bar 414×105px ── */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '414px',
        height: '105px',
        background: '#FFFFFF',
        borderBottom: '2px solid #377B8A',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}>

        {/* Frame 42: title row */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px 10px',
          height: '40px',
        }}>
          {/* Left: circle + "Dagboek" */}
          <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px 0px 0px 10px',
            isolation: 'isolate',
            width: '150px',
            height: '34px',
          }}>
            <div style={{
              position: 'absolute',
              width: '29px',
              height: '29px',
              left: '0px',
              top: '3px',
              borderRadius: '50%',
              background: '#E6F4F2',
              zIndex: 1,
            }} />
            <span style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '29px',
              color: '#377B8A',
              position: 'relative',
              zIndex: 2,
            }}>Dagboek</span>
          </div>

          {/* Right: edit + account_circle */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '11px',
          }}>
            <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#377B8A', userSelect: 'none' }}>edit</span>
            </div>
            <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* Frame 7: date navigation */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px 0px 10px',
          height: '46px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', height: '36px' }}>
            <button
              onClick={() => navigate('/dagboek/gisteren')}
              style={{
              width: '30px', height: '30px', background: '#E6F4F2',
              border: '0.5px solid #CFEBE8', borderRadius: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', padding: 0,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#377B8A', userSelect: 'none' }}>chevron_left</span>
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#377B8A', fontFamily: 'Inter', fontWeight: 400 }}>
              <span style={{ fontSize: '20px', lineHeight: '24px' }}>Vandaag</span>
              <span style={{ fontSize: '12px', lineHeight: '15px' }}>{dateString}</span>
            </div>

            <button style={{
              width: '30px', height: '30px', background: '#E6F4F2',
              border: '0.5px solid #CFEBE8', borderRadius: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'default', padding: 0,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#CFEBE8', userSelect: 'none' }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Ellipse 25: teal circle behind title, 54×54, left:25, top:136 ── */}
      <div style={{
        position: 'absolute',
        width: '54px',
        height: '54px',
        left: '25px',
        top: '136px',
        borderRadius: '50%',
        background: '#CFEBE8',
      }} />

      {/* ── Ellipse 26: small teal circle, 14×14, left:72, top:183 ── */}
      <div style={{
        position: 'absolute',
        width: '14px',
        height: '14px',
        left: '72px',
        top: '183px',
        borderRadius: '50%',
        background: '#CFEBE8',
      }} />

      {/* ── "Samenvatting" title: left:37, top:144 ── */}
      <div style={{
        position: 'absolute',
        left: '37px',
        top: '144px',
        width: '218px',
        height: '39px',
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: '32px',
        lineHeight: '39px',
        color: '#377B8A',
        display: 'flex',
        alignItems: 'center',
      }}>
        Samenvatting
      </div>

      {/* ── Frame 46: 5 summary rows, width:346, left:25, top:221 ── */}
      <div style={{
        position: 'absolute',
        width: '346px',
        left: '25px',
        top: '221px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {SUMMARY_ROWS.map((row) => (
          <div
            key={row.id}
            style={{
              position: 'relative',
              width: '346px',
              height: '77px',
              background: '#FFFFFF',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5px 0px 5px 10px',
              gap: '10px',
              boxSizing: 'border-box',
            }}
          >
            {/* Colored circle: 51×51, absolute, left:9, top:13 */}
            <div style={{
              position: 'relative',
              width: '51px',
              height: '51px',
              flexShrink: 0,
            }}>
              <div style={{
                position: 'absolute',
                width: '51px',
                height: '51px',
                borderRadius: '50%',
                background: row.circleColor,
              }} />
              {/* Icon centered on circle */}
              <div style={{
                position: 'absolute',
                width: '51px',
                height: '51px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {row.isText ? (
                  <span style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: row.iconColor,
                    userSelect: 'none',
                  }}>{row.icon}</span>
                ) : (
                  <span className="material-symbols-outlined" style={{
                    fontSize: '32px',
                    color: row.iconColor,
                    userSelect: 'none',
                  }}>{row.icon}</span>
                )}
              </div>
            </div>

            {/* Text: category + answer */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '7px',
              width: '245px',
            }}>
              <div style={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '24px',
                color: '#377B8A',
              }}>
                {row.category}
              </div>
              <div style={{
                fontFamily: 'Inter',
                fontSize: '15px',
                lineHeight: '18px',
                color: '#727272',
              }}>
                <span style={{ fontWeight: 700 }}>{row.answerBold}</span>
                <span style={{ fontWeight: 400 }}>{row.answerNormal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── BottomNav spacer (filled by BottomNav component) ── */}
    </div>
  );
}
