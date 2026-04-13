import { useEffect, useState } from 'react';

const BASE_W = 414;
const BASE_H = 736;

export default function ScaleWrapper({ children }) {
  const [scale, setScale] = useState(() =>
    Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H)
  );

  useEffect(() => {
    // Only recalculate when the device is physically rotated.
    // We intentionally do NOT listen to window.resize or visualViewport.resize:
    // those events fire during page-content changes (inputs rendering, scrollIntoView,
    // etc.) on iOS Safari and update the scale to a wrong value that persists.
    function onOrientationChange() {
      setTimeout(() => {
        setScale(Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H));
      }, 300);
    }
    window.addEventListener('orientationchange', onOrientationChange);
    return () => window.removeEventListener('orientationchange', onOrientationChange);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      background: '#FFFFFF',
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${BASE_W}px`,
        height: `${BASE_H}px`,
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
      }}>
        {children}
      </div>
    </div>
  );
}
