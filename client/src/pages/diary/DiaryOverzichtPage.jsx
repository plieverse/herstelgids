import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProfileOverlay from '../../components/ui/ProfileOverlay';
import VoortgangsGrafiek from '../../components/diary/VoortgangsGrafiek';

export default function DiaryOverzichtPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const baseOffset = parseInt(searchParams.get('from') || '0', 10);
  const [profileOpen, setProfileOpen] = useState(false);
  const [periode, setPeriode] = useState('week');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  const [landscape, setLandscape] = useState(
    () => isTouchDevice && window.matchMedia('(orientation: landscape)').matches
  );

  useEffect(() => {
    if (!isTouchDevice) return;
    const mq = window.matchMedia('(orientation: landscape)');
    const handler = (e) => setLandscape(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const days = periode === 'week' ? 7 : 30;

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '414px',
      height: '736px', minHeight: '736px', margin: '0 auto',
      background: '#F6F6F6', fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>

      {/* ── Topbar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0,
        width: '414px', height: '125px', background: '#FFFFFF',
        display: 'flex', flexDirection: 'column',
        padding: '0 10px 12px', boxSizing: 'border-box', gap: '6px',
      }}>

        {/* Row 1: title + icons */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          height: '40px', flexShrink: 0,
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
            }}>Dagboek</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '11px' }}>
            {/* Bar chart icon — active state: white icon on dark teal square */}
            <div
              onClick={() => navigate(-1)}
              style={{
                width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', background: '#377B8A', borderRadius: '50%',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#FFFFFF', userSelect: 'none' }}>bar_chart</span>
            </div>
            {/* Profile icon */}
            <div
              onClick={() => setProfileOpen(true)}
              style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* Row 2: "Overzicht" label */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '24px', flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'Inter', fontWeight: 400, fontSize: '20px',
            lineHeight: '24px', color: '#377B8A',
          }}>Overzicht</span>
        </div>

        {/* Row 3: 1 week / 1 maand chips */}
        <div style={{
          height: '33px', background: '#F5F5F5', borderRadius: '20px',
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          padding: '3px 5px', boxSizing: 'border-box', flexShrink: 0,
        }}>
          <div
            onClick={() => setPeriode('week')}
            style={{
              flex: 1, height: '27px',
              background: periode === 'week' ? '#377B8A' : 'transparent',
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <span style={{
              fontFamily: 'Inter', fontWeight: 400, fontSize: '16px', lineHeight: '20px',
              color: periode === 'week' ? '#FFFFFF' : '#B3B2B2',
            }}>1 week</span>
          </div>
          <div
            onClick={() => setPeriode('maand')}
            style={{
              flex: 1, height: '27px',
              background: periode === 'maand' ? '#377B8A' : 'transparent',
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <span style={{
              fontFamily: 'Inter', fontWeight: 400, fontSize: '16px', lineHeight: '20px',
              color: periode === 'maand' ? '#FFFFFF' : '#B3B2B2',
            }}>1 maand</span>
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{
        position: 'absolute', top: '125px', bottom: '58px',
        left: 0, right: 0, overflowY: 'auto', overscrollBehavior: 'none',
      }}>
        <div style={{ padding: '16px 17px 28px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '100%', boxSizing: 'border-box' }}>

          {/* Back button */}
          <div>
            <button
              onClick={() => navigate(-1)}
              aria-label="Terug"
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#377B8A', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Info banner */}
          <div style={{
            width: '100%', minHeight: '54px',
            background: '#E6F4F2', borderRadius: '10px',
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            padding: '8px 10px', gap: '10px', boxSizing: 'border-box',
          }}>
            <div style={{ position: 'relative', width: '38px', height: '38px', flexShrink: 0 }}>
              <div style={{ position: 'absolute', width: '38px', height: '38px', borderRadius: '50%', background: '#CFEBE8' }} />
              <div style={{ position: 'absolute', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#377B8A', userSelect: 'none' }}>bar_chart</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '15px', lineHeight: '18px', color: '#377B8A' }}>
                Overzicht van hoe het met je gaat
              </div>
              <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '15px', color: '#727272' }}>
                De grafiek laat zien hoe het is gegaan de afgelopen {days} dagen. Hoe hoger de balk, hoe beter het is gegaan voor dat onderdeel. Draai je telefoon om de grafiek beter te bekijken.
              </div>
            </div>
          </div>

          {/* Chart card — flex: 1 so it fills remaining height and centers vertically */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '16px 12px', width: '100%' }}>
              <VoortgangsGrafiek days={days} baseOffset={baseOffset} />
            </div>
          </div>

        </div>
      </div>

      {profileOpen && <ProfileOverlay onClose={() => setProfileOpen(false)} />}

      {/* ── Landscape fullscreen chart (portal outside ScaleWrapper) ── */}
      {landscape && createPortal(
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#FFFFFF',
          display: 'flex', flexDirection: 'column',
          padding: '16px 20px 12px', boxSizing: 'border-box',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 10, flexShrink: 0,
          }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, color: '#377B8A' }}>
              Overzicht — {periode === 'week' ? '1 week' : '1 maand'}
            </span>
            <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#9E9E9E' }}>
              Draai terug voor overzicht
            </span>
          </div>
          {/* Chart filling remaining height */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <VoortgangsGrafiek
              days={days}
              baseOffset={baseOffset}
              maxBarHeight={Math.max(window.innerHeight - 120, 80)}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
