import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveDiaryAnswer } from './DiaryPage';

const PAIN_OPTIONS = [
  {
    id: 1,
    label: 'Veel beter',
    desc: 'Ik voel me veel beter. Ik heb bijna geen last.',
    color: '#B2DEB6',
    height: 71,
  },
  {
    id: 2,
    label: 'Iets beter',
    desc: 'Ik voel me iets beter. Ik heb nog wel een beetje last.',
    color: '#CFEBD4',
    height: 77,
  },
  {
    id: 3,
    label: 'Hetzelfde',
    desc: 'Ik voel me hetzelfde als gisteren.',
    color: '#F2EFC2',
    height: 71,
  },
  {
    id: 4,
    label: 'Iets slechter',
    desc: 'Ik voel me iets slechter. Ik heb meer last.',
    color: '#F0C8AD',
    height: 71,
  },
  {
    id: 5,
    label: 'Veel slechter',
    desc: 'Ik voel me veel slechter. Ik heb heel veel last.',
    color: '#EEC7C7',
    height: 77,
  },
];

export default function DiaryVraag1Page() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '414px',
      height: '736px',
      minHeight: '736px',
      margin: '0 auto',
      background: '#FFFFFF',
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden',
    }}>

      {/* ── NS-progressquestionnaire: 414×78, top:5 ── */}
      <div style={{
        position: 'absolute',
        width: '414px',
        height: '78px',
        left: 0,
        top: '5px',
        background: '#FFFFFF',
      }}>

        {/* "Vraag 1 van de 3": left:16, top:12 */}
        <div style={{
          position: 'absolute',
          left: '16px',
          top: '12px',
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '29px',
          color: '#377B8A',
        }}>
          Vraag 1 van de 5
        </div>

        {/* Progress bar: 1 active, 4 inactive — left:16, top:52, width:374 */}
        <div style={{
          position: 'absolute',
          left: '16px',
          top: '52px',
          width: '374px',
          height: '6px',
          display: 'flex',
          flexDirection: 'row',
          gap: '5px',
        }}>
          <div style={{ flex: 1, height: '6px', background: '#377B8A', opacity: 0.5, borderRadius: '3px' }} />
          <div style={{ flex: 1, height: '6px', background: '#CFEBE8', opacity: 0.5, borderRadius: '3px' }} />
          <div style={{ flex: 1, height: '6px', background: '#CFEBE8', opacity: 0.5, borderRadius: '3px' }} />
          <div style={{ flex: 1, height: '6px', background: '#CFEBE8', opacity: 0.5, borderRadius: '3px' }} />
          <div style={{ flex: 1, height: '6px', background: '#CFEBE8', opacity: 0.5, borderRadius: '3px' }} />
        </div>
      </div>

      {/* ── Rectangle 28: grey area, top:98 to bottom nav ── */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: '98px',
        width: '414px',
        bottom: '58px',
        background: '#F6F6F6',
        borderRadius: '20px 20px 0px 0px',
      }} />

      {/* ── NS-vraag+antwoord: 370×520, left:20, top:105 ── */}
      <div style={{
        position: 'absolute',
        width: '370px',
        height: '520px',
        left: '20px',
        top: '105px',
      }}>

        {/* Ellipse 29: teal circle behind icon, 76×76, left:147, top:20 */}
        <div style={{
          position: 'absolute',
          width: '76px',
          height: '76px',
          left: '147px',
          top: '20px',
          borderRadius: '50%',
          background: '#CFEBE8',
          zIndex: 0,
        }} />

        {/* Frame 47: icon + title, 311×105, centered horizontally */}
        <div style={{
          position: 'absolute',
          left: '30px',
          top: 0,
          width: '311px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
        }}>
          {/* health_metrics icon: 50×50 */}
          <div style={{
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span className="material-symbols-outlined" style={{
              fontSize: '48px',
              color: '#377B8A',
              userSelect: 'none',
            }}>health_metrics</span>
          </div>

          {/* "Hoeveel pijn heb je vandaag?" */}
          <div style={{
            width: '311px',
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '29px',
            color: '#377B8A',
            textAlign: 'center',
          }}>
            Hoe voel je je vandaag vergeleken met gisteren?
          </div>
        </div>

        {/* Frame 22: answer cards, left:13, top:115 (after icon 105px + gap 10px) */}
        <div style={{
          position: 'absolute',
          left: '13px',
          top: '115px',
          width: '344px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 2,
        }}>
          {PAIN_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              style={{
                position: 'relative',
                width: '344px',
                height: `${opt.height}px`,
                background: selected === opt.id ? '#E6F4F2' : '#FFFFFF',
                borderRadius: '20px',
                border: selected === opt.id ? '2px solid #377B8A' : '2px solid transparent',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
                textAlign: 'left',
              }}
            >
              {/* Colored circle: ~48×48, left:11, top:13 */}
              <div style={{
                position: 'absolute',
                width: '48px',
                height: '48px',
                left: '11px',
                top: '13px',
                borderRadius: '50%',
                background: opt.color,
              }} />

              {/* Text: vertically centered, left:10.11%, right:17.49% */}
              <div style={{
                position: 'absolute',
                left: `${Math.round(0.1011 * 344)}px`,
                right: `${Math.round(0.1749 * 344)}px`,
                top: '50%',
                transform: 'translateY(-50%)',
              }}>
                <div style={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '24px',
                  color: '#727272',
                }}>
                  {opt.label}
                </div>
                <div style={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: '15px',
                  lineHeight: '18px',
                  color: '#727272',
                }}>
                  {opt.desc}
                </div>
              </div>

              {/* Radio button: right side, vertically centered */}
              <div style={{
                position: 'absolute',
                right: '11px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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

      {/* ── Frame 43: Terug + Volgende buttons, 414×37, top:635 ── */}
      <div style={{
        position: 'absolute',
        width: '414px',
        height: '37px',
        left: 0,
        top: '635px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '11px',
      }}>

        {/* Terug: 144×30, white + border */}
        <button
          onClick={() => navigate('/dagboek')}
          style={{
            width: '144px',
            height: '30px',
            background: '#FFFFFF',
            border: '1px solid #377B8A',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <span className="material-symbols-outlined" style={{
            fontSize: '22px',
            color: '#377B8A',
            userSelect: 'none',
          }}>chevron_left</span>
          <span style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: '18px',
            color: '#377B8A',
          }}>Terug</span>
        </button>

        {/* Volgende: 182×30, teal */}
        <button
          onClick={() => { saveDiaryAnswer(1, selected ?? 3); navigate('/dagboek/invullen/vraag2'); }}
          style={{
            width: '182px',
            height: '30px',
            background: '#377B8A',
            border: 'none',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
        >
          <span style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: '18px',
            color: '#FFFFFF',
          }}>Volgende</span>
          <span className="material-symbols-outlined" style={{
            fontSize: '22px',
            color: '#FFFFFF',
            userSelect: 'none',
          }}>chevron_right</span>
        </button>
      </div>
    </div>
  );
}
