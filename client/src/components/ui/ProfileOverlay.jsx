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

export default function ProfileOverlay({ onClose }) {
  const [profile, setProfile] = useState(loadProfile);

  function handleChange(field, value) {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
    saveProfile(updated);
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
          width: 76,
          height: 76,
          left: 143,
          top: 25,
          borderRadius: '50%',
          background: '#CFEBE8',
        }} />

        {/* Title */}
        <div style={{
          position: 'relative',
          left: 65,
          top: 35,
          width: 231,
          height: 57,
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: 24,
          lineHeight: '29px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#377B8A',
        }}>
          Je gegevens en privacy
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Sluiten"
          style={{
            position: 'absolute',
            left: 307,
            top: 7,
            width: 46,
            height: 46,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: '#377B8A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        {/* Form fields */}
        <div style={{
          padding: '16px 24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>

          {/* Naam */}
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'Inter',
              fontSize: 13,
              lineHeight: '16px',
              color: '#B3B2B2',
              marginBottom: 5,
            }}>
              Naam
            </label>
            <input
              value={profile.naam}
              onChange={e => handleChange('naam', e.target.value)}
              placeholder="Uw naam"
              style={{
                width: '100%',
                height: 40,
                border: '1px solid #E8E8E8',
                borderRadius: 8,
                padding: '0 12px',
                boxSizing: 'border-box',
                fontFamily: 'Inter',
                fontSize: 16,
                color: '#333',
                background: '#FFFFFF',
                outline: 'none',
              }}
            />
          </div>

          {/* Datum van operatie (readonly — uit dossier) */}
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'Inter',
              fontSize: 13,
              lineHeight: '16px',
              color: '#B3B2B2',
              marginBottom: 5,
            }}>
              Datum van operatie <span style={{ fontStyle: 'italic' }}>(uit uw dossier)</span>
            </label>
            <div style={{
              width: '100%',
              height: 40,
              border: '1px solid #E8E8E8',
              borderRadius: 8,
              padding: '0 12px',
              boxSizing: 'border-box',
              fontFamily: 'Inter',
              fontSize: 16,
              color: '#B3B2B2',
              background: '#F6F6F6',
              display: 'flex',
              alignItems: 'center',
            }}>
              {profile.operatieDatum}
            </div>
          </div>

          {/* Herinnering dagboek */}
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'Inter',
              fontSize: 13,
              lineHeight: '16px',
              color: '#B3B2B2',
              marginBottom: 5,
            }}>
              Herinnering dagboek
            </label>
            <input
              type="time"
              value={profile.herinnering}
              onChange={e => handleChange('herinnering', e.target.value)}
              style={{
                width: '100%',
                height: 40,
                border: '1px solid #E8E8E8',
                borderRadius: 8,
                padding: '0 12px',
                boxSizing: 'border-box',
                fontFamily: 'Inter',
                fontSize: 16,
                color: '#333',
                background: '#FFFFFF',
                outline: 'none',
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
