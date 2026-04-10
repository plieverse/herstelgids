import { useEffect, useState } from 'react';

const BASE_W = 414;
const BASE_H = 736;

export default function ScaleWrapper({ children }) {
  const [scale, setScale] = useState(() =>
    Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H)
  );

  useEffect(() => {
    function update() {
      setScale(Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H));
    }
    window.addEventListener('resize', update);
    // Also handle orientation change on mobile
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
