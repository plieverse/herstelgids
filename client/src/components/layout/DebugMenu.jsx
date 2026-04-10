import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <button
          onClick={resetOnboarding}
          style={{
            width: '100%', height: '46px',
            background: '#377B8A', border: 'none', borderRadius: '12px',
            color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 600, fontSize: '14px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>restart_alt</span>
          Onboarding opnieuw doorlopen
        </button>

        {/* Messages reset button */}
        <button
          onClick={resetMessages}
          style={{
            width: '100%', height: '46px',
            background: msgDone ? '#CFEBD4' : '#F6F6F6',
            border: `1px solid ${msgDone ? '#378A6C' : '#E0E0E0'}`,
            borderRadius: '12px',
            color: msgDone ? '#378A6C' : '#2a2a2a',
            fontFamily: 'Inter', fontWeight: 600, fontSize: '14px',
            cursor: msgDone ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            {msgDone ? 'check_circle' : 'delete_sweep'}
          </span>
          {msgDone ? 'Berichten gereset!' : 'Berichten resetten'}
        </button>

        <div style={{ fontSize: '11px', color: '#B3B2B2', textAlign: 'center', marginTop: '2px' }}>
          3× klikken op de paginatitel om te openen
        </div>
      </div>
    </div>
  );
}
