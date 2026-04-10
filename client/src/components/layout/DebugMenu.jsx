import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DIARY_DONE_KEY } from '../../pages/diary/DiaryPage';

/** Wrap any element with this to detect triple-click */
export function useTripleClick(onTriple) {
  const count = useRef(0);
  const timer = useRef(null);
  return () => {
    count.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { count.current = 0; }, 500);
    if (count.current >= 3) {
      count.current = 0;
      onTriple();
    }
  };
}

export default function DebugMenu({ onClose }) {
  const navigate = useNavigate();
  const [msgDone, setMsgDone] = useState(false);

  function resetOnboarding() {
    localStorage.removeItem('onboardingComplete');
    onClose();
    navigate('/onboarding');
  }

  function resetMessages() {
    localStorage.removeItem('demo_messages');
    setMsgDone(true);
  }

  function resetDiary() {
    localStorage.removeItem(DIARY_DONE_KEY);
    onClose();
    navigate('/dagboek');
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FFFFFF', borderRadius: '20px',
          padding: '24px 20px', width: '310px',
          display: 'flex', flexDirection: 'column', gap: '10px',
          fontFamily: 'Inter',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#377B8A' }}>⚙ Debug menu</span>
          <div
            onClick={onClose}
            style={{ cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#B3B2B2' }}>close</span>
          </div>
        </div>

        {/* Onboarding button */}
        <div
          onClick={resetOnboarding}
          style={{
            width: '100%', height: '58px', background: '#FFFFFF',
            border: '1px solid #E6F4F2', borderRadius: '20px',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            gap: '0', position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', width: '29px', height: '29px',
            left: '15px', borderRadius: '50%', background: '#E6F4F2',
          }} />
          <div style={{
            position: 'absolute', left: '13px', width: '35px', height: '35px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#377B8A', userSelect: 'none' }}>restart_alt</span>
          </div>
          <span style={{
            position: 'absolute', left: '61px',
            fontFamily: 'Inter', fontWeight: 700, fontSize: '14px', color: '#377B8A',
          }}>Onboarding opnieuw doorlopen</span>
          <span className="material-symbols-outlined" style={{
            position: 'absolute', right: '14px', fontSize: '22px', color: '#B3B2B2', userSelect: 'none',
          }}>chevron_right</span>
        </div>

        {/* Messages reset button */}
        <div
          onClick={msgDone ? undefined : resetMessages}
          style={{
            width: '100%', height: '58px', background: '#FFFFFF',
            border: `1px solid ${msgDone ? '#CFEBD4' : '#FFF0E8'}`,
            borderRadius: '20px',
            cursor: msgDone ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', width: '29px', height: '29px',
            left: '15px', borderRadius: '50%',
            background: msgDone ? '#CFEBD4' : '#FFF0E8',
          }} />
          <div style={{
            position: 'absolute', left: '13px', width: '35px', height: '35px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="material-symbols-outlined" style={{
              fontSize: '22px', color: msgDone ? '#378A6C' : '#CB6E02', userSelect: 'none',
            }}>{msgDone ? 'check_circle' : 'delete_sweep'}</span>
          </div>
          <span style={{
            position: 'absolute', left: '61px',
            fontFamily: 'Inter', fontWeight: 700, fontSize: '14px',
            color: msgDone ? '#378A6C' : '#CB6E02',
          }}>{msgDone ? 'Berichten gereset!' : 'Berichten resetten'}</span>
          {!msgDone && (
            <span className="material-symbols-outlined" style={{
              position: 'absolute', right: '14px', fontSize: '22px', color: '#B3B2B2', userSelect: 'none',
            }}>chevron_right</span>
          )}
        </div>

        {/* Diary reset button */}
        <div
          onClick={resetDiary}
          style={{
            width: '100%', height: '58px', background: '#FFFFFF',
            border: '1px solid #EBE9CF', borderRadius: '20px',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', width: '29px', height: '29px',
            left: '15px', borderRadius: '50%', background: '#EBE9CF',
          }} />
          <div style={{
            position: 'absolute', left: '13px', width: '35px', height: '35px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="material-symbols-outlined" style={{
              fontSize: '22px', color: '#C5A500', userSelect: 'none',
            }}>contract_edit</span>
          </div>
          <span style={{
            position: 'absolute', left: '61px',
            fontFamily: 'Inter', fontWeight: 700, fontSize: '14px', color: '#C5A500',
          }}>Dagboek opnieuw invullen</span>
          <span className="material-symbols-outlined" style={{
            position: 'absolute', right: '14px', fontSize: '22px', color: '#B3B2B2', userSelect: 'none',
          }}>chevron_right</span>
        </div>

        <div style={{ fontSize: '11px', color: '#B3B2B2', textAlign: 'center', marginTop: '2px' }}>
          3× klikken op de paginatitel om te openen
        </div>
      </div>
    </div>
  );
}
