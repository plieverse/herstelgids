import { useEffect, useState } from 'react';

const BASE_W = 414;
const BASE_H = 736;

// Use screen dimensions (not innerWidth/Height) so the keyboard opening
// on mobile never triggers a rescale.
function calcScale() {
  const w = window.innerWidth;
  // screen.height stays constant regardless of keyboard / browser chrome
  const h = window.screen.height;
  return Math.min(w / BASE_W, h / BASE_H);
}

export default function ScaleWrapper({ children }) {
  const [scale, setScale] = useState(calcScale);

  useEffect(() => {
    function update() { setScale(calcScale()); }
    // Only width changes matter (orientation flip changes innerWidth)
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', () => setTimeout(update, 100));
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      background: '#F6F6F6',
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
