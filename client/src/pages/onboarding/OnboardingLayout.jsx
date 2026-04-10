import { useNavigate } from 'react-router-dom';

export default function OnboardingLayout({ children, step, totalSteps = 5, onBack }) {
  const navigate = useNavigate();

  function handleBack() {
    if (onBack) onBack();
    else navigate(-1);
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={handleBack} style={styles.backBtn} aria-label="Terug">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#e6f4f2" />
            <path d="M14 7l-5 5 5 5" stroke="#377b8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 style={styles.title}>De Lichaamsgids</h1>
        <div style={{ width: 24 }} />
      </div>

      {/* Progress bar */}
      {step != null && (
        <div style={styles.progressBar}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.progressSegment,
                background: i < step ? '#377b8a' : '#cfebe8',
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minheight: '736px',
    background: '#f6f6f6',
    maxWidth: '480px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px 8px',
    background: '#ffffff',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#377b8a',
    textAlign: 'center',
    flex: 1,
  },
  progressBar: {
    display: 'flex',
    gap: '4px',
    padding: '8px 20px 0',
    background: '#ffffff',
  },
  progressSegment: {
    flex: 1,
    height: '5px',
    borderRadius: '3px',
    transition: 'background 0.3s',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
};
