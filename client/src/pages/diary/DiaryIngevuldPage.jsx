import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DebugMenu, { useTripleClick } from '../../components/layout/DebugMenu';
import { loadDiaryAnswers } from './DiaryPage';
import ProfileOverlay from '../../components/ui/ProfileOverlay';

const DUTCH_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

// Color mapping per score (1=best green → 5=worst red)
const SCORE_COLORS = {
  1: { circleColor: '#B2DEB6', iconColor: '#378A6C' },
  2: { circleColor: '#CFEBD4', iconColor: '#378A6C' },
  3: { circleColor: '#EBE9CF', iconColor: '#C5A500' },
  4: { circleColor: '#F0C8AD', iconColor: '#CB6E02' },
  5: { circleColor: '#EEC7C7', iconColor: '#AF1E1E' },
};

// Q5 (stool) has its own color scale: 3=best, 1 and 5 are both bad
const Q5_COLORS = {
  1: { circleColor: '#F4D2BC', iconColor: '#CB6E02' },
  2: { circleColor: '#F2EFC2', iconColor: '#C5A500' },
  3: { circleColor: '#CFEBD4', iconColor: '#378A6C' },
  4: { circleColor: '#F2EFC2', iconColor: '#C5A500' },
  5: { circleColor: '#F4D2BC', iconColor: '#CB6E02' },
};

// Text per score for each question
const Q1 = {
  1: { bold: 'Veel beter.', normal: ' Ik voel me veel beter. Ik heb bijna geen last.' },
  2: { bold: 'Iets beter.', normal: ' Ik voel me iets beter. Ik heb nog een beetje last.' },
  3: { bold: 'Hetzelfde.', normal: ' Ik voel me hetzelfde als gisteren.' },
  4: { bold: 'Iets slechter.', normal: ' Ik voel me iets slechter. Ik heb meer last.' },
  5: { bold: 'Veel slechter.', normal: ' Ik voel me veel slechter. Ik heb heel veel last.' },
};
const Q2 = {
  1: { bold: 'Heel goed.', normal: ' Ik heb geen problemen met eten.' },
  2: { bold: 'Goed.', normal: ' Ik heb af en toe last, maar het gaat.' },
  3: { bold: 'Middelmatig.', normal: ' Ik heb duidelijk moeite met eten.' },
  4: { bold: 'Moeilijk.', normal: ' Ik kan moeilijk mijn eten doorslikken.' },
  5: { bold: 'Heel moeilijk.', normal: ' Ik kan mijn eten bijna niet doorslikken.' },
};
const Q3 = {
  1: { bold: 'Heel goed.', normal: ' Ik kan goed doorademen.' },
  2: { bold: 'Goed.', normal: ' Ik heb af en toe moeite met ademen.' },
  3: { bold: 'Middelmatig.', normal: ' Ik heb duidelijk moeite met ademen.' },
  4: { bold: 'Moeilijk.', normal: ' Ik kan niet goed ademen.' },
  5: { bold: 'Heel moeilijk.', normal: ' Ik kan bijna niet ademen.' },
};
const Q4 = {
  1: { bold: 'Geen pijn.', normal: ' Ik voel helemaal geen pijn.' },
  2: { bold: 'Weinig pijn.', normal: ' Ik voel het, maar het gaat.' },
  3: { bold: 'Pijn.', normal: ' Ik voel duidelijk pijn. Maar het is nog vol te houden.' },
  4: { bold: 'Veel pijn.', normal: ' Ik heb veel pijn.' },
  5: { bold: 'Heel veel pijn.', normal: ' Ik heb heel veel pijn.' },
};
const Q5 = {
  1: { bold: 'Diarree.', normal: ' Mijn poep is heel dun of waterig.' },
  2: { bold: 'Wat dunner.', normal: ' Mijn poep was wat dunner dan normaal.' },
  3: { bold: 'Normaal.', normal: ' Mijn poep was normaal.' },
  4: { bold: 'Wat harder.', normal: ' Mijn poep is wat harder of vaster.' },
  5: { bold: 'Verstopping.', normal: ' Ik heb moeite met naar het toilet gaan.' },
};

/**
 * Returns true when any answer exceeds the alarm threshold:
 * - Q1 (feeling vs yesterday): score 5 = "Veel slechter"
 * - Q2 (eating):               score >= 4 = "Moeilijk" or "Heel moeilijk"
 * - Q3 (breathing):            score >= 4 = "Moeilijk" or "Heel moeilijk"
 * - Q4 (pain):                 score >= 4 = "Veel pijn" or "Heel veel pijn"
 * - Q5 (stool):                score 1 = "Diarree" or score 5 = "Verstopping"
 */
function checkAlarm(answers) {
  const { q1 = 3, q2 = 2, q3 = 2, q4 = 2, q5 = 3 } = answers;
  return q1 >= 5 || q2 >= 4 || q3 >= 4 || q4 >= 4 || q5 === 1 || q5 === 5;
}

function buildRows(answers) {
  const a = {
    q1: answers.q1 ?? 3,
    q2: answers.q2 ?? 2,
    q3: answers.q3 ?? 4,
    q4: answers.q4 ?? 5,
    q5: answers.q5 ?? 3,
  };
  return [
    { id: 1, category: 'Vergelijking gisteren', ...Q1[a.q1], ...SCORE_COLORS[a.q1], icon: 'health_metrics', isText: false },
    { id: 2, category: 'Eten',                  ...Q2[a.q2], ...SCORE_COLORS[a.q2], icon: 'nutrition',      isText: false },
    { id: 3, category: 'Ademen',                ...Q3[a.q3], ...SCORE_COLORS[a.q3], icon: 'pulmonology',    isText: false },
    { id: 4, category: 'Pijn',                  ...Q4[a.q4], ...SCORE_COLORS[a.q4], icon: 'bolt',           isText: false },
    { id: 5, category: 'Poep',                   ...Q5[a.q5], ...Q5_COLORS[a.q5],    icon: 'WC',             isText: true  },
  ];
}

function NormalBanner() {
  return (
    <div style={{
      width: '346px', minHeight: '54px',
      background: '#E8F5EA', borderRadius: '10px',
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      padding: '8px 10px', gap: '10px', boxSizing: 'border-box',
    }}>
      <div style={{ position: 'relative', width: '38px', height: '38px', flexShrink: 0 }}>
        <div style={{ position: 'absolute', width: '38px', height: '38px', borderRadius: '50%', background: '#CFEBD4' }} />
        <div style={{ position: 'absolute', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#378A6C', userSelect: 'none' }}>visibility</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '15px', lineHeight: '18px', color: '#378A6C' }}>
          Samenvatting bekeken
        </div>
        <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '15px', color: '#727272' }}>
          Op dit moment zien we geen signalen die extra aandacht nodig hebben.
        </div>
      </div>
    </div>
  );
}

function AlarmBanner() {
  return (
    <div style={{
      width: '346px', minHeight: '54px',
      background: '#FEF0E9', borderRadius: '10px',
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      padding: '8px 10px', gap: '10px', boxSizing: 'border-box',
    }}>
      <div style={{ position: 'relative', width: '38px', height: '38px', flexShrink: 0 }}>
        <div style={{ position: 'absolute', width: '38px', height: '38px', borderRadius: '50%', background: '#F4D2BC' }} />
        <div style={{ position: 'absolute', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#CB6E02', userSelect: 'none' }}>warning</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '15px', lineHeight: '18px', color: '#CB6E02' }}>
          Samenvatting bekeken
        </div>
        <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '15px', color: '#727272' }}>
          Er zijn signalen die extra aandacht nodig hebben. Een zorgverlener kijkt mee en neemt contact op als dat nodig is.
        </div>
      </div>
    </div>
  );
}

export default function DiaryIngevuldPage() {
  const navigate = useNavigate();
  const [debugOpen, setDebugOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const handleTripleClick = useTripleClick(() => setDebugOpen(true));

  const now = new Date();
  const dateString = `${now.getDate()} ${DUTCH_MONTHS[now.getMonth()]}`;

  const answers = loadDiaryAnswers();
  const alarm = checkAlarm(answers);
  const summaryRows = buildRows(answers);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '414px',
      height: '736px',
      minHeight: '736px',
      margin: '0 auto',
      background: '#F6F6F6',
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden',
    }}>

      {/* ── Topbar ── */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '414px',
        height: '105px',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}>
        {/* Title row */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px 10px',
          height: '40px',
        }}>
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
              position: 'absolute', width: '29px', height: '29px',
              left: '0px', top: '3px', borderRadius: '50%',
              background: '#E6F4F2', zIndex: 1,
            }} />
            <span style={{
              fontFamily: 'Inter', fontWeight: 700, fontSize: '24px',
              lineHeight: '29px', color: '#377B8A', position: 'relative', zIndex: 2,
            }} onClick={handleTripleClick}>Dagboek</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '11px' }}>
            <div onClick={() => navigate('/dagboek/bewerken/0/1')} style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#377B8A', userSelect: 'none' }}>edit</span>
            </div>
            <div onClick={() => navigate('/dagboek/overzicht')} style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#377B8A', userSelect: 'none' }}>bar_chart</span>
            </div>
            <div onClick={() => setProfileOpen(true)} style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* Date navigation */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '0px 0px 10px', height: '46px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', height: '36px' }}>
            <button
              onClick={() => navigate('/dagboek/historie/1')}
              style={{
                width: '30px', height: '30px', background: '#377B8A',
                border: 'none', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 0,
              }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#FFFFFF', userSelect: 'none' }}>chevron_left</span>
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#377B8A', fontFamily: 'Inter', fontWeight: 400 }}>
              <span style={{ fontSize: '20px', lineHeight: '24px' }}>Vandaag</span>
              <span style={{ fontSize: '12px', lineHeight: '15px' }}>{dateString}</span>
            </div>
            <button style={{
              width: '30px', height: '30px', background: '#E6F4F2',
              border: '0.5px solid #CFEBE8', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'default', padding: 0,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#CFEBE8', userSelect: 'none' }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{
        position: 'absolute',
        top: '105px',
        bottom: '58px',
        left: 0,
        right: 0,
        overflowY: 'auto',
        overscrollBehavior: 'none',
      }}>
        <div style={{ padding: '10px 25px 20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>

          {/* "Samenvatting" title with decorative circles */}
          <div style={{ position: 'relative', height: '55px', width: '346px' }}>
            <div style={{ position: 'absolute', width: '54px', height: '54px', left: 0, top: 0, borderRadius: '50%', background: '#CFEBE8' }} />
            <div style={{ position: 'absolute', width: '14px', height: '14px', left: '47px', top: '47px', borderRadius: '50%', background: '#CFEBE8' }} />
            <div style={{
              position: 'absolute', left: '12px', top: '8px',
              fontFamily: 'Inter', fontWeight: 700, fontSize: '32px',
              lineHeight: '39px', color: '#377B8A',
            }}>Samenvatting</div>
          </div>

          {/* Notification banner */}
          {alarm ? <AlarmBanner /> : <NormalBanner />}

          {/* Summary rows */}
          {summaryRows.map((row) => (
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
                flexShrink: 0,
              }}
            >
              <div style={{ position: 'relative', width: '51px', height: '51px', flexShrink: 0 }}>
                <div style={{ position: 'absolute', width: '51px', height: '51px', borderRadius: '50%', background: row.circleColor }} />
                <div style={{ position: 'absolute', width: '51px', height: '51px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {row.isText ? (
                    <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: row.iconColor, userSelect: 'none' }}>{row.icon}</span>
                  ) : (
                    <span className="material-symbols-outlined" style={{ fontSize: '32px', color: row.iconColor, userSelect: 'none' }}>{row.icon}</span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '7px', width: '245px' }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: '#377B8A' }}>
                  {row.category}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '18px', color: '#727272' }}>
                  <span style={{ fontWeight: 700 }}>{row.bold}</span>
                  <span style={{ fontWeight: 400 }}>{row.normal}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {profileOpen && <ProfileOverlay onClose={() => setProfileOpen(false)} />}
      {debugOpen && <DebugMenu onClose={() => setDebugOpen(false)} />}
    </div>
  );
}
