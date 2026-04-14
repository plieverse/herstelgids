import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const DIARY_DONE_KEY = 'diary_last_completed';
export function todayKey() { return new Date().toISOString().slice(0, 10); }

export const DIARY_ANSWERS_KEY = 'diary_answers';

export function saveDiaryAnswer(questionNum, score) {
  try {
    const stored = localStorage.getItem(DIARY_ANSWERS_KEY);
    const data = stored ? JSON.parse(stored) : {};
    data[`q${questionNum}`] = score;
    localStorage.setItem(DIARY_ANSWERS_KEY, JSON.stringify(data));
  } catch {}
}

export function loadDiaryAnswers() {
  try {
    const stored = localStorage.getItem(DIARY_ANSWERS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch { return {}; }
}

export function dateKeyForDaysAgo(daysAgo) {
  const d = new Date(Date.now() - daysAgo * 86400000);
  return d.toISOString().slice(0, 10);
}

export function loadDiaryAnswersForDay(daysAgo) {
  if (daysAgo === 0) return loadDiaryAnswers();
  try {
    const key = `diary_answers_${dateKeyForDaysAgo(daysAgo)}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

export function saveDiaryAnswerForDay(daysAgo, questionNum, score) {
  if (daysAgo === 0) { saveDiaryAnswer(questionNum, score); return; }
  try {
    const key = `diary_answers_${dateKeyForDaysAgo(daysAgo)}`;
    const stored = localStorage.getItem(key);
    const data = stored ? JSON.parse(stored) : {};
    data[`q${questionNum}`] = score;
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

import DebugMenu, { useTripleClick } from '../../components/layout/DebugMenu';
import ProfileOverlay from '../../components/ui/ProfileOverlay';

const DUTCH_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

export default function DiaryPage() {
  const navigate = useNavigate();
  const [debugOpen, setDebugOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const handleTripleClick = useTripleClick(() => setDebugOpen(true));

  useEffect(() => {
    if (localStorage.getItem(DIARY_DONE_KEY) === todayKey()) {
      navigate('/dagboek/samenvatting', { replace: true });
    }
  }, []);

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
            {/* Ellipse 17: 29×29, left:0, top:3, #E6F4F2 */}
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
            }} onClick={handleTripleClick}>Dagboek</span>
          </div>

          {/* Right: bar_chart + profile icons */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '11px' }}>
            <div onClick={() => navigate('/dagboek/overzicht')} style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#377B8A', userSelect: 'none' }}>bar_chart</span>
            </div>
            <div onClick={() => setProfileOpen(true)} style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#377B8A', userSelect: 'none' }}>account_circle</span>
            </div>
          </div>
        </div>

        {/* ── Frame 7: date navigation row, 414×46px ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px 0px 10px',
          height: '46px',
        }}>
          {/* Frame 5: arrow + date + arrow */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px',
            height: '36px',
          }}>

            {/* Left arrow (active) */}
            <button onClick={() => navigate('/dagboek/historie/1')} style={{
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

            {/* Date label: "Vandaag" 20px, date 12px */}
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

            {/* Right arrow (disabled/today) */}
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

      {/* ── NS-hoe gaat het vandaag?: card 338×377, left:41, top:199 ── */}
      <div style={{
        position: 'absolute',
        left: '41px',
        top: '199px',
        width: '338px',
        height: '377px',
        background: '#FFFFFF',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '20px',
        overflow: 'hidden',
      }}>

        {/* Ellipse 18: 155×155, left:72, top:34, #EFF6F5 */}
        <div style={{
          position: 'absolute',
          width: '155px',
          height: '155px',
          left: '72px',
          top: '34px',
          borderRadius: '50%',
          background: '#EFF6F5',
        }} />

        {/* Ellipse 19: 52×52, left:228, top:122, #EFF6F5 */}
        <div style={{
          position: 'absolute',
          width: '52px',
          height: '52px',
          left: '228px',
          top: '122px',
          borderRadius: '50%',
          background: '#EFF6F5',
        }} />

        {/* Ellipse 20: 33×33, left:203, top:174, #EFF6F5 */}
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

          {/* "Hoe gaat het vandaag?" */}
          <div style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '29px',
            color: '#377B8A',
            textAlign: 'center',
            marginBottom: '23px',
          }}>
            Hoe gaat het vandaag?
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
            Vul iedere dag je gegevens in. Dat duurt maar een paar minuten.
          </div>

          {/* "Invullen" button: 170×50px centered */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/dagboek/invullen')}
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
                fontSize: '28px',
                color: '#FFFFFF',
                userSelect: 'none',
              }}>add</span>
              Invullen
            </button>
          </div>
        </div>
      </div>

      {profileOpen && <ProfileOverlay onClose={() => setProfileOpen(false)} />}
      {debugOpen && <DebugMenu onClose={() => setDebugOpen(false)} />}
    </div>
  );
}
