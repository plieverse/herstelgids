import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const DUTCH_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const CATEGORIES = [
  {
    id: 1,
    category: 'Vergelijking gisteren',
    icon: 'health_metrics',
    iconColor: '#C5A500',
    isText: false,
    options: [
      { answerBold: 'Veel beter.',   answerNormal: ' Ik voel me veel beter. Ik heb bijna geen last.', circleColor: '#B2DEB6' },
      { answerBold: 'Iets beter.',   answerNormal: ' Ik voel me iets beter. Ik heb nog wel een beetje last.', circleColor: '#CFEBD4' },
      { answerBold: 'Hetzelfde.',    answerNormal: ' Ik voel me hetzelfde als gisteren.', circleColor: '#F2EFC2' },
      { answerBold: 'Iets slechter.', answerNormal: ' Ik voel me iets slechter. Ik heb meer last.', circleColor: '#F0C8AD' },
      { answerBold: 'Veel slechter.', answerNormal: ' Ik voel me veel slechter. Ik heb heel veel last.', circleColor: '#EEC7C7' },
    ],
  },
  {
    id: 2,
    category: 'Eten',
    icon: 'nutrition',
    iconColor: '#378A6C',
    isText: false,
    options: [
      { answerBold: 'Heel goed.',   answerNormal: ' Ik heb geen problemen met eten.', circleColor: '#B2DEB6' },
      { answerBold: 'Goed.',        answerNormal: ' Ik heb af en toe last, maar het gaat nog goed.', circleColor: '#CFEBD4' },
      { answerBold: 'Middelmatig.', answerNormal: ' Ik heb duidelijk moeite met eten, maar het lukt wel.', circleColor: '#F2EFC2' },
      { answerBold: 'Moeilijk.',    answerNormal: ' Ik kan moeilijk mijn eten doorslikken.', circleColor: '#F0C8AD' },
      { answerBold: 'Heel moeilijk.', answerNormal: ' Ik kan mijn eten bijna niet doorslikken.', circleColor: '#EEC7C7' },
    ],
  },
  {
    id: 3,
    category: 'Ademen',
    icon: 'pulmonology',
    iconColor: '#CB6E02',
    isText: false,
    options: [
      { answerBold: 'Heel goed.',   answerNormal: ' Ik kan goed door ademen.', circleColor: '#B2DEB6' },
      { answerBold: 'Goed.',        answerNormal: ' Ik heb af en toe moeite met ademen. Maar het gaat nog goed.', circleColor: '#CFEBD4' },
      { answerBold: 'Middelmatig.', answerNormal: ' Ik heb duidelijk moeite met ademen. Maar het lukt wel.', circleColor: '#F2EFC2' },
      { answerBold: 'Moeilijk.',    answerNormal: ' Ik kan niet goed ademen.', circleColor: '#F0C8AD' },
      { answerBold: 'Heel moeilijk.', answerNormal: ' Ik kan bijna niet ademen.', circleColor: '#EEC7C7' },
    ],
  },
  {
    id: 4,
    category: 'Pijn',
    icon: 'bolt',
    iconColor: '#AF1E1E',
    isText: false,
    options: [
      { answerBold: 'Geen pijn.',      answerNormal: ' Ik voel helemaal geen pijn.', circleColor: '#B2DEB6' },
      { answerBold: 'Weinig pijn.',    answerNormal: ' Ik voel het, maar het gaat.', circleColor: '#CFEBD4' },
      { answerBold: 'Pijn.',           answerNormal: ' Ik voel duidelijk pijn. Maar het is nog vol te houden.', circleColor: '#F2EFC2' },
      { answerBold: 'Veel pijn.',      answerNormal: ' Ik heb veel pijn.', circleColor: '#F0C8AD' },
      { answerBold: 'Heel veel pijn.', answerNormal: ' Ik heb heel veel last van pijn.', circleColor: '#EEC7C7' },
    ],
  },
  {
    id: 5,
    category: 'Poep',
    icon: 'WC',
    iconColor: '#378A6C',
    isText: true,
    options: [
      { answerBold: 'Diarree.',     answerNormal: ' Mijn poep is heel dun of waterig.', circleColor: '#F4D2BC' },
      { answerBold: 'Wat dunner.',  answerNormal: ' Mijn poep was wat dunner dan normaal.', circleColor: '#F2EFC2' },
      { answerBold: 'Normaal.',     answerNormal: ' Mijn poep is normaal.', circleColor: '#CFEBD4' },
      { answerBold: 'Wat harder.',  answerNormal: ' Mijn poep is wat harder of vaster dan normaal.', circleColor: '#F2EFC2' },
      { answerBold: 'Verstopping.', answerNormal: ' Mijn poep is hard. Ik kan moeilijk poepen.', circleColor: '#F4D2BC' },
    ],
  },
];

export default function DiaryGisterenPage() {
  const navigate = useNavigate();

  const yesterday = new Date(Date.now() - 86400000);
  const dateString = `${yesterday.getDate()} ${DUTCH_MONTHS[yesterday.getMonth()]}`;

  // Pick random answers once per page mount
  const summaryRows = useMemo(() =>
    CATEGORIES.map((cat) => ({ ...cat, ...pick(cat.options) })),
  []);

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

      {/* ── NS Dagboektopbar ── */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0,
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
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          padding: '0px 10px', height: '40px',
        }}>
          {/* Left: circle + "Dagboek" */}
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
            }}>Dagboek</span>
          </div>

          {/* Right: edit + account_circle */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '11px' }}>
            <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#377B8A', userSelect: 'none' }}>edit</span>
            </div>
            <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* Frame 7: date navigation — BOTH arrows active */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', padding: '0px 0px 10px', height: '46px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', height: '36px' }}>

            {/* Left arrow — active but no further page in prototype */}
            <button style={{
              width: '30px', height: '30px', background: '#E6F4F2',
              border: '0.5px solid #CFEBE8', borderRadius: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'default', padding: 0,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#377B8A', userSelect: 'none' }}>chevron_left</span>
            </button>

            {/* Date label */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', color: '#377B8A', fontFamily: 'Inter', fontWeight: 400,
            }}>
              <span style={{ fontSize: '20px', lineHeight: '24px' }}>Gisteren</span>
              <span style={{ fontSize: '12px', lineHeight: '15px' }}>{dateString}</span>
            </div>

            {/* Right arrow — active, navigates back to vandaag */}
            <button
              onClick={() => navigate('/dagboek/samenvatting')}
              style={{
                width: '30px', height: '30px', background: '#E6F4F2',
                border: '0.5px solid #CFEBE8', borderRadius: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 0,
              }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#377B8A', userSelect: 'none' }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Ellipse 25: 54×54, left:31, top:144 ── */}
      <div style={{
        position: 'absolute', width: '54px', height: '54px',
        left: '31px', top: '144px', borderRadius: '50%', background: '#CFEBE8',
      }} />

      {/* ── Ellipse 26: 14×14, left:78, top:191 ── */}
      <div style={{
        position: 'absolute', width: '14px', height: '14px',
        left: '78px', top: '191px', borderRadius: '50%', background: '#CFEBE8',
      }} />

      {/* ── "Samenvatting" title: left:43, top:151 ── */}
      <div style={{
        position: 'absolute', left: '43px', top: '151px',
        width: '218px', height: '39px',
        fontFamily: 'Inter', fontWeight: 700, fontSize: '32px',
        lineHeight: '39px', color: '#377B8A',
        display: 'flex', alignItems: 'center',
      }}>
        Samenvatting
      </div>

      {/* ── Frame 46: 5 rows, left:37, top:215 ── */}
      <div style={{
        position: 'absolute', width: '346px', left: '37px', top: '215px',
        display: 'flex', flexDirection: 'column', gap: '10px',
      }}>
        {summaryRows.map((row) => (
          <div key={row.id} style={{
            position: 'relative', width: '346px', height: '77px',
            background: '#FFFFFF', borderRadius: '10px',
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            padding: '5px 0px 5px 10px', gap: '10px', boxSizing: 'border-box',
          }}>
            {/* Colored circle + icon */}
            <div style={{ position: 'relative', width: '51px', height: '51px', flexShrink: 0 }}>
              <div style={{
                position: 'absolute', width: '51px', height: '51px',
                borderRadius: '50%', background: row.circleColor,
              }} />
              <div style={{
                position: 'absolute', width: '51px', height: '51px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {row.isText ? (
                  <span style={{
                    fontFamily: 'Inter', fontWeight: 400, fontSize: '20px',
                    lineHeight: '24px', color: row.iconColor, userSelect: 'none',
                  }}>{row.icon}</span>
                ) : (
                  <span className="material-symbols-outlined" style={{
                    fontSize: '32px', color: row.iconColor, userSelect: 'none',
                  }}>{row.icon}</span>
                )}
              </div>
            </div>

            {/* Text */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', gap: '7px', width: '245px',
            }}>
              <div style={{
                fontFamily: 'Inter', fontWeight: 700, fontSize: '20px',
                lineHeight: '24px', color: '#377B8A',
              }}>
                {row.category}
              </div>
              <div style={{
                fontFamily: 'Inter', fontSize: '15px',
                lineHeight: '18px', color: '#727272',
              }}>
                <span style={{ fontWeight: 700 }}>{row.answerBold}</span>
                <span style={{ fontWeight: 400 }}>{row.answerNormal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
