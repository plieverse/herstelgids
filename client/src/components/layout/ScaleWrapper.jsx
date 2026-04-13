import { useEffect, useState } from 'react';

const BASE_W = 414;
const BASE_H = 736;

// Capture the viewport size ONCE on first load (before any interaction).
// We deliberately avoid reading innerHeight after load to prevent
// keyboard / iOS Safari chrome changes from triggering rescales.
const INIT_W = window.innerWidth;
const INIT_H = window.innerHeight;

function calcScale(w = INIT_W, h = INIT_H) {
  return Math.min(w / BASE_W, h / BASE_H);
}

export default function ScaleWrapper({ children }) {
  const [scale, setScale] = useState(() => calcScale());

  useEffect(() => {
    // Only recalculate when the device is physically rotated.
    // 'resize' is intentionally NOT used — it fires on keyboard open/close
    // and iOS Safari chrome collapse, both of which must NOT change the scale.
    function onOrientationChange() {
      setTimeout(() => {
        setScale(calcScale(window.innerWidth, window.innerHeight));
      }, 300);
    }
    window.addEventListener('orientationchange', onOrientationChange);
    return () => window.removeEventListener('orientationchange', onOrientationChange);
  }, []);

  return (
    // Use explicit top/left/width/height instead of inset:0 so the container
    // is anchored to the top-left corner with a fixed size. On iOS Safari,
    // 'inset: 0' can cause the bottom to move when the browser chrome animates.
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
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
