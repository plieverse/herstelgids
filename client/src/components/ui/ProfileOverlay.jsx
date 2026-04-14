import { useState } from 'react';
import { requestNotificationPermission, scheduleReminder } from '../../utils/reminders';

const PROFILE_KEY = 'profile_settings';

const DUTCH_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

function formatDutchDate(dateStr) {
  if (!dateStr) return '';
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const [, year, month, day] = match;
    return `${parseInt(day)} ${DUTCH_MONTHS[parseInt(month) - 1]} ${year}`;
  }
  return dateStr;
}

function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    const defaults = { naam: '', operatieDatum: '2025-01-13', herinnering: '09:00' };
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  } catch {
    return { naam: '', operatieDatum: '2025-01-13', herinnering: '09:00' };
  }
}

function saveProfile(data) {
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(data)); } catch {}
}

const labelStyle = {
  display: 'block',
  fontFamily: 'Inter', fontSize: 13, lineHeight: '16px',
  color: '#377B8A', marginBottom: 5,
};

const readonlyFieldStyle = {
  width: '100%', height: 40,
  border: '1px solid #E8E8E8', borderRadius: 8,
  padding: '0 12px', boxSizing: 'border-box',
  fontFamily: 'Inter', fontSize: 16,
  color: '#333', background: '#F6F6F6',
  display: 'flex', alignItems: 'center',
};

const editFieldStyle = {
  width: '100%', maxWidth: '100%', minWidth: 0, height: 40,
  border: '1.5px solid #CFEBE8', borderRadius: 8,
  padding: '0 12px', boxSizing: 'border-box',
  fontFamily: 'Inter', fontSize: 16,
  color: '#333', background: '#FFFFFF',
  outline: 'none',
  colorScheme: 'light',
  display: 'block',
  WebkitAppearance: 'none',
  appearance: 'none',
  textAlign: 'left',
  lineHeight: '40px',
};

// CSS to tint the native picker icon to teal (#377B8A) and force width constraints
const PICKER_ICON_CSS = `
  .profile-date-input::-webkit-calendar-picker-indicator,
  .profile-time-input::-webkit-calendar-picker-indicator {
    filter: invert(38%) sepia(44%) saturate(493%) hue-rotate(147deg) brightness(87%) contrast(89%);
    cursor: pointer;
  }
  .profile-input-wrapper {
    display: block;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    position: relative;
  }
  .profile-date-input,
  .profile-time-input {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
    text-align: left !important;
    text-align-last: left !important;
  }
`;

export default function ProfileOverlay({ onClose }) {
  const [profile, setProfile] = useState(loadProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  function startEditing() {
    setDraft({ ...profile });
    setEditing(true);
  }

  function handleCancel() {
    setProfile(draft);
    setEditing(false);
    setDraft(null);
  }

  async function handleSave() {
    saveProfile(profile);
    setEditing(false);
    setDraft(null);
    if (profile.herinnering) {
      const perm = await requestNotificationPermission();
      if (perm === 'granted') scheduleReminder(profile.herinnering);
    }
  }

  function handleChange(field, value) {
    setProfile(prev => ({ ...prev, [field]: value }));
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.4)', zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Inject CSS for teal picker icons */}
      <style>{PICKER_ICON_CSS}</style>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', width: 'min(361px, 92vw)',
          background: '#FFFFFF', borderRadius: 20, overflow: 'hidden',
        }}
      >

        {/* ── Header ── */}
        <div style={{ position: 'relative', height: 105 }}>
          {/* Decorative circle — centred */}
          <div style={{
            position: 'absolute',
            width: 76, height: 76,
            left: '50%', transform: 'translateX(-50%)', top: 25,
            borderRadius: '50%', background: '#CFEBE8',
          }} />
          {/* Profile icon — centred, overlapping top of circle */}
          <span className="material-symbols-outlined" style={{
            position: 'absolute',
            left: '50%', transform: 'translateX(-50%)', top: 15,
            fontSize: '54px', lineHeight: '54px',
            color: '#377B8A', userSelect: 'none',
          }}>account_circle</span>
          {/* Title — overlapping bottom of circle */}
          <span style={{
            position: 'absolute', left: 0, right: 0, top: 68,
            fontFamily: 'Inter', fontWeight: 700, fontSize: 24,
            lineHeight: '29px', color: '#377B8A',
            textAlign: 'center',
          }}>
            Profiel
          </span>
        </div>

        {/* ── Pencil button (view mode only) ── */}
        {!editing && (
          <button
            onClick={startEditing}
            aria-label="Bewerken"
            style={{
              position: 'absolute', right: 50, top: 10,
              width: 35, height: 35,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span className="material-symbols-outlined" style={{
              fontSize: '28px', color: '#377B8A', userSelect: 'none',
            }}>edit</span>
          </button>
        )}

        {/* ── Close button ── */}
        <button
          onClick={onClose}
          aria-label="Sluiten"
          style={{
            position: 'absolute', right: 7, top: 7,
            width: 46, height: 46,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: '#377B8A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12"
                stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        {/* ── Form fields ── */}
        <div style={{
          padding: '0 24px 28px',
          display: 'flex', flexDirection: 'column', gap: '14px',
          overflow: 'hidden',
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: '100%',
        }}>

          {/* Naam */}
          <div>
            <label style={labelStyle}>Naam</label>
            {editing ? (
              <input
                value={profile.naam}
                onChange={e => handleChange('naam', e.target.value)}
                placeholder="Uw naam"
                style={editFieldStyle}
              />
            ) : (
              <div style={readonlyFieldStyle}>
                {profile.naam || <span style={{ color: '#C8C8C8' }}>Niet ingevuld</span>}
              </div>
            )}
          </div>

          {/* Datum van operatie */}
          <div>
            <label style={labelStyle}>Datum van operatie</label>
            {editing ? (
              <div className="profile-input-wrapper">
                <input
                  type="date"
                  className="profile-date-input"
                  value={profile.operatieDatum}
                  onChange={e => handleChange('operatieDatum', e.target.value)}
                  onClick={e => { try { e.target.showPicker(); } catch {} }}
                  style={editFieldStyle}
                />
              </div>
            ) : (
              <div style={readonlyFieldStyle}>
                {formatDutchDate(profile.operatieDatum)}
              </div>
            )}
          </div>

          {/* Tijd herinnering dagboek */}
          <div>
            <label style={labelStyle}>Tijd herinnering dagboek (app moet open zijn)</label>
            {editing ? (
              <div className="profile-input-wrapper">
                <input
                  type="time"
                  className="profile-time-input"
                  value={profile.herinnering}
                  onChange={e => handleChange('herinnering', e.target.value)}
                  onClick={e => { try { e.target.showPicker(); } catch {} }}
                  style={editFieldStyle}
                />
              </div>
            ) : (
              <div style={readonlyFieldStyle}>{profile.herinnering}</div>
            )}
          </div>

          {/* Test melding knop — view mode only */}
          {!editing && (
            <button
              onClick={async () => {
                const perm = await requestNotificationPermission();
                if (perm === 'denied') {
                  alert('Notificaties zijn geblokkeerd. Pas dit aan in de browserinstellingen.');
                  return;
                }
                if (perm === 'unsupported') {
                  alert('Deze browser ondersteunt geen notificaties.');
                  return;
                }
                try {
                  if ('serviceWorker' in navigator) {
                    const reg = await navigator.serviceWorker.ready;
                    await reg.showNotification('De Lichaamsgids', {
                      body: 'Vergeet niet je dagboek in te vullen vandaag!',
                      icon: '/icons/icon-192.png',
                      tag: 'dagboek-reminder-test',
                    });
                  } else {
                    new Notification('De Lichaamsgids', {
                      body: 'Vergeet niet je dagboek in te vullen vandaag!',
                      icon: '/icons/icon-192.png',
                    });
                  }
                } catch { alert('Kon geen melding tonen. Controleer je browserinstellingen.'); }
              }}
              style={{
                width: '100%', height: 44,
                background: '#FFFFFF', border: '1.5px solid #377B8A',
                borderRadius: 20, cursor: 'pointer',
                fontFamily: 'Inter', fontWeight: 400, fontSize: 16,
                color: '#377B8A',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#377B8A', userSelect: 'none' }}>notifications</span>
              Test melding
            </button>
          )}

          {/* Annuleren / Opslaan — edit mode only */}
          {editing && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={handleCancel}
                style={{
                  flex: 1, height: 44,
                  background: '#FFFFFF', border: '1.5px solid #377B8A',
                  borderRadius: 20, cursor: 'pointer',
                  fontFamily: 'Inter', fontWeight: 400, fontSize: 16,
                  color: '#377B8A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <span className="material-symbols-outlined" style={{
                  fontSize: '20px', color: '#377B8A', userSelect: 'none',
                }}>close</span>
                Annuleren
              </button>
              <button
                onClick={handleSave}
                style={{
                  flex: 1, height: 44,
                  background: '#377B8A', border: 'none',
                  borderRadius: 20, cursor: 'pointer',
                  fontFamily: 'Inter', fontWeight: 400, fontSize: 16,
                  color: '#FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <span className="material-symbols-outlined" style={{
                  fontSize: '20px', color: '#FFFFFF', userSelect: 'none',
                }}>save</span>
                Opslaan
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
