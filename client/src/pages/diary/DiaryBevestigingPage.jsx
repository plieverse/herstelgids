import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DIARY_DONE_KEY, todayKey } from './DiaryPage';
import ProfileOverlay from '../../components/ui/ProfileOverlay';

const DUTCH_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

export default function DiaryBevestigingPage() {
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

      {/* ── NS Dagboektopbar: white bar 414×105px ── */}
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

        {/* ── Frame 42: title row, 414×40px ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px 10px',
          height: '40px',
        }}>

          {/* Left: circle + "Dagboek" label */}
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
              position: 'absolute',
              width: '29px',
              height: '29px',
              left: '0px',
              top: '3px',
              borderRadius: '50%',
              background: '#E6F4F2',
              zIndex: 1,
            }} />
            <span style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '29px',
              color: '#377B8A',
              position: 'relative',
              zIndex: 2,
            }}>Dagboek</span>
          </div>

          {/* Right: edit icon + profile icon */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '11px',
          }}>
            <div style={{
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '28px',
                color: '#377B8A',
                userSelect: 'none',
              }}>edit</span>
            </div>
            <div onClick={() => setProfileOpen(true)} style={{
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '32px',
                color: '#377B8A',
                userSelect: 'none',
              }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* ── Frame 7: date navigation row ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px 0px 10px',
          height: '46px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px',
            height: '36px',
          }}>

            {/* Left arrow (active) */}
            <button style={{
              width: '30px',
              height: '30px',
              background: '#E6F4F2',
              border: '0.5px solid #CFEBE8',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '20px',
                color: '#377B8A',
                userSelect: 'none',
              }}>chevron_left</span>
            </button>

            {/* Date label */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              color: '#377B8A',
              fontFamily: 'Inter',
              fontWeight: 400,
            }}>
              <span style={{ fontSize: '20px', lineHeight: '24px' }}>Vandaag</span>
              <span style={{ fontSize: '12px', lineHeight: '15px' }}>{dateString}</span>
            </div>

            {/* Right arrow (disabled) */}
            <button style={{
              width: '30px',
              height: '30px',
              background: '#E6F4F2',
              border: '0.5px solid #CFEBE8',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'default',
              padding: 0,
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '20px',
                color: '#CFEBE8',
                userSelect: 'none',
              }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Confirmation card: 338×376, left:38, top:200 ── */}
      <div style={{
        position: 'absolute',
        left: '38px',
        top: '200px',
        width: '338px',
        height: '420px',
        background: '#FFFFFF',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '20px',
        overflow: 'hidden',
      }}>

        {/* Ellipse 18: 155×155, left:72, top:34 */}
        <div style={{
          position: 'absolute',
          width: '155px',
          height: '155px',
          left: '72px',
          top: '34px',
          borderRadius: '50%',
          background: '#EFF6F5',
        }} />

        {/* Ellipse 19: 52×52, left:228, top:122 */}
        <div style={{
          position: 'absolute',
          width: '52px',
          height: '52px',
          left: '228px',
          top: '122px',
          borderRadius: '50%',
          background: '#EFF6F5',
        }} />

        {/* Ellipse 20: 33×33, left:203, top:174 */}
        <div style={{
          position: 'absolute',
          width: '33px',
          height: '33px',
          left: '203px',
          top: '174px',
          borderRadius: '50%',
          background: '#EFF6F5',
        }} />

        {/* Frame 12 content: left:25, top:148, width:288 */}
        <div style={{
          position: 'absolute',
          left: '25px',
          top: '148px',
          width: '288px',
        }}>

          {/* "Je dagboek is bijgewerkt!" */}
          <div style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '29px',
            color: '#377B8A',
            textAlign: 'center',
            marginBottom: '23px',
          }}>
            Je dagboek is bijgewerkt!
          </div>

          {/* Subtitle */}
          <div style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: '18px',
            color: '#727272',
            textAlign: 'center',
            marginBottom: '55px',
          }}>
            Zorgverleners kunnen je dagboek nu bekijken.
          </div>

          {/* "Begrepen" button: 170×50px centered */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => { localStorage.setItem(DIARY_DONE_KEY, todayKey()); navigate('/dagboek/samenvatting'); }}
              style={{
                width: '170px',
                height: '50px',
                background: '#377B8A',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '29px',
                color: '#FFFFFF',
              }}
            >
              <span className="material-symbols-outlined" style={{
                fontSize: '26px',
                color: '#FFFFFF',
                userSelect: 'none',
              }}>check</span>
              Begrepen
            </button>
          </div>
        </div>
      </div>

      {profileOpen && <ProfileOverlay onClose={() => setProfileOpen(false)} />}
    </div>
  );
}
