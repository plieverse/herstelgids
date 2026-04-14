import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveDiaryAnswer, loadDiaryAnswers } from './DiaryPage';

const DUTCH_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

function todayLabel() {
  const d = new Date();
  return `Vandaag: ${d.getDate()} ${DUTCH_MONTHS[d.getMonth()]}`;
}

const QUESTIONS = [
  {
    num: 1,
    icon: 'health_metrics',
    title: 'Hoe voel je je vandaag vergeleken met gisteren?',
    options: [
      { id: 1, label: 'Veel beter',    desc: 'Ik voel me veel beter. Ik heb bijna geen last.',          color: '#B2DEB6', height: 71 },
      { id: 2, label: 'Iets beter',    desc: 'Ik voel me iets beter. Ik heb nog wel een beetje last.',  color: '#CFEBD4', height: 77 },
      { id: 3, label: 'Hetzelfde',     desc: 'Ik voel me hetzelfde als gisteren.',                      color: '#F2EFC2', height: 71 },
      { id: 4, label: 'Iets slechter', desc: 'Ik voel me iets slechter. Ik heb meer last.',             color: '#F0C8AD', height: 71 },
      { id: 5, label: 'Veel slechter', desc: 'Ik voel me veel slechter. Ik heb heel veel last.',        color: '#EEC7C7', height: 77 },
    ],
  },
  {
    num: 2,
    icon: 'nutrition',
    title: 'Hoe gaat het eten vandaag?',
    options: [
      { id: 1, label: 'Heel goed',     desc: 'Ik heb geen problemen met eten.',                         color: '#B2DEB6', height: 71 },
      { id: 2, label: 'Goed',          desc: 'Ik heb af en toe last, maar het gaat nog goed.',          color: '#CFEBD4', height: 77 },
      { id: 3, label: 'Middelmatig',   desc: 'Ik heb duidelijk moeite met eten, maar het lukt wel.',    color: '#F2EFC2', height: 71 },
      { id: 4, label: 'Moeilijk',      desc: 'Ik kan moeilijk mijn eten doorslikken.',                  color: '#F0C8AD', height: 71 },
      { id: 5, label: 'Heel moeilijk', desc: 'Ik kan mijn eten bijna niet doorslikken.',                color: '#EEC7C7', height: 77 },
    ],
  },
  {
    num: 3,
    icon: 'pulmonology',
    title: 'Hoe gaat het ademen vandaag?',
    options: [
      { id: 1, label: 'Heel goed',     desc: 'Ik kan goed door ademen.',                                color: '#B2DEB6', height: 71 },
      { id: 2, label: 'Goed',          desc: 'Ik heb af en toe moeite met ademen. Maar het gaat nog goed.', color: '#CFEBD4', height: 77 },
      { id: 3, label: 'Middelmatig',   desc: 'Ik heb duidelijk moeite met ademen. Maar het lukt wel.',  color: '#F2EFC2', height: 71 },
      { id: 4, label: 'Moeilijk',      desc: 'Ik kan niet goed ademen.',                                color: '#F0C8AD', height: 71 },
      { id: 5, label: 'Heel moeilijk', desc: 'Ik kan bijna niet ademen.',                               color: '#EEC7C7', height: 77 },
    ],
  },
  {
    num: 4,
    icon: 'bolt',
    title: 'Hoeveel pijn heb je vandaag?',
    options: [
      { id: 1, label: 'Geen pijn',      desc: 'Ik voel helemaal geen pijn.',                            color: '#B2DEB6', height: 71 },
      { id: 2, label: 'Weinig pijn',    desc: 'Ik voel het, maar het gaat.',                            color: '#CFEBD4', height: 77 },
      { id: 3, label: 'Pijn',           desc: 'Ik voel duidelijk pijn. Maar het is nog vol te houden.', color: '#F2EFC2', height: 71 },
      { id: 4, label: 'Veel pijn',      desc: 'Ik heb veel pijn.',                                      color: '#F0C8AD', height: 71 },
      { id: 5, label: 'Heel veel pijn', desc: 'Ik heb heel veel pijn.',                                 color: '#EEC7C7', height: 77 },
    ],
  },
  {
    num: 5,
    icon: 'WC',
    isText: true,
    title: 'Hoe was je poep vandaag?',
    options: [
      { id: 1, label: 'Diarree',     desc: 'Mijn poep is heel dun of waterig.',                color: '#F4D2BC', height: 71 },
      { id: 2, label: 'Wat dunner',  desc: 'Mijn poep was wat dunner dan normaal.',            color: '#F2EFC2', height: 77 },
      { id: 3, label: 'Normaal',     desc: 'Mijn poep is normaal.',                            color: '#CFEBD4', height: 71 },
      { id: 4, label: 'Wat harder',  desc: 'Mijn poep is wat harder of vaster dan normaal.',  color: '#F2EFC2', height: 71 },
      { id: 5, label: 'Verstopping', desc: 'Mijn poep is hard. Ik kan moeilijk poepen.',      color: '#F4D2BC', height: 77 },
    ],
  },
];

export default function DiaryBewerkenPage() {
  const navigate = useNavigate();
  const { vraag } = useParams();
  const qNum = Math.min(5, Math.max(1, parseInt(vraag, 10) || 1));
  const q = QUESTIONS[qNum - 1];

  const saved = loadDiaryAnswers();
  const defaultAnswer = saved[`q${qNum}`] ?? null;
  const [selected, setSelected] = useState(defaultAnswer);

  const isLast = qNum === 5;
  const dateLabel = todayLabel();

  function handleNext() {
    saveDiaryAnswer(qNum, selected ?? defaultAnswer ?? 3);
    if (isLast) {
      navigate('/dagboek/samenvatting');
    } else {
      navigate(`/dagboek/bewerken/${qNum + 1}`);
    }
  }

  function handleBack() {
    if (qNum === 1) {
      navigate('/dagboek/samenvatting');
    } else {
      navigate(`/dagboek/bewerken/${qNum - 1}`);
    }
  }

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '414px',
      height: '736px', minHeight: '736px', margin: '0 auto',
      background: '#FFFFFF', fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>

      {/* ── Progress header ── */}
      <div style={{
        position: 'absolute', width: '414px', left: 0, top: '5px',
        background: '#FFFFFF',
      }}>
        {/* Title row with close button */}
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'flex-start', padding: '7px 10px 0 16px',
        }}>
          <div>
            <div style={{
              fontFamily: 'Inter', fontWeight: 700, fontSize: '24px',
              lineHeight: '29px', color: '#377B8A',
            }}>
              Bewerken: vraag {qNum} van de 5
            </div>
            <div style={{
              fontFamily: 'Inter', fontWeight: 400, fontSize: '14px',
              lineHeight: '17px', color: '#727272', marginTop: '2px',
            }}>
              {dateLabel}
            </div>
          </div>
          {/* Close / annuleren */}
          <button
            onClick={() => navigate('/dagboek/samenvatting')}
            aria-label="Annuleren"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: '#E6F4F2', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: '2px',
            }}
          >
            <span className="material-symbols-outlined" style={{
              fontSize: '22px', color: '#377B8A', userSelect: 'none',
            }}>close</span>
          </button>
        </div>

        {/* Progress bar */}
        <div style={{
          margin: '8px 16px 0',
          height: '6px', display: 'flex', flexDirection: 'row', gap: '5px',
        }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{
              flex: 1, height: '6px', borderRadius: '3px',
              background: i <= qNum ? '#377B8A' : '#CFEBE8', opacity: 0.5,
            }} />
          ))}
        </div>
      </div>

      {/* ── Grey background ── */}
      <div style={{
        position: 'absolute', left: 0, top: '108px', width: '414px', bottom: '58px',
        background: '#F6F6F6', borderRadius: '20px 20px 0px 0px',
      }} />

      {/* ── Question + options ── */}
      <div style={{
        position: 'absolute', width: '370px', left: '20px', top: '115px',
      }}>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', width: '76px', height: '76px',
          left: '147px', top: '20px', borderRadius: '50%',
          background: '#CFEBE8', zIndex: 0,
        }} />

        {/* Icon + title */}
        <div style={{
          position: 'absolute', left: '30px', top: 0, width: '311px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1,
        }}>
          <div style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {q.isText ? (
              <span style={{ fontSize: '36px', fontWeight: 400, color: '#377B8A', userSelect: 'none', fontFamily: 'Inter' }}>{q.icon}</span>
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#377B8A', userSelect: 'none' }}>{q.icon}</span>
            )}
          </div>
          <div style={{
            width: '311px', fontFamily: 'Inter', fontWeight: 700, fontSize: '24px',
            lineHeight: '29px', color: '#377B8A', textAlign: 'center',
          }}>
            {q.title}
          </div>
        </div>

        {/* Answer cards */}
        <div style={{
          position: 'absolute', left: '13px', top: '115px', width: '344px',
          display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 2,
        }}>
          {q.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              style={{
                position: 'relative', width: '344px', height: `${opt.height}px`,
                background: selected === opt.id ? '#E6F4F2' : '#FFFFFF',
                borderRadius: '20px',
                border: selected === opt.id ? '2px solid #377B8A' : '2px solid transparent',
                cursor: 'pointer', padding: 0, flexShrink: 0, textAlign: 'left',
              }}
            >
              <div style={{
                position: 'absolute', width: '48px', height: '48px',
                left: '11px', top: '13px', borderRadius: '50%', background: opt.color,
              }} />
              <div style={{
                position: 'absolute',
                left: `${Math.round(0.1011 * 344)}px`,
                right: `${Math.round(0.1749 * 344)}px`,
                top: '50%', transform: 'translateY(-50%)',
              }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: '#727272' }}>
                  {opt.label}
                </div>
                <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '15px', lineHeight: '18px', color: '#727272' }}>
                  {opt.desc}
                </div>
              </div>
              <div style={{
                position: 'absolute', right: '11px', top: '50%', transform: 'translateY(-50%)',
                width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{
                  fontSize: '24px',
                  color: selected === opt.id ? '#377B8A' : '#B3B2B2',
                  userSelect: 'none',
                }}>
                  {selected === opt.id ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Buttons ── */}
      <div style={{
        position: 'absolute', width: '414px', height: '37px', left: 0, top: '635px',
        display: 'flex', flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center', gap: '11px',
      }}>
        <button
          onClick={handleBack}
          style={{
            width: '144px', height: '30px',
            background: '#FFFFFF', border: '1px solid #377B8A',
            borderRadius: '20px', cursor: 'pointer', padding: 0,
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            justifyContent: 'center', gap: '8px',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#377B8A', userSelect: 'none' }}>chevron_left</span>
          <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '15px', color: '#377B8A' }}>
            {qNum === 1 ? 'Annuleren' : 'Vorige'}
          </span>
        </button>

        <button
          onClick={handleNext}
          style={{
            width: '182px', height: '30px',
            background: '#377B8A', border: 'none',
            borderRadius: '20px', cursor: 'pointer',
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            justifyContent: 'center', gap: '8px',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#FFFFFF', userSelect: 'none' }}>
            {isLast ? 'save' : 'chevron_right'}
          </span>
          <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '15px', color: '#FFFFFF' }}>
            {isLast ? 'Opslaan' : 'Volgende'}
          </span>
        </button>
      </div>
    </div>
  );
}
