import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DUTCH_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

// Deterministic pick: same daysAgo + offset always gives same answer
const seededPick = (arr, daysAgo, offset) =>
  arr[Math.abs((daysAgo * 31 + offset * 17) % arr.length)];

// Icon color = darker shade matching the circle color
const ICON_COLOR = {
  '#B2DEB6': '#2E7D4F',
  '#CFEBD4': '#378A6C',
  '#F2EFC2': '#C5A500',
  '#F0C8AD': '#CB6E02',
  '#EEC7C7': '#AF1E1E',
  '#F4D2BC': '#CB6E02',
};

const CATEGORIES = [
  {
    id: 1, category: 'Vergelijking gisteren', icon: 'health_metrics', isText: false,
    options: [
      { answerBold: 'Veel beter.',    answerNormal: ' Ik voel me veel beter. Ik heb bijna geen last.',         circleColor: '#B2DEB6' },
      { answerBold: 'Iets beter.',    answerNormal: ' Ik voel me iets beter. Ik heb nog wel een beetje last.', circleColor: '#CFEBD4' },
      { answerBold: 'Hetzelfde.',     answerNormal: ' Ik voel me hetzelfde als gisteren.',                     circleColor: '#F2EFC2' },
      { answerBold: 'Iets slechter.', answerNormal: ' Ik voel me iets slechter. Ik heb meer last.',            circleColor: '#F0C8AD' },
      { answerBold: 'Veel slechter.', answerNormal: ' Ik voel me veel slechter. Ik heb heel veel last.',       circleColor: '#EEC7C7' },
    ],
  },
  {
    id: 2, category: 'Eten', icon: 'nutrition', isText: false,
    options: [
      { answerBold: 'Heel goed.',     answerNormal: ' Ik heb geen problemen met eten.',                        circleColor: '#B2DEB6' },
      { answerBold: 'Goed.',          answerNormal: ' Ik heb af en toe last, maar het gaat nog goed.',         circleColor: '#CFEBD4' },
      { answerBold: 'Middelmatig.',   answerNormal: ' Ik heb duidelijk moeite met eten, maar het lukt wel.',   circleColor: '#F2EFC2' },
      { answerBold: 'Moeilijk.',      answerNormal: ' Ik kan moeilijk mijn eten doorslikken.',                 circleColor: '#F0C8AD' },
      { answerBold: 'Heel moeilijk.', answerNormal: ' Ik kan mijn eten bijna niet doorslikken.',               circleColor: '#EEC7C7' },
    ],
  },
  {
    id: 3, category: 'Ademen', icon: 'pulmonology', isText: false,
    options: [
      { answerBold: 'Heel goed.',     answerNormal: ' Ik kan goed door ademen.',                               circleColor: '#B2DEB6' },
      { answerBold: 'Goed.',          answerNormal: ' Ik heb af en toe moeite met ademen. Maar het gaat nog goed.', circleColor: '#CFEBD4' },
      { answerBold: 'Middelmatig.',   answerNormal: ' Ik heb duidelijk moeite met ademen. Maar het lukt wel.', circleColor: '#F2EFC2' },
      { answerBold: 'Moeilijk.',      answerNormal: ' Ik kan niet goed ademen.',                               circleColor: '#F0C8AD' },
      { answerBold: 'Heel moeilijk.', answerNormal: ' Ik kan bijna niet ademen.',                              circleColor: '#EEC7C7' },
    ],
  },
  {
    id: 4, category: 'Pijn', icon: 'bolt', isText: false,
    options: [
      { answerBold: 'Geen pijn.',      answerNormal: ' Ik voel helemaal geen pijn.',                           circleColor: '#B2DEB6' },
      { answerBold: 'Weinig pijn.',    answerNormal: ' Ik voel het, maar het gaat.',                           circleColor: '#CFEBD4' },
      { answerBold: 'Pijn.',           answerNormal: ' Ik voel duidelijk pijn. Maar het is nog vol te houden.', circleColor: '#F2EFC2' },
      { answerBold: 'Veel pijn.',      answerNormal: ' Ik heb veel pijn.',                                     circleColor: '#F0C8AD' },
      { answerBold: 'Heel veel pijn.', answerNormal: ' Ik heb heel veel last van pijn.',                       circleColor: '#EEC7C7' },
    ],
  },
  {
    id: 5, category: 'Poep', icon: 'WC', isText: true,
    options: [
      { answerBold: 'Diarree.',     answerNormal: ' Mijn poep is heel dun of waterig.',               circleColor: '#F4D2BC' },
      { answerBold: 'Wat dunner.',  answerNormal: ' Mijn poep was wat dunner dan normaal.',           circleColor: '#F2EFC2' },
      { answerBold: 'Normaal.',     answerNormal: ' Mijn poep is normaal.',                           circleColor: '#CFEBD4' },
      { answerBold: 'Wat harder.',  answerNormal: ' Mijn poep is wat harder of vaster dan normaal.',  circleColor: '#F2EFC2' },
      { answerBold: 'Verstopping.', answerNormal: ' Mijn poep is hard. Ik kan moeilijk poepen.',     circleColor: '#F4D2BC' },
    ],
  },
];

export default function DiaryHistoriePage() {
  const navigate = useNavigate();
  const { daysAgo: daysAgoStr } = useParams();
  const daysAgo = parseInt(daysAgoStr, 10) || 1;

  const date = new Date(Date.now() - daysAgo * 86400000);
  const dateString = `${date.getDate()} ${DUTCH_MONTHS[date.getMonth()]}`;

  // Deterministic answers for this specific day
  const summaryRows = useMemo(() =>
    CATEGORIES.map((cat, i) => {
      const option = seededPick(cat.options, daysAgo, i);
      return { ...cat, ...option, iconColor: ICON_COLOR[option.circleColor] };
    }),
  [daysAgo]);

  const goBack  = () => navigate(`/dagboek/historie/${daysAgo + 1}`);
  const goForward = () =>
    daysAgo === 1 ? navigate('/dagboek/samenvatting') : navigate(`/dagboek/historie/${daysAgo - 1}`);

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '414px',
      height: '736px', margin: '0 auto',
      background: '#F6F6F6', fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>

      {/* ── Topbar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0,
        width: '414px', height: '105px', background: '#FFFFFF',
        borderBottom: '2px solid #377B8A', display: 'flex', flexDirection: 'column', gap: '15px',
      }}>
        {/* Title row */}
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center', padding: '0px 10px', height: '40px',
        }}>
          <div style={{
            position: 'relative', display: 'flex', flexDirection: 'row',
            alignItems: 'center', padding: '0px 0px 0px 10px',
            isolation: 'isolate', width: '150px', height: '34px',
          }}>
            <div style={{
              position: 'absolute', width: '29px', height: '29px',
              left: '0px', top: '3px', borderRadius: '50%', background: '#E6F4F2', zIndex: 1,
            }} />
            <span style={{
              fontFamily: 'Inter', fontWeight: 700, fontSize: '24px',
              lineHeight: '29px', color: '#377B8A', position: 'relative', zIndex: 2,
            }}>Dagboek</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '11px' }}>
            <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#377B8A', userSelect: 'none' }}>edit</span>
            </div>
            <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* Date navigation — both arrows always active */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px 0px 10px', height: '46px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', height: '36px' }}>
            <button onClick={goBack} style={{
              width: '30px', height: '30px', background: '#E6F4F2',
              border: '0.5px solid #CFEBE8', borderRadius: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', padding: 0,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#377B8A', userSelect: 'none' }}>chevron_left</span>
            </button>

            {/* Date label — show "Gisteren" above date when daysAgo === 1 */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', color: '#377B8A', fontFamily: 'Inter', fontWeight: 400,
            }}>
              {daysAgo === 1 ? (
                <>
                  <span style={{ fontSize: '20px', lineHeight: '24px' }}>Gisteren</span>
                  <span style={{ fontSize: '12px', lineHeight: '15px' }}>{dateString}</span>
                </>
              ) : (
                <span style={{ fontSize: '20px', lineHeight: '24px' }}>{dateString}</span>
              )}
            </div>

            <button onClick={goForward} style={{
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

      {/* ── Decorative circles + title ── */}
      <div style={{ position: 'absolute', width: '54px', height: '54px', left: '25px', top: '136px', borderRadius: '50%', background: '#CFEBE8' }} />
      <div style={{ position: 'absolute', width: '14px', height: '14px', left: '72px', top: '183px', borderRadius: '50%', background: '#CFEBE8' }} />
      <div style={{
        position: 'absolute', left: '37px', top: '144px', width: '218px', height: '39px',
        fontFamily: 'Inter', fontWeight: 700, fontSize: '32px', lineHeight: '39px',
        color: '#377B8A', display: 'flex', alignItems: 'center',
      }}>Samenvatting</div>

      {/* ── Summary rows ── */}
      <div style={{
        position: 'absolute', width: '346px', left: '25px', top: '221px',
        display: 'flex', flexDirection: 'column', gap: '10px',
      }}>
        {summaryRows.map((row) => (
          <div key={row.id} style={{
            position: 'relative', width: '346px', height: '77px',
            background: '#FFFFFF', borderRadius: '10px',
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            padding: '5px 0px 5px 10px', gap: '10px', boxSizing: 'border-box',
          }}>
            <div style={{ position: 'relative', width: '51px', height: '51px', flexShrink: 0 }}>
              <div style={{ position: 'absolute', width: '51px', height: '51px', borderRadius: '50%', background: row.circleColor }} />
              <div style={{ position: 'absolute', width: '51px', height: '51px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {row.isText ? (
                  <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', color: row.iconColor, userSelect: 'none' }}>{row.icon}</span>
                ) : (
                  <span className="material-symbols-outlined" style={{ fontSize: '32px', color: row.iconColor, userSelect: 'none' }}>{row.icon}</span>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '7px', width: '245px' }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: '#377B8A' }}>{row.category}</div>
              <div style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '18px', color: '#727272' }}>
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
