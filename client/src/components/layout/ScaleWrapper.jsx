import { useEffect, useState } from 'react';

const BASE_W = 414;
const BASE_H = 736;

/**
 * Use window.visualViewport when available — it tracks the actual visible
 * area including iOS Safari chrome show/hide and virtual keyboard.
 * Falls back to window.innerWidth/Height on browsers that don't support it.
 */
function calcScale() {
  const vp = window.visualViewport;
  const w = vp ? vp.width  : window.innerWidth;
  const h = vp ? vp.height : window.innerHeight;
  return Math.min(w / BASE_W, h / BASE_H);
}

export default function ScaleWrapper({ children }) {
  const [scale, setScale] = useState(() => calcScale());

  useEffect(() => {
    function onResize() {
      setScale(calcScale());
    }

    // visualViewport.resize fires whenever the visible area changes:
    // address bar collapse/expand, virtual keyboard, orientation change.
    const vp = window.visualViewport;
    if (vp) {
      vp.addEventListener('resize', onResize);
      return () => vp.removeEventListener('resize', onResize);
    }

    // Fallback for browsers without visualViewport
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
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
