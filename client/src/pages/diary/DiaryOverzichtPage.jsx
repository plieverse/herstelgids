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

  const now = new Date();
  const dateString = `${now.getDate()} ${DUTCH_MONTHS[now.getMonth()]}`;

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
        left: 0, top: 0,
        width: '414px',
        height: '105px',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
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
            <div
              onClick={() => setProfileOpen(true)}
              style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* Subtitle row — "Overzicht / date" with back arrow */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '0px 0px 10px', height: '46px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', height: '36px' }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                width: '30px', height: '30px', background: '#E6F4F2',
                border: '0.5px solid #CFEBE8', borderRadius: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 0,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#377B8A', userSelect: 'none' }}>chevron_left</span>
            </button>

            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', color: '#377B8A', fontFamily: 'Inter', fontWeight: 400,
            }}>
              <span style={{ fontSize: '20px', lineHeight: '24px' }}>Overzicht</span>
              <span style={{ fontSize: '12px', lineHeight: '15px' }}>{dateString}</span>
            </div>

            {/* Spacer to keep "Overzicht" centred */}
            <div style={{ width: '30px', height: '30px' }} />
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{
        position: 'absolute',
        top: '105px',
        bottom: '58px',
        left: 0, right: 0,
        overflowY: 'auto',
        overscrollBehavior: 'none',
      }}>
        <div style={{ padding: '20px 20px 28px' }}>

          {/* Decorative title section */}
          <div style={{ position: 'relative', height: '55px', marginBottom: '16px' }}>
            <div style={{ position: 'absolute', width: '54px', height: '54px', left: 0, top: 0, borderRadius: '50%', background: '#CFEBE8' }} />
            <div style={{ position: 'absolute', width: '14px', height: '14px', left: '47px', top: '47px', borderRadius: '50%', background: '#CFEBE8' }} />
            <div style={{
              position: 'absolute', left: '12px', top: '8px',
              fontFamily: 'Inter', fontWeight: 700, fontSize: '32px',
              lineHeight: '39px', color: '#377B8A',
            }}>
              Voortgang
            </div>
          </div>

          {/* Chart card */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px 16px 20px',
          }}>
            <VoortgangsGrafiek
              titel="Hoe gaat het met mij?"
              subtitel="Gemiddelde van de afgelopen week"
            />
          </div>

          {/* Info text */}
          <div style={{
            marginTop: '14px',
            padding: '14px 16px',
            background: '#FFFFFF',
            borderRadius: '12px',
            fontFamily: 'Inter',
            fontSize: '13px',
            lineHeight: '18px',
            color: '#727272',
          }}>
            De grafiek toont het gemiddelde van de afgelopen 7 dagen van je dagboek.
            Hoe hoger de balk, hoe beter je score voor die categorie.
          </div>
        </div>
      </div>

      {profileOpen && <ProfileOverlay onClose={() => setProfileOpen(false)} />}
    </div>
  );
}
