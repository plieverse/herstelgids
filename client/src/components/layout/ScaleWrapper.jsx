import { useEffect, useState } from 'react';

const BASE_W = 414;
const BASE_H = 736;

// Snapshot the viewport on first load, before any keyboard or browser-chrome
// changes can interfere. We only recalculate on orientation change.
function calcScale() {
  return Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H);
}

export default function ScaleWrapper({ children }) {
  const [scale, setScale] = useState(calcScale);

  useEffect(() => {
    // Do NOT listen to 'resize' — that fires whenever the keyboard opens /
    // closes or the browser chrome collapses, causing the layout to jump.
    // Only recalculate when the device is physically rotated.
    function onOrientationChange() {
      setTimeout(() => setScale(calcScale()), 200);
    }
    window.addEventListener('orientationchange', onOrientationChange);
    return () => window.removeEventListener('orientationchange', onOrientationChange);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
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
