import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileOverlay from '../../components/ui/ProfileOverlay';
import VoortgangsGrafiek from '../../components/diary/VoortgangsGrafiek';

const DUTCH_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

export default function DiaryOverzichtPage() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [periode, setPeriode] = useState('week'); // 'week' | 'maand'

  const now = new Date();
  const dateString = `${now.getDate()} ${DUTCH_MONTHS[now.getMonth()]}`;

  const days = periode === 'week' ? 7 : 30;
  const periodeLabel = periode === 'week' ? 'afgelopen week' : 'afgelopen maand';

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '414px',
      height: '736px', minHeight: '736px', margin: '0 auto',
      background: '#F6F6F6', fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>

      {/* ── Topbar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0,
        width: '414px', height: '105px', background: '#FFFFFF',
        display: 'flex', flexDirection: 'column', gap: '15px',
      }}>
        {/* Title row */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          padding: '0px 10px', height: '40px',
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
            <div onClick={() => setProfileOpen(true)} style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* Subtitle row with back button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px 0px 10px', height: '46px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', height: '36px' }}>
            <button onClick={() => navigate(-1)} style={{
              width: '30px', height: '30px', background: '#E6F4F2',
              border: '0.5px solid #CFEBE8', borderRadius: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', padding: 0,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#377B8A', userSelect: 'none' }}>chevron_left</span>
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#377B8A', fontFamily: 'Inter', fontWeight: 400 }}>
              <span style={{ fontSize: '20px', lineHeight: '24px' }}>Overzicht</span>
              <span style={{ fontSize: '12px', lineHeight: '15px' }}>{dateString}</span>
            </div>
            <div style={{ width: '30px', height: '30px' }} />
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{
        position: 'absolute', top: '105px', bottom: '58px',
        left: 0, right: 0, overflowY: 'auto', overscrollBehavior: 'none',
      }}>
        <div style={{ padding: '16px 17px 28px' }}>

          {/* Decorative "Overzicht" title */}
          <div style={{ position: 'relative', height: '50px', marginBottom: '14px' }}>
            <div style={{ position: 'absolute', width: '54px', height: '54px', left: 0, top: 0, borderRadius: '50%', background: '#CFEBE8' }} />
            <div style={{ position: 'absolute', width: '14px', height: '14px', left: '47px', top: '47px', borderRadius: '50%', background: '#CFEBE8' }} />
            <div style={{
              position: 'absolute', left: '12px', top: '8px',
              fontFamily: 'Inter', fontWeight: 700, fontSize: '32px',
              lineHeight: '39px', color: '#377B8A',
            }}>Overzicht</div>
          </div>

          {/* ── "Grafiek" selected tab ── */}
          <div style={{
            width: '100%', height: '39px', background: '#F5F5F5', borderRadius: '20px',
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            padding: '3px 5px', boxSizing: 'border-box', marginBottom: '10px',
          }}>
            <div style={{
              flex: 1, height: '33px', background: '#377B8A', borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#FFFFFF', userSelect: 'none' }}>bar_chart</span>
              <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', lineHeight: '22px', color: '#FFFFFF' }}>Grafiek</span>
            </div>
          </div>

          {/* ── Periode chips: 1 week / 1 maand ── */}
          <div style={{
            width: '100%', height: '39px', background: '#F5F5F5', borderRadius: '20px',
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            padding: '3px 5px', boxSizing: 'border-box', marginBottom: '14px',
          }}>
            <div
              onClick={() => setPeriode('week')}
              style={{
                flex: 1, height: '33px',
                background: periode === 'week' ? '#377B8A' : 'transparent',
                borderRadius: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <span style={{
                fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', lineHeight: '22px',
                color: periode === 'week' ? '#FFFFFF' : '#B3B2B2',
              }}>1 week</span>
            </div>
            <div
              onClick={() => setPeriode('maand')}
              style={{
                flex: 1, height: '33px',
                background: periode === 'maand' ? '#377B8A' : 'transparent',
                borderRadius: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <span style={{
                fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', lineHeight: '22px',
                color: periode === 'maand' ? '#FFFFFF' : '#B3B2B2',
              }}>1 maand</span>
            </div>
          </div>

          {/* ── Info banner (diary style) ── */}
          <div style={{
            width: '100%', minHeight: '54px',
            background: '#E6F4F2', borderRadius: '10px',
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            padding: '8px 10px', gap: '10px', boxSizing: 'border-box',
            marginBottom: '12px',
          }}>
            <div style={{ position: 'relative', width: '38px', height: '38px', flexShrink: 0 }}>
              <div style={{ position: 'absolute', width: '38px', height: '38px', borderRadius: '50%', background: '#CFEBE8' }} />
              <div style={{ position: 'absolute', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#377B8A', userSelect: 'none' }}>bar_chart</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '15px', lineHeight: '18px', color: '#377B8A' }}>
                Gemiddelde {periodeLabel}
              </div>
              <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '15px', color: '#727272' }}>
                Hoe hoger de balk, hoe beter je score voor die categorie.
              </div>
            </div>
          </div>

          {/* ── Chart card ── */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '16px 12px 16px' }}>
            <VoortgangsGrafiek days={days} />
          </div>

        </div>
      </div>

      {profileOpen && <ProfileOverlay onClose={() => setProfileOpen(false)} />}
    </div>
  );
}
