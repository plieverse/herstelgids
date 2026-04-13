import { useState } from 'react';

const PROFILE_KEY = 'profile_settings';

function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    const defaults = { naam: '', operatieDatum: '13 januari 2025', herinnering: '09:00' };
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  } catch {
    return { naam: '', operatieDatum: '13 januari 2025', herinnering: '09:00' };
  }
}

function saveProfile(data) {
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(data)); } catch {}
}

const labelStyle = {
  display: 'block',
  fontFamily: 'Inter',
  fontSize: 13,
  lineHeight: '16px',
  color: '#B3B2B2',
  marginBottom: 5,
};

const readonlyFieldStyle = {
  width: '100%', height: 40,
  border: '1px solid #E8E8E8', borderRadius: 8,
  padding: '0 12px', boxSizing: 'border-box',
  fontFamily: 'Inter', fontSize: 16,
  color: '#B3B2B2', background: '#F6F6F6',
  display: 'flex', alignItems: 'center',
};

const editFieldStyle = {
  width: '100%', height: 40,
  border: '1.5px solid #CFEBE8', borderRadius: 8,
  padding: '0 12px', boxSizing: 'border-box',
  fontFamily: 'Inter', fontSize: 16,
  color: '#333', background: '#FFFFFF',
  outline: 'none',
};

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

  function handleSave() {
    saveProfile(profile);
    setEditing(false);
    setDraft(null);
  }

  function handleChange(field, value) {
    setProfile(prev => ({ ...prev, [field]: value }));
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 361,
          background: '#FFFFFF',
          borderRadius: 20,
          overflow: 'hidden',
        }}
      >
        {/* Decorative circle behind title */}
        <div style={{
          position: 'absolute',
          width: 76, height: 76,
          left: 143, top: 25,
          borderRadius: '50%',
          background: '#CFEBE8',
        }} />

        {/* Title "Profiel" */}
        <div style={{
          position: 'relative',
          left: 65, top: 35,
          width: 231, height: 57,
          fontFamily: 'Inter', fontWeight: 700, fontSize: 24, lineHeight: '29px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', color: '#377B8A',
        }}>
          Profiel
        </div>

        {/* Pencil (edit) button — only when not editing */}
        {!editing && (
          <button
            onClick={startEditing}
            aria-label="Bewerken"
            style={{
              position: 'absolute', left: 260, top: 7,
              width: 46, height: 46,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: '#E6F4F2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z"
                  stroke="#377B8A" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        )}

        {/* Close (X) button — always visible */}
        <button
          onClick={onClose}
          aria-label="Sluiten"
          style={{
            position: 'absolute', left: 307, top: 7,
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

        {/* Form fields */}
        <div style={{
          padding: '16px 24px 28px',
          display: 'flex', flexDirection: 'column', gap: '14px',
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
              <input
                value={profile.operatieDatum}
                onChange={e => handleChange('operatieDatum', e.target.value)}
                placeholder="bijv. 13 januari 2025"
                style={editFieldStyle}
              />
            ) : (
              <div style={readonlyFieldStyle}>{profile.operatieDatum}</div>
            )}
          </div>

          {/* Herinnering dagboek */}
          <div>
            <label style={labelStyle}>Herinnering dagboek</label>
            {editing ? (
              <input
                type="time"
                value={profile.herinnering}
                onChange={e => handleChange('herinnering', e.target.value)}
                style={editFieldStyle}
              />
            ) : (
              <div style={readonlyFieldStyle}>{profile.herinnering}</div>
            )}
          </div>

          {/* Annuleren / Opslaan — only in edit mode */}
          {editing && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={handleCancel}
                style={{
                  flex: 1, height: 44,
                  background: '#FFFFFF',
                  border: '1.5px solid #377B8A',
                  borderRadius: 20, cursor: 'pointer',
                  fontFamily: 'Inter', fontWeight: 400, fontSize: 16,
                  color: '#377B8A',
                }}
              >
                Annuleren
              </button>
              <button
                onClick={handleSave}
                style={{
                  flex: 1, height: 44,
                  background: '#377B8A',
                  border: 'none',
                  borderRadius: 20, cursor: 'pointer',
                  fontFamily: 'Inter', fontWeight: 400, fontSize: 16,
                  color: '#FFFFFF',
                }}
              >
                Opslaan
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
